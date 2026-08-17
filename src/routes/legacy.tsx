// The previous homepage, preserved verbatim at /legacy so the old design stays
// live for comparison. Only the route id and the component name changed.
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal, Stagger, staggerItem } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/language-context";

import hero from "@/assets/hero.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import event5 from "@/assets/event-5.jpg";
import event6 from "@/assets/event-6.jpg";

export const Route = createFileRoute("/legacy")({
  component: Legacy,
});

const works = [
  { img: event1, name: "Sovereign Gala", type: "Corporate Gala", year: "2025" },
  { img: event2, name: "Meridian Launch", type: "Product Launch", year: "2025" },
  { img: event3, name: "Villa Cascadia", type: "Private Wedding", year: "2024" },
  { img: event4, name: "Horizon Summit", type: "Conference", year: "2024" },
  { img: event5, name: "Silent Objects", type: "Exhibition Opening", year: "2024" },
  { img: event6, name: "Studio Noir SS26", type: "Runway Show", year: "2024" },
];

function Legacy() {
  const { dir } = useLanguage();
  const hash = useRouterState({ select: (s) => s.location.hash });

  // Cross-route Link navigations (e.g. from /tickets to /#services) land here
  // before the target section has mounted, so the router's own hash-scroll
  // fires too early and silently no-ops. Retry once the hash is known and
  // this page's sections are in the DOM.
  useEffect(() => {
    if (!hash) return;
    // Runs after the router's own scrollRestoration reset (which otherwise
    // wins the race and leaves the page at the top). Cross-page hash jumps
    // land instantly rather than animating, since we're already mid-transition.
    const id = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
    }, 50);
    return () => window.clearTimeout(id);
  }, [hash]);

  return (
    <div id="top" dir={dir} className="bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <VMG />
      <Chapters />
      <Services />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-end pb-16 pt-32 md:pt-40 md:pb-24 overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={hero}
          alt=""
          width={1920}
          height={1280}
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="mx-auto max-w-[1400px] w-full px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="eyebrow mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-accent" />
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[5.2vw] md:text-[3.4vw] lg:text-[2.88rem] xl:text-[3.4rem] max-w-6xl"
        >
          {t.hero.titlePart1} {t.hero.titleEm},
          <br />
          {t.hero.titlePart2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-6 text-muted-foreground text-[2.6vw] md:text-lg whitespace-nowrap"
        >
          {t.hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-accent text-accent-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            {t.hero.cta1}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-hairline hover:border-accent hover:text-accent transition-colors"
          >
            {t.hero.cta2}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-10 rtl:right-auto rtl:left-6 rtl:md:left-10 eyebrow flex items-center gap-2"
      >
        {t.hero.scroll}
        <span className="w-12 h-px bg-muted-foreground relative overflow-hidden">
          <motion.span
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent"
          />
        </span>
      </motion.div>
    </section>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee() {
  const { t } = useLanguage();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="hairline-t hairline-b py-6 overflow-hidden">
      <div className="flex gap-14 marquee w-max whitespace-nowrap">
        {items.map((text, i) => (
          <div key={i} className="flex items-center gap-14 text-lg">
            <span className="text-muted-foreground">{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- VISION / MISSION / GOAL ---------- */
function VMG() {
  const { t } = useLanguage();
  return (
    <section className="py-24 md:py-36 mx-auto max-w-[1400px] px-6 md:px-10">
      <Reveal className="eyebrow mb-10">{t.principlesEyebrow}</Reveal>
      <Stagger className="grid md:grid-cols-3 gap-0 hairline-t">
        {t.principles.map((v, i) => (
          <motion.div
            key={v.label}
            variants={staggerItem}
            className={`py-10 md:py-14 md:px-10 ${
              i > 0 ? "md:border-l md:border-hairline rtl:md:border-l-0 rtl:md:border-r" : ""
            } ${i > 0 ? "hairline-t md:border-t-0" : ""}`}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="eyebrow">{v.label}</span>
            </div>
            <h3 className="display text-2xl md:text-3xl mb-6 leading-tight">{v.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{v.body}</p>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}

/* ---------- CHAPTERS ---------- */
function Chapters() {
  const { t } = useLanguage();
  return (
    <section id="who" className="relative py-24 md:py-40 mx-auto max-w-[1400px] px-6 md:px-10">
      <div className="grid md:grid-cols-[300px_1fr] gap-10 md:gap-20 mb-16">
        <Reveal className="eyebrow">{t.chaptersEyebrow}</Reveal>
        <Reveal>
          <h2 className="display text-4xl md:text-6xl max-w-3xl">{t.chaptersHeading}</h2>
        </Reveal>
      </div>

      <div className="space-y-0">
        {t.chapters.map((c, i) => (
          <Reveal
            key={c.label}
            delay={i * 0.05}
            className="grid md:grid-cols-[300px_1fr] gap-6 md:gap-20 py-10 md:py-14 hairline-t group"
          >
            <div className="flex items-baseline gap-4">
              <span className="display text-6xl md:text-8xl text-accent/30 group-hover:text-accent transition-colors duration-700">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="max-w-3xl">
              <p className="eyebrow mb-4">{c.label}</p>
              <p className="text-2xl md:text-3xl display font-light leading-snug">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-24 md:py-36 border-y border-hairline bg-surface/40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-[300px_1fr] gap-10 md:gap-20 mb-16">
          <Reveal className="eyebrow">{t.servicesEyebrow}</Reveal>
          <Reveal>
            <h2 className="display text-4xl md:text-6xl max-w-3xl">
              {t.servicesHeadingPre} <em className="italic text-accent">{t.servicesHeadingEm}</em>
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3">
          {t.services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              className={`group relative p-8 md:p-10 border-hairline hairline-t ${
                i % 3 !== 0 ? "lg:border-l rtl:lg:border-l-0 rtl:lg:border-r" : ""
              } ${i % 2 !== 0 ? "md:border-l lg:border-l rtl:md:border-l-0 rtl:md:border-r rtl:lg:border-r" : ""} hover:bg-surface-2/60 transition-colors duration-500`}
            >
              <div className="flex items-start justify-between mb-10">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-sm group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-500 group-hover:rotate-45">
                  +
                </span>
              </div>
              <h3 className="display text-2xl md:text-3xl mb-4 leading-tight">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
              <span className="absolute left-0 bottom-0 h-px w-0 bg-accent transition-all duration-700 group-hover:w-full rtl:left-auto rtl:right-0" />
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- WORK ---------- */
function Work() {
  const { t } = useLanguage();
  const [cursor, setCursor] = useState({ x: 0, y: 0, show: false });

  return (
    <section
      id="work"
      onMouseMove={(e) => setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }))}
      className="relative py-24 md:py-36 mx-auto max-w-[1400px] px-6 md:px-10"
    >
      <div className="grid md:grid-cols-[300px_1fr] gap-10 md:gap-20 mb-16">
        <Reveal className="eyebrow">{t.workEyebrow}</Reveal>
        <Reveal>
          <h2 className="display text-4xl md:text-6xl max-w-3xl">
            Executed, <em className="italic text-accent">not improvised.</em>
          </h2>
        </Reveal>
      </div>

      <Stagger className="grid md:grid-cols-2 gap-6 md:gap-8">
        {works.map((w, i) => (
          <motion.a
            key={w.name}
            href="#contact"
            variants={staggerItem}
            onMouseEnter={() => setCursor((c) => ({ ...c, show: true }))}
            onMouseLeave={() => setCursor((c) => ({ ...c, show: false }))}
            className={`group relative overflow-hidden bg-surface ${
              i % 3 === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                i % 3 === 0 ? "aspect-[16/8]" : "aspect-[4/5]"
              }`}
            >
              <img
                src={w.img}
                alt={w.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between">
              <div>
                <p className="eyebrow mb-2">
                  {w.type} — {w.year}
                </p>
                <h3 className="display text-2xl md:text-4xl">{w.name}</h3>
              </div>
              <span className="hidden md:inline-block w-12 h-12 rounded-full border border-hairline bg-background/40 backdrop-blur flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all">
                ↗
              </span>
            </div>
          </motion.a>
        ))}
      </Stagger>

      {/* cursor-follow label */}
      <motion.div
        animate={{
          x: cursor.x + 16,
          y: cursor.y + 16,
          opacity: cursor.show ? 1 : 0,
          scale: cursor.show ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.4 }}
        className="pointer-events-none fixed top-0 left-0 z-40 px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs font-mono uppercase tracking-widest"
      >
        View Event
      </motion.div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="relative py-24 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 30%, oklch(0.74 0.12 78 / 0.25), transparent 70%), radial-gradient(50% 50% at 80% 60%, oklch(0.5 0.15 30 / 0.18), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="eyebrow mb-8">{t.contact.eyebrow}</Reveal>
        <Reveal>
          <h2 className="display text-5xl md:text-8xl lg:text-9xl leading-[0.95] max-w-6xl mb-16">
            {t.contact.headingPre} <em className="italic text-accent">{t.contact.headingEm}</em>
            <br />
            {t.contact.headingPost}
          </h2>
        </Reveal>

        <Stagger className="grid md:grid-cols-2 gap-6" stagger={0.15}>
          <motion.a
            variants={staggerItem}
            href="https://wa.me/+966546355123"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden p-10 md:p-14 bg-surface border border-hairline hover:border-accent transition-colors"
          >
            <div className="flex items-start justify-between mb-16">
              <span className="eyebrow">{t.contact.whatsappLabel}</span>
              <span className="w-3 h-3 rounded-full bg-accent shimmer" />
            </div>
            <h3 className="display text-4xl md:text-5xl mb-3">{t.contact.whatsappTitle}</h3>
            <p className="text-muted-foreground mb-8">{t.contact.whatsappBody}</p>
            <div className="inline-flex items-center gap-3 text-accent">
              {t.contact.whatsappCta}
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </div>
          </motion.a>

          <motion.a
            variants={staggerItem}
            href="mailto:info@eventology.sa"
            className="group relative overflow-hidden p-10 md:p-14 bg-surface border border-hairline hover:border-accent transition-colors"
          >
            <div className="flex items-start justify-between mb-16">
              <span className="eyebrow">{t.contact.emailLabel}</span>
              <span className="w-3 h-3 rounded-full bg-foreground/40" />
            </div>
            <h3 className="display text-4xl md:text-5xl mb-3">{t.contact.emailTitle}</h3>
            <p className="text-muted-foreground mb-8">{t.contact.emailBody}</p>
            <div className="inline-flex items-center gap-3 text-accent">
              info@eventology.sa
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </div>
          </motion.a>
        </Stagger>
      </div>
    </section>
  );
}
