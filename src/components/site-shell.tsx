import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "./enquiry-dialog";
import { site } from "@/content/site";

const nav = [["Courses", "/courses"], ["Results", "/results"], ["Faculty", "/faculty"], ["About", "/about"], ["Journal", "/journal"], ["Contact", "/contact"]] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false); const [menu, setMenu] = useState(false); const [enquire, setEnquire] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); fn(); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { const open = () => setEnquire(true); window.addEventListener("open-enquiry", open); return () => window.removeEventListener("open-enquiry", open); }, []);
  return <div className="min-h-screen bg-background">
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "border-b border-border/70 bg-ivory/95 text-ink backdrop-blur-md" : "text-ivory"}`}>
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10"><Link to="/" className="leading-none"><span className="block text-sm font-extrabold tracking-[0.12em]">JOSHI’S ACADEMY</span><span className={`mt-1 block text-[9px] tracking-[0.28em] ${scrolled ? "text-slate" : "text-ivory/65"}`}>GYAN KI VARSHA</span></Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">{nav.map(([label, to]) => <Link key={to} to={to} className="text-xs font-semibold hover:text-gold" activeProps={{ className: "text-gold" }}>{label}</Link>)}</nav>
        <Button variant={scrolled ? "linkDark" : "linkLight"} onClick={() => setEnquire(true)} className="hidden sm:inline-flex">Enquire <ArrowRight /></Button>
        <Button variant={scrolled ? "iconGhost" : "iconLight"} size="icon" className="lg:hidden" aria-label="Open menu" onClick={() => setMenu(true)}><Menu /></Button>
      </div>
    </header>
    {menu && <div className="fixed inset-0 z-50 flex flex-col bg-ink p-6 text-ivory"><div className="flex items-start justify-between"><div><strong className="text-sm tracking-[0.12em]">JOSHI’S ACADEMY</strong><span className="mt-1 block text-[9px] tracking-[0.28em] text-ivory/50">GYAN KI VARSHA</span></div><Button variant="iconLight" size="icon" onClick={() => setMenu(false)} aria-label="Close menu"><X /></Button></div><nav className="my-auto flex flex-col">{nav.map(([label, to], i) => <Link key={to} to={to} onClick={() => setMenu(false)} className="border-b border-ivory/15 py-4 font-display text-4xl"><span className="mr-4 align-middle font-sans text-[10px] text-gold">0{i + 1}</span>{label}</Link>)}</nav><Button variant="hero" onClick={() => { setMenu(false); setEnquire(true); }}>Book a Free Counselling Session <ArrowRight /></Button></div>}
    <main>{children}</main>
    <Footer onEnquire={() => setEnquire(true)} />
    <div className="fixed inset-x-0 bottom-0 z-30 grid h-14 grid-cols-3 border-t border-border bg-ivory lg:hidden"><Button variant="mobileBar" disabled={!site.phone}>Call</Button><Button variant="mobileBar" disabled={!site.whatsapp}>WhatsApp</Button><Button variant="mobileBar" onClick={() => setEnquire(true)}>Enquire</Button></div>
    <EnquiryDialog open={enquire} onOpenChange={setEnquire} />
  </div>;
}

function Footer({ onEnquire }: { onEnquire: () => void }) { return <footer className="bg-ink px-6 pb-24 pt-20 text-ivory md:px-10 lg:pb-10"><div className="mx-auto max-w-[1500px]"><div className="grid gap-14 border-b border-ivory/15 pb-16 lg:grid-cols-[1.4fr_1fr]"><div><p className="text-sm font-extrabold tracking-[0.12em]">JOSHI’S ACADEMY</p><p className="mt-2 text-[10px] tracking-[0.28em] text-gold">GYAN KI VARSHA</p><p className="mt-8 max-w-md font-display text-3xl">Specialist Science Coaching for CBSE & ICSE Classes IX–X.</p></div><div className="grid grid-cols-2 gap-4 text-sm">{[...nav, ["FAQ", "/faq"] as const, ["Privacy Policy", "/privacy"] as const, ["Terms", "/terms"] as const].map(([label, to]) => <Link key={to} to={to} className="border-b border-ivory/10 py-3 text-ivory/70 hover:text-gold">{label}</Link>)}</div></div><div className="flex flex-col gap-4 pt-6 text-xs text-ivory/45 sm:flex-row sm:justify-between"><p>© 2026 Joshi’s Academy. Kharadi, Pune.</p><button className="text-left hover:text-gold" onClick={onEnquire}>Book a counselling session →</button></div></div></footer>; }