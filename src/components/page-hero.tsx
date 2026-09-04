import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: ReactNode }) {
  return <section className="bg-ink px-6 pb-20 pt-36 text-ivory md:px-10 md:pb-28 md:pt-44"><div className="mx-auto max-w-[1500px]"><p className="eyebrow text-gold">{eyebrow}</p><h1 className="mt-6 max-w-6xl font-display text-6xl leading-[.95] md:text-8xl">{title}</h1><div className="mt-10 grid gap-8 border-t border-ivory/20 pt-8 md:grid-cols-2"><p className="max-w-xl text-lg leading-8 text-ivory/65">{intro}</p>{children}</div></div></section>;
}

export function Crumbs({ items }: { items: string[] }) { return <nav aria-label="Breadcrumb" className="eyebrow text-slate"><ol className="flex flex-wrap gap-2"><li><a href="/" className="hover:text-gold">Home</a></li>{items.map((item) => <li key={item} className="before:mr-2 before:content-['/']">{item}</li>)}</ol></nav>; }

export const seoMeta = (title: string, description: string) => [
  { title }, { name: "description", content: description },
  { property: "og:title", content: title }, { property: "og:description", content: description },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
];