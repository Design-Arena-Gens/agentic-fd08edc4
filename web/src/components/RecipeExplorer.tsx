"use client";

import { useMemo, useState } from "react";
import { RECIPES, type Recipe } from "@/lib/recipes";

type FilterType = "All" | "Alcoholic" | "Non-Alcoholic";

export function RecipeExplorer() {
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered: Recipe[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => {
      const typeOk = filter === "All" ? true : r.type === filter;
      if (!typeOk) return false;
      if (!q) return true;
      const hay = [
        r.name,
        r.type,
        ...r.tags,
        ...r.ingredients,
        r.instructions,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, filter]);

  return (
    <section className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Drink Recipes</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Explore {filtered.length} of {RECIPES.length} recipes</p>
        </div>
        <div className="flex gap-2">
          {(["All", "Non-Alcoholic", "Alcoholic"] as FilterType[]).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full border px-3 py-1 text-sm ${
                filter === t
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-black"
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, ingredient, or tag?"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {filtered.map((r) => (
          <li key={r.id} className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{r.emoji ?? "??"}</div>
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">{r.name}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">{r.type}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {r.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white px-2 py-0.5 text-xs text-zinc-700 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-300 dark:ring-zinc-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">Ingredients:</span> {r.ingredients.join(", ")}
            </div>
            <div className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">Instructions:</span> {r.instructions}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecipeExplorer;
