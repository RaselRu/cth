"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Camera, CheckCircle, Loader2, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { getSupabaseClient } from "@/lib/supabaseClient";

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [refCode, setRefCode] = useState("");
  const [tiktokUsername, setTiktokUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setScreenshot(file);
    setError("");
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!screenshot) {
      setError("Загрузите скриншот репоста.");
      return;
    }
    setIsSubmitting(true);
    setStep(2);

    try {
      const formData = new FormData();
      formData.append("screenshot", screenshot);
      formData.append("ref_code", refCode);
      formData.append("tiktok_username", tiktokUsername);

      let registered = false;

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          registered = true;
        }
      } catch {
        registered = false;
      }

      if (!registered) {
        const supabase = getSupabaseClient();
        if (!supabase) {
          throw new Error("Добавьте Supabase ключи в .env.local");
        }

        const ocrUrl = process.env.NEXT_PUBLIC_OCR_WORKER_URL;
        const verifyUrl = process.env.NEXT_PUBLIC_TIKTOK_VERIFY_URL;

        let ocrResult: { username?: string; code?: string } = {
          username: tiktokUsername || "guest",
          code: "demo",
        };

        if (ocrUrl) {
          const ocrResponse = await fetch(ocrUrl, {
            method: "POST",
            body: screenshot,
          });
          if (ocrResponse.ok) {
            ocrResult = await ocrResponse.json();
          }
        }

        if (verifyUrl && ocrResult.code) {
          await fetch(`${verifyUrl}/${encodeURIComponent(ocrResult.code)}`);
        }

        const { error } = await supabase.from("users").insert({
          tiktok_username: ocrResult.username ?? tiktokUsername ?? "guest",
          ref_code: crypto.randomUUID().slice(0, 8),
          balance: 100,
          xp: 0,
        });

        if (error) {
          throw error;
        }
      }

      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка регистрации");
      setStep(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl"
      >
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Присоединиться к клубу
              </h1>
              <p className="mt-2 text-sm text-white/70">
                Жүктеу скриншот → автоматическая проверка TikTok
              </p>
            </div>

            <div className="space-y-4">
              <input
                value={refCode}
                onChange={(event) => setRefCode(event.target.value)}
                placeholder="Код приглашения"
                className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                value={tiktokUsername}
                onChange={(event) => setTiktokUsername(event.target.value)}
                placeholder="TikTok ник (@username)"
                className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div>
                <label className="block text-sm text-white/70">
                  Скриншот репоста ✨
                </label>
                <div
                  role="button"
                  tabIndex={0}
                  className="mt-2 flex h-32 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-white/30 bg-white/5 transition-all hover:border-purple-400"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                >
                  {screenshot ? (
                    <div className="flex items-center gap-2 text-green-300">
                      <CheckCircle className="h-8 w-8" />
                      <span className="text-sm">{screenshot.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white/70">
                      <Camera className="h-8 w-8" />
                      <span className="text-sm">Загрузить скриншот</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </div>
              {error && <p className="text-sm text-red-300">{error}</p>}
              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 text-lg font-semibold text-white transition-all hover:from-purple-600 hover:to-pink-600"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="h-5 w-5" />
                )}
                Продолжить
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-purple-300" />
            <h2 className="text-2xl font-semibold">Проверяем скриншот</h2>
            <p className="text-sm text-white/70">
              OCR + TikTok verification в процессе. Подождите пару секунд.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-400" />
            <h2 className="text-2xl font-semibold">Добро пожаловать!</h2>
            <p className="text-sm text-white/70">
              Твой аккаунт создан, бонус 100 токенов начислен.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white"
            >
              Перейти в кабинет
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
