import js from "@eslint/js";
import next from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  // Базовые правила JS
  js.configs.recommended,

  // Базовые правила Next.js (React, JSX, Hooks, A11y — всё уже внутри)
  ...next,

  // Наши кастомные правила
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier
      "prettier/prettier": "error",

      // React
      "react/jsx-key": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // A11y
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",

      // Common
      "no-console": "warn",
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",

      // Max length sync with Prettier
      "max-len": [
        "warn",
        {
          code: 80,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreComments: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreTrailingComments: true,
          ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
        },
      ],
    },
  },

  // Prettier config (выключает конфликтующие правила ESLint)
  prettierConfig,

  // Игнорируемые пути
  {
    ignores: ["node_modules", ".next", "dist", "build", ".vscode", ".idea"],
  },
];
