import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, Compass, Phone, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, seoMeta } from "@/components/page-hero";
import { site } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: seoMeta(
      "Contact Joshi’s Academy | Kharadi, Pune, Maharashtra",
      "Get in touch with Joshi’s Academy in Kharadi, Pune for CBSE and ICSE Science coaching enquiries for Classes IX & X. Schedule a free counselling session.",
    ),
    links: [{ rel: "canonical", href: "https://joshisacademy.com/contact" }],
  }),
  component: ContactPage,
});

const openEnquiry = () => window.dispatchEvent(new Event("open-enquiry"));

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kharadi • Pune"
        title="Come learn with us."
        intro="Speak with the academic team about the right Science programme for your child. We welcome parents and students for structured academic counselling."
      />

      <section className="section-shell py-24 md:py-36">
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left Contact Information */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3">
                <MapPin className="size-6 text-violet" />
                <span className="eyebrow text-violet">Academic Centre</span>
              </div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-ink">Joshi’s Academy</h2>
              <p className="mt-2 text-base text-muted-foreground">
                Kharadi, Pune, Maharashtra, India
              </p>
            </div>

            <div className="border-t border-border pt-8 space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="size-5 text-royal shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-ink">
                    Counselling Hours
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Monday to Saturday: 10:00 AM – 7:30 PM
                    <br />
                    Sunday: By prior appointment for parent counselling
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Compass className="size-5 text-royal shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-ink">
                    Locational Accessibility
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Conveniently situated in Kharadi, accessible to students from EON Free Zone,
                    Magarpatta, Wadgaon Sheri, and Viman Nagar.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button asChild>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Get Directions <Compass className="size-4 ml-1" />
                </a>
              </Button>
              <Button variant="outline" onClick={openEnquiry}>
                Request a Callback
              </Button>
            </div>
          </div>

          {/* Right Direct Counselling Box */}
          <div className="border border-border bg-white p-8 sm:p-12 shadow-sm">
            <span className="eyebrow text-royal">Admissions Inquiry</span>
            <h3 className="mt-3 font-display text-3xl text-ink">
              Schedule an Academic Assessment.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A 20-minute conversation with our academic counsellor helps identify your child’s
              learning baseline, addresses board curriculum nuances, and clarifies how small-batch
              science coaching accelerates understanding.
            </p>

            <div className="mt-8 border-t border-border pt-8 space-y-4">
              <div className="border border-border bg-lavender/30 p-4 text-xs text-ink space-y-1">
                <p className="font-bold">✓ Free, no-obligation conversation</p>
                <p className="text-muted-foreground">
                  Includes syllabus review and previous test gap analysis.
                </p>
              </div>

              <Button variant="default" size="lg" className="w-full" onClick={openEnquiry}>
                Book a Free Counselling Session <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
