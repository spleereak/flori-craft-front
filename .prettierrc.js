module.exports = {
  // Основные настройки
  semi: true,
  trailingComma: "es5",
  singleQuote: false,
  printWidth: 80, // Стандартная длина для лучшей совместимости
  tabWidth: 2,
  useTabs: false,

  // JSX настройки
  jsxSingleQuote: false,
  bracketSameLine: false, // Заменяет устаревший jsxBracketSameLine

  // Плагины
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss", // Включено для Tailwind CSS
  ],

  // Настройки для сортировки импортов
  importOrder: ["^react$", "^next/(.*)$", "^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  // Настройки для Tailwind CSS
  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["clsx", "cn", "cva"],
  tailwindAttributes: ["className", "class"],

  // Дополнительные настройки
  endOfLine: "lf",
  arrowParens: "avoid",
  bracketSpacing: true,
  quoteProps: "as-needed",
};
