import type { Metadata } from "next";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const withBasePath = (path: string) =>
  basePath && basePath !== "/" ? `${basePath}${path}` : path;

export const metadata: Metadata = {
  title: "Community Tokens Hub",
  description:
    "CTH — PWA для TikTok-сообщества: уровни, награды, коллекции и токены.",
  metadataBase: new URL(siteUrl),
  manifest: withBasePath("/manifest.json"),
  icons: {
    icon: withBasePath("/icons/icon-192.svg"),
    apple: withBasePath("/icons/icon-192.svg"),
  },
};

export const viewport = {
  themeColor: "#1e2327",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href={withBasePath("/manifest.json")} />
        <link rel="apple-touch-icon" href={withBasePath("/icons/icon-192.svg")} />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white antialiased">
        <div className="min-h-screen">
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
