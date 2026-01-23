"use client";

import { useState } from "react";
import { CheckCircle2, QrCode } from "lucide-react";
import { motion } from "framer-motion";

const packages = [
  { id: "start", label: "Старт", price: 499, tokens: 500, bonus: 0 },
  { id: "pro", label: "Про", price: 1499, tokens: 1500, bonus: 150 },
  { id: "max", label: "Макси", price: 4999, tokens: 5000, bonus: 800 },
];

export default function BuyPage() {
  const [selected, setSelected] = useState(packages[1]);

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500">
              <QrCode className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Kaspi QR пополнение</h1>
              <p className="text-sm text-white/70">
                Оплати через Kaspi → баланс обновится автоматически.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {packages.map((pack) => (
              <button
                key={pack.id}
                onClick={() => setSelected(pack)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  selected.id === pack.id
                    ? "border-emerald-400 bg-emerald-500/10 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
                }`}
              >
                <div className="text-sm text-white/60">{pack.label}</div>
                <div className="mt-2 text-xl font-semibold">{pack.price} ₸</div>
                <div className="text-sm text-white/70">
                  {pack.tokens} токенов
                </div>
                {pack.bonus > 0 && (
                  <div className="mt-2 text-xs text-emerald-300">
                    +{pack.bonus} бонус
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            После оплаты нажми «Я оплатил», чтобы отправить заявку на проверку.
          </div>

          <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-4 text-lg font-semibold text-white hover:from-emerald-600 hover:to-teal-700">
            Я оплатил
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl"
        >
          <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-3xl bg-white p-4">
            <div className="grid grid-cols-9 gap-1">
              {Array.from({ length: 81 }, (_, index) => {
                const isDark =
                  index % 3 === 0 || index % 5 === 0 || index % 7 === 0;
                return (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-sm ${
                      isDark ? "bg-slate-900" : "bg-slate-200"
                    }`}
                  />
                );
              })}
            </div>
          </div>
          <h2 className="mt-6 text-xl font-semibold">Kaspi QR</h2>
          <p className="mt-2 text-sm text-white/70">
            Сканируй QR и выбери пакет на {selected.tokens} токенов.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/80">
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            Платёж защищён
          </div>
        </motion.div>
      </div>
    </div>
  );
}
