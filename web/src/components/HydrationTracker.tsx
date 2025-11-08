"use client";

import { useEffect, useMemo, useState } from "react";

type HydrationData = {
  [isoDate: string]: {
    goalMl: number;
    intakeMl: number;
  };
};

function getTodayIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const STORAGE_KEY = "hydration-tracker-data";

export function HydrationTracker() {
  const [goalMl, setGoalMl] = useState<number>(2000);
  const [intakeMl, setIntakeMl] = useState<number>(0);
  const today = useMemo(getTodayIso, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: HydrationData = JSON.parse(raw);
      const todayData = parsed[today];
      if (todayData) {
        setGoalMl(todayData.goalMl);
        setIntakeMl(todayData.intakeMl);
      }
    } catch {
      // ignore
    }
  }, [today]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: HydrationData = raw ? JSON.parse(raw) : {};
      parsed[today] = { goalMl, intakeMl };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } catch {
      // ignore
    }
  }, [goalMl, intakeMl, today]);

  const progressPct = Math.min(100, Math.round((intakeMl / Math.max(1, goalMl)) * 100));

  function addIntake(amount: number) {
    setIntakeMl((prev) => Math.max(0, prev + amount));
  }

  function handleCustomAdd() {
    const value = prompt("Add amount (ml):", "250");
    if (!value) return;
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) addIntake(parsed);
  }

  function handleSetGoal() {
    const value = prompt("Set daily goal (ml):", String(goalMl));
    if (!value) return;
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) setGoalMl(parsed);
  }

  function resetToday() {
    if (confirm("Reset today's intake?")) setIntakeMl(0);
  }

  return (
    <section className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Hydration Tracker</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{today}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSetGoal} className="rounded-full border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">Set goal</button>
          <button onClick={resetToday} className="rounded-full border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">Reset</button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-700 dark:text-zinc-300">{intakeMl} ml</span>
          <span className="text-zinc-700 dark:text-zinc-300">Goal: {goalMl} ml</span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
          <div
            className="h-full rounded-full bg-blue-600 transition-[width] duration-300 dark:bg-blue-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-zinc-600 dark:text-zinc-400">{progressPct}%</div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button onClick={() => addIntake(250)} className="rounded-lg bg-zinc-100 px-4 py-2 text-sm hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800">+250 ml</button>
        <button onClick={() => addIntake(500)} className="rounded-lg bg-zinc-100 px-4 py-2 text-sm hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800">+500 ml</button>
        <button onClick={() => addIntake(750)} className="rounded-lg bg-zinc-100 px-4 py-2 text-sm hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800">+750 ml</button>
        <button onClick={handleCustomAdd} className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">Custom</button>
      </div>

      <div className="mt-6 text-xs text-zinc-600 dark:text-zinc-400">
        Tips: Water first. Spread intake through the day. Adjust goal for activity.
      </div>
    </section>
  );
}

export default HydrationTracker;
