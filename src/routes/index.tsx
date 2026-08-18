import { createFileRoute, useRouterState, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { homeCopy } from "@/lib/home-copy";
import { LanguageGate } from "@/components/site/LanguageGate";
import { DrawerNav } from "@/components/site/DrawerNav";
import { HeroStage } from "@/components/site/HeroStage";
import { ServicesSection, SectionRule } from "@/components/site/ServicesSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        property: "og:image",
        content:
          "https://id-preview--f309e2b4-d0ad-4432-9157-51b77d6741d3.lovable.app/og.jpg",
      },
    ],
  }),
});

function Index() {
  const { lang, dir } = useLanguage();
  const c = homeCopy[lang];
  const hash = useRouterState({ select: (s) => s.location.hash });
  const [gateSignal, setGateSignal] = useState(0);

  // Cross-route Link navigations (e.g. from /tickets to /#services) land here
  // before the target section has mounted, so the router's own hash-scroll
  // fires too early and silently no-ops. Retry once the sections are in the DOM.
  // Arrival only: a same-page hash change must keep the browser's smooth scroll
  // (styles.css `scroll-behavior: smooth`), which an instant jump would cancel.
  const arrived = useRef(false);
  useEffect(() => {
    if (arrived.current) return;
    arrived.current = true;
    if (!hash) return;
    const id = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
    }, 50);
    return () => window.clearTimeout(id);
  }, [hash]);

  // overflow-x-clip, not -hidden: `hidden` makes this a scroll container
  // (overflow-y computes to auto), which silently breaks the hero's
  // position: sticky. `clip` contains overflow without that side effect.
  return (
    <div dir={dir} className="overflow-x-clip bg-background text-foreground">
      <LanguageGate reopenSignal={gateSignal} />
      <DrawerNav onOpenPreferences={() => setGateSignal((n) => n + 1)} />

      <HeroStage />
      <ServicesSection />

      {/* ---------- PRINCIPLES ---------- */}
      <section id="principles" className="relative py-14 md:py-24">
        <SectionRule label={c.labels.principles} />
        <div className="px-5 pt-8 md:px-14 md:pt-14">
          <p className="eyebrow mb-4">{c.principlesEyebrow}</p>
          <div className="mt-8 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-11">
            {c.principles.map((p, i) => (
              <div key={p.title}>
                <div className="display text-4xl opacity-30 md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 mt-3 text-xl font-medium md:text-2xl">{p.title}</h3>
                <p className="max-w-[62ch] leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section
        id="who"
        className="relative bg-foreground py-14 text-background md:py-24"
        style={{ clipPath: "polygon(0 3.2vw, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div className="eyebrow grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-background/15 px-5 pb-3.5 !text-background/60 md:px-14">
          <span />
          <span className="justify-self-center">{c.labels.about}</span>
          <span />
        </div>
        <div className="px-5 pt-8 md:px-14 md:pt-14">
          <h2 className="display max-w-[19ch] text-4xl md:text-6xl lg:text-7xl">
            {c.aboutHeading}
          </h2>
          <div className="mt-8 grid md:mt-14">
            {c.about.map((a, i) => (
              <div
                key={a.title}
                className="grid grid-cols-[auto_1fr] items-start gap-5 border-t border-background/15 py-6 md:gap-16 md:py-9"
              >
                <div className="display text-4xl tabular-nums opacity-30 md:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium md:text-xl">{a.title}</h3>
                  <p className="max-w-[56ch] text-sm leading-relaxed text-background/70">
                    {a.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section id="contact" className="relative py-14 md:py-24">
        <SectionRule label={c.labels.contact} />
        <div className="px-5 pt-8 md:px-14 md:pt-14">
          <p className="eyebrow mb-4">{c.contactEyebrow}</p>
          <h2 className="display max-w-[19ch] text-4xl md:text-6xl lg:text-7xl">
            {c.contactHeading}
          </h2>
          <div className="mt-8 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-11">
            <div>
              <h3 className="mb-2 text-xl font-medium md:text-2xl">{c.whatsappTitle}</h3>
              <p className="max-w-[62ch] leading-relaxed text-muted-foreground">
                {c.whatsappBody}
              </p>
              <a
                href="https://wa.me/+966546355123"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-w-[230px] items-center justify-between gap-12 border-b border-current py-2.5 transition-opacity hover:opacity-60"
              >
                {c.whatsappCta} <span aria-hidden>↗</span>
              </a>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-medium md:text-2xl">{c.emailTitle}</h3>
              <p className="max-w-[62ch] leading-relaxed text-muted-foreground">{c.emailBody}</p>
              <a
                href="mailto:info@eventology.sa"
                className="mt-4 inline-flex min-w-[230px] items-center justify-between gap-12 border-b border-current py-2.5 transition-opacity hover:opacity-60"
              >
                info@eventology.sa <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-hairline py-10 md:py-16">
        <div className="grid gap-6 px-5 md:grid-cols-3 md:gap-11 md:px-14">
          <div className="grid content-start">
            <Link to="/" hash="who" className="py-1 text-sm hover:text-accent">
              {c.nav.who}
            </Link>
            <Link to="/" hash="services" className="py-1 text-sm hover:text-accent">
              {c.nav.services}
            </Link>
            <Link to="/" hash="contact" className="py-1 text-sm hover:text-accent">
              {c.nav.contact}
            </Link>
            <Link to="/tickets" className="py-1 text-sm hover:text-accent">
              {c.nav.tickets}
            </Link>
          </div>
          <div>
            <p className="eyebrow mb-3">{c.footerContact}</p>
            <div className="grid content-start">
              <a href="mailto:info@eventology.sa" className="py-1 text-sm hover:text-accent">
                info@eventology.sa
              </a>
              <a
                href="https://wa.me/+966546355123"
                className="py-1 text-sm hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                {c.whatsapp}
              </a>
              <a
                href="https://www.instagram.com/eventoloogy/"
                className="py-1 text-sm hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                {c.instagram}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
