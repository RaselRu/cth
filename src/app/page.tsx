import Link from "next/link";
import { ArrowRight, Gift, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    title: "Ежедневные квесты",
    description: "Repost → бонус токенов, streak + XP.",
    icon: Gift,
  },
  {
    title: "Коллекции и редкости",
    description: "Жинақтар • Стикерлер • Комьюнити сезімі.",
    icon: Sparkles,
  },
  {
    title: "Прозрачные начисления",
    description: "Supabase + realtime для честных балансов.",
    icon: ShieldCheck,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            Community Tokens Hub • PWA
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            CTH — твой TikTok клуб, где репосты превращаются в токены и редкие
            коллекции.
          </h1>
          <p className="text-white/70">
            Қауымдастыққа қосыл • Получай уровни, жетістіктер и реальные
            награды за активность. Устанавливай как приложение и следи за
            прогрессом каждый день.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:from-purple-600 hover:to-pink-600"
            >
              Присоединиться
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-base font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Открыть кабинет
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 text-sm text-white/70">
            <strong className="text-white">PWA Ready:</strong> установи на iOS
            или Android, чтобы получать напоминания о квестах.
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl">
            <p className="text-sm text-white/60">Сегодняшний челлендж</p>
            <h2 className="mt-3 text-2xl font-semibold">
              Репост + скриншот → 50 токенов
            </h2>
            <p className="mt-4 text-white/70">
              Сними скрин, отправь в приложение и получи бонус. Порог
              достижений пересчитывается автоматически.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                Бонус активен
              </span>
              <span className="text-xs text-white/60">Обновление каждые 24ч</span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/5 p-6">
            <p className="text-sm text-white/60">Kaspi QR</p>
            <h3 className="mt-2 text-xl font-semibold">Быстрое пополнение</h3>
            <p className="mt-3 text-white/70">
              Сканируй QR, подтверждай платеж и сразу увеличивай баланс
              токенов.
            </p>
            <Link
              href="/buy"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
            >
              Перейти к оплате <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-white/70">{feature.description}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
