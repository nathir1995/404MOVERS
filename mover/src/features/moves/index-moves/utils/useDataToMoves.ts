import React from "react";
import { a } from "@/utils/safeArray";

type Page<T> = { data?: T[] | null };

export default function useDataToMoves<T = any>(data: { pages?: Page<T>[] | null } | undefined) {
  return React.useMemo<T[]>(() => {
    if (!data || !Array.isArray(data.pages)) return [];
    // Flatten pages safely; tolerate pages with undefined/null data
    return data.pages.reduce<T[]>((acc, curr) => acc.concat(a(curr?.data)), []);
  }, [data]);
}
