"use client";
import Link from "next/link";
import { Gift, Sparkles, Star, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

const user = {
  level: "Серебро",
  xp: 247,
  xpGoal: 500,
  balance: 1247,
  streak: 4,
};

const quests = [
  { title: "Ежедневный вызов", reward: "50 токенов", action: "Сделай репост" },
  { title: "Новый подписчик", reward: "15 токенов", action: "Приведи друга" },
];

export default function DashboardPage() {
  const progress = Math.min(100, Math.round((user.xp / user.xpGoal) * 100));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500">
              <Trophy className="h-8 w-8 text-slate-900" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{user.level}</div>
              <div className="text-white/70">
                {user.xp}/{user.xpGoal} XP
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-4 rounded-full bg-white/20">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-white/70">{progress}% до нового уровня</div>
          </div>

          <div className="mt-6 text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            {user.balance} токенов
          </div>
          <p className="mt-2 text-sm text-white/70">
            Streak: {user.streak} дней подряд • Бонус +5%
          </p>
          <Link
            href="/buy"
            className="mt-6 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-4 text-lg font-semibold text-white transition hover:from-emerald-600 hover:to-teal-700"
          >
            Пополнить → Kaspi QR
          </Link>
        </div>

        <div className="space-y-6">
          {quests.map((quest) => (
            <motion.div
              key={quest.title}
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
                  <div className="text-white/70">
                    {quest.action} → {quest.reward}
                  </div>
                </div>
              </div>
              <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-sm font-semibold text-white hover:from-purple-600 hover:to-pink-600">
                Выполнить
              </button>
            </motion.div>
          ))}

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Бустеры</h3>
                <div className="text-white/70">+25% XP на 24 часа</div>
              </div>
            </div>
            <button className="mt-4 w-full rounded-2xl border border-white/30 py-3 text-sm font-semibold text-white/80 transition hover:border-white/50 hover:text-white">
              Активировать
            </button>
          </div>
        </div>
      </motion.div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Коллекция стикеров</h2>
          <span className="text-sm text-white/70">8 из 20 открыто</span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }, (_, index) => index + 1).map((id) => (
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              key={id}
              className="group relative rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-xl transition-all hover:border-purple-400"
            >
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-xl font-semibold">
                {id}
              </div>
              <div className="text-xs text-white/70">Стикер {id}</div>
              {id % 2 === 0 && (
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                  ✓
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Достижения", value: "6/12", icon: Star },
          { label: "Редкости", value: "3 легендарных", icon: Sparkles },
          { label: "Еженедельный ранг", value: "Топ-12", icon: Trophy },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <item.icon className="h-6 w-6" />
            </div>
            <div className="text-sm text-white/60">{item.label}</div>
            <div className="mt-2 text-lg font-semibold">{item.value}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
