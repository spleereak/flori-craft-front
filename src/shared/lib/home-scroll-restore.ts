const STORAGE_Y = "floricraft_homeScrollY";
const STORAGE_CATEGORY = "floricraft_homeCategory";
const STORAGE_RESTORE = "floricraft_restoreHomeScroll";

export function saveHomeScrollPosition(categoryName: string): void {
  sessionStorage.setItem(STORAGE_Y, String(window.scrollY));
  sessionStorage.setItem(STORAGE_CATEGORY, categoryName);
}

export function markRestoreHomeScroll(): void {
  sessionStorage.setItem(STORAGE_RESTORE, "1");
}

export function clearHomeScrollRestore(): void {
  sessionStorage.removeItem(STORAGE_Y);
  sessionStorage.removeItem(STORAGE_CATEGORY);
  sessionStorage.removeItem(STORAGE_RESTORE);
}

export type HomeScrollRestoreResult =
  | { kind: "none" }
  | {
      kind: "position";
      y: number;
      categoryName: string | null;
    }
  | { kind: "top" };

export function consumeHomeScrollRestore(): HomeScrollRestoreResult {
  const wantRestore = sessionStorage.getItem(STORAGE_RESTORE) === "1";
  const raw = sessionStorage.getItem(STORAGE_Y);
  const categoryRaw = sessionStorage.getItem(STORAGE_CATEGORY);
  sessionStorage.removeItem(STORAGE_Y);
  sessionStorage.removeItem(STORAGE_CATEGORY);
  sessionStorage.removeItem(STORAGE_RESTORE);
  if (!wantRestore) {
    return { kind: "none" };
  }
  if (raw === null) {
    return { kind: "top" };
  }
  const y = Number(raw);
  if (!Number.isFinite(y)) {
    return { kind: "top" };
  }
  return {
    kind: "position",
    y,
    categoryName: categoryRaw,
  };
}
