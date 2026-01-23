import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="rounded-3xl border border-white/20 bg-white/10 p-10 backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Страница не найдена</h1>
        <p className="mt-3 text-sm text-white/70">
          Проверьте ссылку или вернитесь на главную страницу.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
