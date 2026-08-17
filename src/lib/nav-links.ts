export type NavItem = { type: "anchor"; hash: string } | { type: "route"; href: string };

// Order matches translations.ts `nav.links` by index.
// Anchor items always link to "/" with a hash — they only resolve to sections
// that exist on the homepage, so this keeps them working from any page.
// The Work section was retired with the new homepage; its entry is removed here
// and from `nav.links` in translations.ts (both locales) so the labels stay aligned.
export const navItems: NavItem[] = [
  { type: "anchor", hash: "who" },
  { type: "anchor", hash: "services" },
  { type: "anchor", hash: "contact" },
  { type: "route", href: "/tickets" },
];
