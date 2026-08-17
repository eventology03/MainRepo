import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { homeCopy, serviceImages } from "@/lib/home-copy";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

/** Services: cards drift on scroll, and a focus window tracks the cursor. */
export function ServicesSection() {
  const { lang, dir } = useLanguage();
  const c = homeCopy[lang];

  return (
    <section id="services" className="relative py-14 md:py-24">
      <SectionRule label={c.labels.services} />
      <div className="px-5 pt-8 md:px-14 md:pt-14">
        <div className="mt-8 grid items-start gap-8 md:mt-14 md:grid-cols-[minmax(0,.82fr)_minmax(0,2fr)] md:gap-[90px]">
          <div className="md:sticky md:top-[26vh]">
            <h2 className="display max-w-[11ch] text-4xl md:text-6xl lg:text-7xl">
              {c.servicesHeading}
            </h2>
            <span className="mt-6 mb-2 block h-px bg-hairline md:mt-8" />
            <a
              href="#contact"
              className="flex items-center justify-between gap-6 border-b border-hairline py-3.5 text-base transition-opacity hover:opacity-60 md:text-lg"
            >
              {c.workWithUs}
              <i
                aria-hidden
                className="h-2.5 w-2.5 flex-none border-r border-t border-current opacity-50"
              />
            </a>
          </div>

          <div className="grid gap-14 md:gap-[140px]">
            {c.services.map((s, i) => (
              <ServiceCard
                key={s.title}
                index={i}
                title={s.title}
                body={s.body}
                img={serviceImages[i]}
                rtl={dir === "rtl"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  index,
  title,
  body,
  img,
  rtl,
}: {
  index: number;
  title: string;
  body: string;
  img: string;
  rtl: boolean;
}) {
  const card = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const [lens, setLens] = useState({ on: false, x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = card.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -240 || r.top > vh + 240) return;
      setScroll(clamp((r.top + r.height / 2 - vh / 2) / (vh * 0.62), 0, 1));
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

  const k = lens.on ? 1 : 0;
  const half = 31 * (0.9 + 0.1 * k);
  const cx = 50 + lens.x * 8 * k;
  const cy = 50 + lens.y * 8 * k;

  return (
    <div>
      <div
        ref={card}
        onPointerEnter={() => setLens((l) => ({ ...l, on: true }))}
        onPointerLeave={() => setLens({ on: false, x: 0, y: 0 })}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setLens({
            on: true,
            x: clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1),
            y: clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1),
          });
        }}
        className="relative cursor-pointer overflow-hidden rounded-lg bg-surface"
        style={{
          aspectRatio: "16 / 10",
          transform: `translateY(${(scroll * 60).toFixed(1)}px) scale(${(1 - scroll * 0.06).toFixed(4)})`,
        }}
      >
        <img
          src={img}
          alt={title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full select-none object-cover transition-[filter,transform] duration-300"
          style={{
            filter: `blur(${(14 * k).toFixed(1)}px) saturate(${1 - 0.1 * k})`,
            transform: `scale(${1.02 + 0.04 * k})`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: k,
            clipPath: `inset(${cy - half}% ${100 - cx - half}% ${100 - cy - half}% ${cx - half}% round 6px)`,
          }}
        >
          <img src={img} alt="" aria-hidden className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="eyebrow mt-4 grid items-start gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <span>({String(index + 1).padStart(2, "0")})</span>
        <span className="max-w-[46ch] sm:justify-self-center sm:text-center">
          <b className="mb-1.5 block font-sans text-[15px] font-medium normal-case tracking-normal text-foreground">
            {title}
          </b>
          {body}
        </span>
        <span className={rtl ? "sm:justify-self-start" : "sm:justify-self-end"} />
      </div>
    </div>
  );
}

export function SectionRule({ label }: { label: string }) {
  return (
    <div className="eyebrow grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-hairline px-5 pb-3.5 md:px-14">
      <span />
      <span className="justify-self-center opacity-60">{label}</span>
      <span />
    </div>
  );
}
