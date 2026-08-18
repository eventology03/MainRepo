import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

const GATE_KEY = "eventology-gate-seen";

/**
 * First-visit language choice. Homepage only, remembered in localStorage.
 * Renders nothing until mounted so SSR output and first paint agree.
 */
export function LanguageGate({ reopenSignal = 0 }: { reopenSignal?: number }) {
  const { lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(GATE_KEY)) setOpen(true);
    } catch {
      /* private mode: just skip the gate */
    }
  }, []);

  useEffect(() => {
    if (reopenSignal > 0) {
      setLeaving(false);
      setOpen(true);
    }
  }, [reopenSignal]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const choose = (choice: "en" | "ar") => {
    if (choice !== lang) toggleLang();
    try {
      window.localStorage.setItem(GATE_KEY, "1");
    } catch {
      /* ignore */
    }
    setLeaving(true);
    window.setTimeout(() => setOpen(false), 600);
  };

  return (
    <div
      dir="ltr"
      className={`fixed inset-0 z-[100] grid grid-rows-[auto_1fr] bg-background p-5 md:p-14 transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 108%, var(--surface), var(--background) 60%)",
        }}
      />
      <header className="relative z-[2]">
        <span className="display text-xl md:text-2xl">Eventology</span>
      </header>
      <main className="relative z-[2] grid place-items-center">
        <div className="grid w-full max-w-[940px] grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <GateChoice onClick={() => choose("en")} label="English" />
          <GateChoice onClick={() => choose("ar")} label="العربية" arabic />
        </div>
      </main>
    </div>
  );
}

function GateChoice({
  label,
  onClick,
  arabic = false,
}: {
  label: string;
  onClick: () => void;
  arabic?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      lang={arabic ? "ar" : "en"}
      className="group relative isolate grid min-h-[160px] place-items-center overflow-hidden border border-hairline transition-all duration-500 hover:-translate-y-[3px] hover:border-accent md:min-h-[230px]"
    >
      <span
        aria-hidden
        className="absolute -inset-px z-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background:
            "radial-gradient(130% 100% at 18% 26%, oklch(0.5 0.15 30 / 0.32), transparent 62%), radial-gradient(130% 100% at 84% 76%, oklch(0.7 0.11 200 / 0.30), transparent 62%), repeating-linear-gradient(114deg, oklch(1 0 0 / 0.05) 0 1.5px, transparent 1.5px 9px), linear-gradient(158deg, var(--surface-2) 0%, var(--background) 100%)",
        }}
      />
      <span
        className={`relative z-[2] text-4xl leading-none md:text-6xl ${
          arabic ? "leading-snug" : "display"
        }`}
        style={arabic ? { fontFamily: '"Noto Kufi Arabic", sans-serif' } : undefined}
      >
        {label}
      </span>
    </button>
  );
}

export function clearGate() {
  try {
    window.localStorage.removeItem(GATE_KEY);
  } catch {
    /* ignore */
  }
}
