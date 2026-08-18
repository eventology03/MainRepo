import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language-context";
import { navItems } from "@/lib/nav-links";

export function Footer() {
  const { t } = useLanguage();
  const links = navItems.map((item, i) => ({ ...item, label: t.nav.links[i] }));

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <h3 className="display text-3xl md:text-4xl mb-4">Eventology</h3>
          </div>
          <div>
            <p className="eyebrow mb-4">{t.footer.navigate}</p>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.type === "route" ? l.href : l.hash}>
                  {l.type === "route" ? (
                    <Link to={l.href} className="hover:text-accent transition-colors">
                      {l.label}
                    </Link>
                  ) : (
                    <Link to="/" hash={l.hash} className="hover:text-accent transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">{t.footer.contact}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@eventology.sa" className="hover:text-accent transition-colors">
                  info@eventology.sa
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+966546355123"
                  className="hover:text-accent transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline-t pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Eventology. {t.footer.rights}
          </p>
          <p className="font-mono">{t.footer.motto}</p>
        </div>

        <div className="mt-16 select-none">
          <p className="display text-[18vw] leading-none text-accent/10 tracking-tighter">
            Eventology
          </p>
        </div>
      </div>
    </footer>
  );
}
