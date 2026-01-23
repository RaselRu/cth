"use client";

import { motion } from "framer-motion";
import { Gem, Lock } from "lucide-react";

const stickers = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `Стикер ${index + 1}`,
  rarity: index % 5 === 0 ? "Легендарный" : index % 2 === 0 ? "Редкий" : "Обычный",
  owned: index % 3 !== 0,
}));

export default function CollectionPage() {
  const ownedCount = stickers.filter((sticker) => sticker.owned).length;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Моя коллекция</h1>
          <span className="text-sm text-white/70">
            {ownedCount} / {stickers.length} собрано
          </span>
        </div>
        <div className="mt-4 h-3 rounded-full bg-white/20">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
            style={{ width: `${Math.round((ownedCount / stickers.length) * 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {stickers.map((sticker) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={sticker.id}
            className="relative rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-xl"
          >
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 text-lg font-semibold">
              {sticker.id}
            </div>
            <div className="text-sm font-semibold">{sticker.name}</div>
            <div className="mt-1 text-xs text-white/60">{sticker.rarity}</div>
            {sticker.owned ? (
              <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                ✓
              </div>
            ) : (
              <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs text-white/70">
                <Lock className="h-3 w-3" />
              </div>
            )}
            {sticker.rarity === "Легендарный" && (
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-1 text-[10px] text-amber-200">
                <Gem className="h-3 w-3" />
                Legendary
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
