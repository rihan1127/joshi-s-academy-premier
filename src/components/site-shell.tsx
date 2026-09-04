import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu, Phone, MessageSquare, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "./enquiry-dialog";
import { BrandLoader } from "./brand-loader";
import { site, announcement } from "@/content/site";

const navItems = [
  { label: "Courses", to: "/courses" },
  { label: "Results", to: "/results" },
  { label: "Faculty", to: "/faculty" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const announcementRef = useRef<HTMLDivElement>(null);
  const [announcementHeight, setAnnouncementHeight] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (announcement.enabled) {
      const isExpired = announcement.expiry && new Date(announcement.expiry) < new Date();
      if (!isExpired) {
        setShowAnnouncement(true);
      }
    }
  }, []);

  // Measure the announcement bar height so we can offset the fixed header correctly
  useEffect(() => {
    if (!showAnnouncement) {
      setAnnouncementHeight(0);
      return;
    }
    const el = announcementRef.current;
    if (!el) return;
    setAnnouncementHeight(el.offsetHeight);
    const ro = new ResizeObserver(() => setAnnouncementHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [showAnnouncement]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenEnquiry = () => setEnquireOpen(true);
    window.addEventListener("open-enquiry", handleOpenEnquiry);
    return () => window.removeEventListener("open-enquiry", handleOpenEnquiry);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  // Total offset for page content = announcement bar + header
  const HEADER_HEIGHT = 76; // px — fixed target height
  const contentOffset = announcementHeight + HEADER_HEIGHT;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      <BrandLoader />

      {/* Top Configurable Announcement Bar — fixed at very top */}
      {showAnnouncement && (
        <div
          ref={announcementRef}
          className="fixed inset-x-0 top-0 z-50 bg-violet text-ivory px-4 py-2 text-center"
          role="region"
          aria-label="Academic Announcement"
        >
          <div className="mx-auto flex max-w-[1500px] items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ivory">
              <Sparkles className="size-3" />
              {announcement.badge}
            </span>
            <span className="text-xs tracking-tight">{announcement.text}</span>
            <button
              onClick={() => setEnquireOpen(true)}
              className="ml-1 text-xs font-bold underline underline-offset-4 hover:text-lavender transition-colors cursor-pointer"
            >
              Enquire Now →
            </button>
          </div>
        </div>
      )}

      {/* Fixed Institutional Navbar — sits directly below announcement bar, or at top if no announcement */}
      <header
        style={{ top: `${announcementHeight}px` }}
        className={`fixed inset-x-0 z-40 transition-all duration-200 ${
          scrolled
            ? "border-b border-border bg-[rgba(250,249,245,0.96)] backdrop-blur-md"
            : isHome
              ? "bg-transparent"
              : "border-b border-border/40 bg-ivory"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 md:px-10">
          {/* Logo + Institutional Title */}
          <Link
            to="/"
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
            aria-label="Joshi's Academy Home"
          >
            <img
              src="/brand/logo.png"
              alt="Joshi's Academy Circular Academic Seal"
              width={40}
              height={40}
              className="size-[40px] shrink-0 object-contain rounded-full border border-border/50 bg-white p-[2px] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-none">
              <span
                className={`block text-[13px] font-extrabold tracking-[0.13em] uppercase transition-colors ${
                  scrolled || !isHome ? "text-ink" : "text-ivory"
                }`}
              >
                JOSHI'S ACADEMY
              </span>
              <span
                className={`mt-[3px] block text-[9px] font-semibold tracking-[0.24em] uppercase transition-colors ${
                  scrolled || !isHome ? "text-violet" : "text-lavender"
                }`}
              >
                GYAN KI VARSHA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden items-center gap-6 xl:gap-8 lg:flex"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-[13px] font-semibold tracking-[0.11em] uppercase transition-colors ${
                  scrolled || !isHome
                    ? "text-ink/75 hover:text-violet"
                    : "text-ivory/80 hover:text-white"
                }`}
                activeProps={{
                  className:
                    scrolled || !isHome
                      ? "!text-violet font-extrabold"
                      : "!text-white font-extrabold underline underline-offset-8",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEnquireOpen(true)}
              className={`hidden sm:inline-flex items-center gap-1.5 h-[42px] px-5 text-[12px] font-bold tracking-[0.12em] uppercase transition-colors ${
                scrolled || !isHome
                  ? "bg-violet text-ivory hover:bg-violet/90"
                  : "bg-ivory text-ink hover:bg-white"
              }`}
            >
              ENQUIRE <ArrowRight className="size-3" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              className={`lg:hidden flex items-center justify-center size-9 transition-colors ${
                scrolled || !isHome ? "text-ink hover:text-violet" : "text-ivory hover:text-white"
              }`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Off-canvas Editorial Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink p-6 text-ivory animate-in fade-in duration-200 lg:hidden">
          <div className="flex items-center justify-between border-b border-ivory/15 pb-5">
            <div className="flex items-center gap-3">
              <img
                src="/brand/logo.png"
                alt="Joshi's Academy Seal"
                width={36}
                height={36}
                className="size-9 object-contain rounded-full bg-white p-[2px]"
              />
              <div>
                <strong className="block text-[13px] tracking-[0.13em] uppercase">
                  JOSHI'S ACADEMY
                </strong>
                <span className="mt-0.5 block text-[9px] tracking-[0.24em] text-lavender uppercase">
                  GYAN KI VARSHA
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center size-9 text-ivory/70 hover:text-ivory"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav
            className="my-auto flex flex-col divide-y divide-ivory/10 py-4"
            aria-label="Mobile Navigation"
          >
            {navItems.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-4 font-display text-2xl transition-colors hover:text-lavender"
              >
                <span>{item.label}</span>
                <span className="font-sans text-xs font-bold tracking-widest text-violet">
                  0{i + 1}
                </span>
              </Link>
            ))}
          </nav>

          <div className="space-y-3 pt-5 border-t border-ivory/15">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setEnquireOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-ivory text-ink h-12 text-sm font-bold tracking-[0.1em] uppercase hover:bg-white transition-colors"
            >
              Book a Free Counselling Session <ArrowRight className="size-4" />
            </button>

            <div className="flex items-center justify-between text-xs text-ivory/50 pt-1">
              <span>Kharadi, Pune</span>
              <span>CBSE • ICSE Science</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area — offset by header + announcement height */}
      <main
        className="flex-1 pb-16 lg:pb-0"
        style={{ paddingTop: isHome ? 0 : `${contentOffset}px` }}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer onEnquire={() => setEnquireOpen(true)} />

      {/* Mobile Fixed Bottom Action Bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 grid h-14 grid-cols-3 border-t border-border bg-ivory text-ink shadow-[0_-2px_10px_rgba(0,0,0,0.06)] lg:hidden"
        role="navigation"
        aria-label="Mobile Action Bar"
      >
        <a
          href={site.phone ? `tel:${site.phone}` : "#"}
          onClick={(e) => {
            if (!site.phone) {
              e.preventDefault();
              setEnquireOpen(true);
            }
          }}
          className="flex flex-col items-center justify-center border-r border-border hover:bg-lavender/50 transition-colors text-ink"
        >
          <Phone className="size-4 text-violet mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>

        <a
          href={site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}` : "#"}
          onClick={(e) => {
            if (!site.whatsapp) {
              e.preventDefault();
              setEnquireOpen(true);
            }
          }}
          className="flex flex-col items-center justify-center border-r border-border hover:bg-lavender/50 transition-colors text-ink"
        >
          <MessageSquare className="size-4 text-royal mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => setEnquireOpen(true)}
          className="flex flex-col items-center justify-center bg-violet text-ivory hover:bg-violet/90 transition-colors cursor-pointer"
        >
          <ArrowRight className="size-4 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Enquire</span>
        </button>
      </div>

      {/* Global Enquiry Dialog */}
      <EnquiryDialog open={enquireOpen} onOpenChange={setEnquireOpen} />
    </div>
  );
}

function Footer({ onEnquire }: { onEnquire: () => void }) {
  return (
    <footer className="bg-ink px-6 pb-28 pt-16 text-ivory md:px-10 lg:pb-12 border-t border-border/15">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 border-b border-ivory/15 pb-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {/* Logo & Identity */}
            <div className="flex items-center gap-3.5">
              <img
                src="/brand/logo.png"
                alt="Joshi's Academy Academic Seal"
                width={48}
                height={48}
                className="size-12 object-contain rounded-full bg-white p-[2px]"
              />
              <div>
                <p className="text-[13px] font-extrabold tracking-[0.14em] uppercase text-ivory">
                  JOSHI'S ACADEMY
                </p>
                <p className="mt-[3px] text-[9px] font-bold tracking-[0.28em] uppercase text-lavender">
                  GYAN KI VARSHA
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-md font-display text-xl sm:text-2xl text-ivory/95 leading-snug">
              Specialist Science Coaching for CBSE &amp; ICSE Classes IX &amp; X.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/55">
              Personalised attention, concept-first teaching, and rigorous testing in Kharadi, Pune,
              Maharashtra.
            </p>

            <div className="mt-7">
              <button
                onClick={onEnquire}
                className="inline-flex items-center gap-2 border border-ivory/30 px-5 h-10 text-[12px] font-bold tracking-[0.11em] uppercase text-ivory hover:bg-ivory/10 transition-colors"
              >
                Book a Free Counselling Session →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs font-semibold uppercase tracking-wider">
            {[
              ...navItems,
              { label: "FAQ", to: "/faq" },
              { label: "Privacy Policy", to: "/privacy" },
              { label: "Terms of Service", to: "/terms" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="border-b border-ivory/10 py-3 text-ivory/65 transition-colors hover:text-lavender hover:border-lavender/40"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Joshi's Academy. Kharadi, Pune, Maharashtra, India.</p>
          <div className="flex items-center gap-6">
            <span className="text-ivory/35">CBSE • ICSE • Science • IX–X</span>
            <button onClick={onEnquire} className="text-lavender hover:underline cursor-pointer">
              Direct Admissions Desk →
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
