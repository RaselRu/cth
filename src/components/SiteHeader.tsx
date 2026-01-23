import Link from "next/link";

const links = [
  { href: "/", label: "Главная" },
  { href: "/register", label: "Регистрация" },
  { href: "/dashboard", label: "Кабинет" },
  { href: "/collection", label: "Коллекция" },
  { href: "/leaderboard", label: "Лидеры" },
  { href: "/buy", label: "Kaspi QR" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          CTH <span className="text-white/60">Community Tokens Hub</span>
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-white/70">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/20 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
