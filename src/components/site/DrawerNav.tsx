import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language-context";
import { homeCopy } from "@/lib/home-copy";
import { clearGate } from "./LanguageGate";

/** Corner wordmark + slide-out drawer. Replaces the inline nav on the homepage. */
export function DrawerNav({ onOpenPreferences }: { onOpenPreferences: () => void }) {
  const { lang, dir } = useLanguage();
  const c = homeCopy[lang];
  const [open, setOpen] = useState(false);
  const rtl = dir === "rtl";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = [
    { label: c.nav.services, hash: "services" },
    { label: c.nav.principles, hash: "principles" },
    { label: c.nav.who, hash: "who" },
    { label: c.nav.contact, hash: "contact" },
  ];

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 md:px-14"
        style={{ mixBlendMode: "difference" }}
      >
        <Link to="/" className="display text-xl md:text-2xl">
          Eventology
        </Link>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="eyebrow flex items-center gap-2.5"
        >
          <span aria-hidden className="grid w-[22px] gap-1">
            <i
              className="block h-px bg-current transition-transform duration-300"
              style={{ transform: open ? "translateY(2.5px) rotate(9deg)" : "none" }}
            />
            <i
              className="block h-px bg-current transition-transform duration-300"
              style={{ transform: open ? "translateY(-2.5px) rotate(-9deg)" : "none" }}
            />
          </span>
          {open ? c.close : c.menu}
        </button>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-background/60 transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <nav
        aria-label="Site menu"
        className="fixed inset-y-0 z-[70] flex w-[min(420px,86vw)] flex-col overflow-y-auto bg-surface px-5 pb-10 pt-20 transition-transform duration-500 md:px-14"
        style={{
          insetInlineEnd: 0,
          borderInlineStart: "1px solid var(--hairline)",
          transform: open ? "none" : `translateX(${rtl ? "-100%" : "100%"})`,
        }}
      >
        {items.map((item, i) => (
          <Link
            key={item.hash}
            to="/"
            hash={item.hash}
            onClick={() => setOpen(false)}
            className="flex items-baseline gap-2 border-b border-hairline py-4 text-xl transition-opacity hover:opacity-60 md:text-2xl"
          >
            {item.label}
            <sup className="font-mono text-[9px] opacity-50">
              {String(i + 1).padStart(2, "0")}
            </sup>
          </Link>
        ))}
        <Link
          to="/tickets"
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-2 border-b border-hairline py-4 text-xl transition-opacity hover:opacity-60 md:text-2xl"
        >
          {c.nav.tickets}
          <sup className="font-mono text-[9px] opacity-50">05</sup>
        </Link>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            clearGate();
            onOpenPreferences();
          }}
          className="mt-auto border-t border-hairline pt-4 text-start text-xl text-accent transition-opacity hover:opacity-60 md:text-2xl"
        >
          {c.prefs}
          <sup className="font-mono text-[9px] opacity-50">06</sup>
          <span className="eyebrow mt-1.5 block">{c.prefsHint}</span>
        </button>
      </nav>
    </>
  );
}
