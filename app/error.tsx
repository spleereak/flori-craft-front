"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-xl font-semibold text-gray-800">
        Что-то пошло не так
      </h1>
      <p className="max-w-md text-center text-gray-600">
        Не удалось загрузить данные. Попробуйте обновить страницу или вернуться
        на главную.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-700"
        >
          Попробовать снова
        </button>
        <Link
          href="/"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
