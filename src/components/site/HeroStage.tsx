import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { homeCopy } from "@/lib/home-copy";
import mark from "@/assets/mark-fill.png";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

/**
 * Staged hero: the mask-lit mark holds the first screen, the wordmark and CTAs
 * rise on scroll, then the whole core lifts away. ~180vh of runway.
 */
export function HeroStage() {
  const { lang } = useLanguage();
  const c = homeCopy[lang];
  const stage = useRef<HTMLElement>(null);
  const core = useRef<HTMLDivElement>(null);
  const markBox = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  // The wordmark and CTAs are invisible at rest but still occupy layout space,
  // which pushes the mark above centre. Offset the core by half that space and
  // ease it out as they fade in.
  const [lift, setLift] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!core.current || !markBox.current) return;
      setLift((core.current.offsetHeight - markBox.current.offsetHeight) / 2);
    };
    measure();
    document.fonts?.ready.then(measure); // wordmark height changes once Fraunces loads
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [lang]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(0.34);
      return;
    }
    const el = stage.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const total = el.offsetHeight - window.innerHeight;
      setP(total > 0 ? clamp(-el.getBoundingClientRect().top / total, 0, 1) : 0);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const a = clamp(p / 0.34, 0, 1);
  const b = clamp((p - 0.55) / 0.45, 0, 1);
  const maskStyle = {
    WebkitMaskImage: `url(${mark})`,
    maskImage: `url(${mark})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as const;

  return (
    <section ref={stage} id="top" className="relative" style={{ height: "180vh" }}>
      <div className="sticky top-0 grid h-screen place-items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 50%, transparent 45%, var(--background) 100%)",
          }}
        />

        <div
          ref={core}
          className="relative z-[3] grid justify-items-center"
          style={{
            opacity: 1 - b,
            transform: `translateY(${lift * (1 - a) - 60 * b}px) scale(${1 - 0.06 * b})`,
          }}
        >
          <div
            ref={markBox}
            className="relative w-[min(26vw,320px)]"
            style={{ aspectRatio: "686 / 835", transform: `translateY(${-34 * a}px)` }}
          >
            <div
              className="absolute inset-0 hero-sheen"
              style={{
                ...maskStyle,
                background:
                  "linear-gradient(115deg,#3a3a42 0%,#7d818c 18%,#e9edf2 32%,#6a6e78 46%,#3a3a42 58%,#e9edf2 74%,#55565e 88%,#3a3a42 100%)",
                backgroundSize: "260% 260%",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                ...maskStyle,
                background:
                  "radial-gradient(60% 90% at 15% 50%, oklch(0.74 0.12 78), transparent 60%), radial-gradient(60% 90% at 85% 50%, oklch(0.7 0.11 200), transparent 60%)",
                mixBlendMode: "color-dodge",
                opacity: 0.55,
              }}
            />
          </div>

          <div
            className="display mt-5 text-5xl leading-none md:mt-10 md:text-8xl"
            style={{ opacity: a, transform: `translateY(${26 * (1 - a)}px)` }}
          >
            Eventology
          </div>

          <div
            className="mt-6 flex flex-wrap justify-center gap-3 md:mt-11"
            style={{ opacity: a, transform: `translateY(${26 * (1 - a)}px)` }}
          >
            <a
              href="#contact"
              className="eyebrow rounded-sm border border-hairline px-5 py-3 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {c.ctaBook}
            </a>
            <a
              href="#services"
              className="eyebrow rounded-sm border border-hairline px-5 py-3 transition-colors hover:border-accent hover:text-accent"
            >
              {c.ctaServices}
            </a>
          </div>
        </div>

        <div
          className="eyebrow absolute bottom-8 left-1/2 z-[4] flex -translate-x-1/2 items-center gap-2.5"
          style={{ opacity: clamp(1 - p * 4, 0, 1) }}
        >
          <i className="block h-px w-6 bg-current" />
          {c.scroll}
        </div>
      </div>
    </section>
  );
}
