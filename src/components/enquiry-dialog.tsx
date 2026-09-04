import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type FormData = { studentClass: "IX" | "X" | ""; board: "CBSE" | "ICSE" | ""; parentName: string; mobile: string; preferred: "Call" | "WhatsApp" | "" };
const initial: FormData = { studentClass: "", board: "", parentName: "", mobile: "", preferred: "" };

export function EnquiryDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const steps = ["Student class", "Board", "Parent name", "Mobile number", "Preferred contact"];
  const valid = [!!form.studentClass, !!form.board, form.parentName.trim().length >= 2, /^[0-9+ ()-]{10,20}$/.test(form.mobile), !!form.preferred][step];

  async function submit() {
    if (!valid || form.studentClass === "" || form.board === "" || form.preferred === "") return;
    setState("loading");
    const { error } = await supabase.from("enquiries").insert({ student_class: form.studentClass, board: form.board, parent_name: form.parentName.trim(), mobile_number: form.mobile.trim(), preferred_contact: form.preferred });
    setState(error ? "error" : "success");
  }

  function close(next: boolean) {
    onOpenChange(next);
    if (!next) window.setTimeout(() => { setStep(0); setForm(initial); setState("idle"); }, 250);
  }

  return <Dialog.Root open={open} onOpenChange={close}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" /><Dialog.Content className="fixed inset-0 z-50 overflow-y-auto bg-ivory px-6 py-8 text-ink sm:inset-y-6 sm:left-1/2 sm:right-auto sm:w-[min(92vw,720px)] sm:-translate-x-1/2 sm:border sm:border-gold/30 sm:px-12 sm:py-10">
    <div className="mx-auto flex min-h-full max-w-xl flex-col">
      <div className="flex items-start justify-between"><div><p className="eyebrow text-gold">Free counselling</p><Dialog.Title className="mt-3 font-display text-4xl sm:text-5xl">Let’s find the right programme.</Dialog.Title></div><Dialog.Close asChild><Button variant="iconGhost" size="icon" aria-label="Close enquiry"><X /></Button></Dialog.Close></div>
      {state === "success" ? <div className="flex flex-1 flex-col justify-center py-20"><span className="mb-8 flex size-14 items-center justify-center border border-gold text-gold"><Check /></span><h2 className="font-display text-5xl">Thank you.</h2><p className="mt-5 max-w-md text-lg text-slate">Your enquiry has been received. Our academic team will contact you shortly.</p><Button className="mt-10 self-start" onClick={() => close(false)}>Close</Button></div> : <>
        <div className="mt-14 flex gap-2" aria-label={`Step ${step + 1} of ${steps.length}`}>{steps.map((_, i) => <span key={i} className={`h-px flex-1 ${i <= step ? "bg-gold" : "bg-border"}`} />)}</div>
        <form className="flex flex-1 flex-col justify-center py-12" onSubmit={(e) => { e.preventDefault(); if (step < 4 && valid) setStep(step + 1); else submit(); }}>
          <p className="eyebrow text-slate">0{step + 1} / 05</p><h2 className="mt-4 font-display text-4xl">{steps[step]}</h2>
          <div className="mt-9">
            {step === 0 && <Choice options={["IX", "X"]} value={form.studentClass} onChange={(v) => setForm({ ...form, studentClass: v as FormData["studentClass"] })} />}
            {step === 1 && <Choice options={["CBSE", "ICSE"]} value={form.board} onChange={(v) => setForm({ ...form, board: v as FormData["board"] })} />}
            {step === 2 && <label className="block"><span className="sr-only">Parent name</span><input autoFocus className="editorial-input" value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} placeholder="Enter parent’s full name" autoComplete="name" /></label>}
            {step === 3 && <label className="block"><span className="sr-only">Mobile number</span><input autoFocus className="editorial-input" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="10-digit mobile number" inputMode="tel" autoComplete="tel" /></label>}
            {step === 4 && <Choice options={["Call", "WhatsApp"]} value={form.preferred} onChange={(v) => setForm({ ...form, preferred: v as FormData["preferred"] })} />}
            {state === "error" && <p role="alert" className="mt-5 text-sm text-destructive">We couldn’t submit your enquiry. Please check the details and try again.</p>}
          </div>
          <div className="mt-12 flex items-center justify-between"><Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft /> Back</Button><Button type="submit" disabled={!valid || state === "loading"}>{state === "loading" ? "Submitting…" : step === 4 ? "Submit Enquiry" : "Continue"}<ArrowRight /></Button></div>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        </form>
      </>}
    </div>
  </Dialog.Content></Dialog.Portal></Dialog.Root>;
}

function Choice({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  return <div className="grid grid-cols-2 gap-px bg-border">{options.map((option) => <Button key={option} type="button" variant={value === option ? "choiceActive" : "choice"} onClick={() => onChange(option)}>{option}</Button>)}</div>;
}