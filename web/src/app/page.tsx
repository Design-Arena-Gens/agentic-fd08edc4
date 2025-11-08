import HydrationTracker from "@/components/HydrationTracker";
import RecipeExplorer from "@/components/RecipeExplorer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white px-4 py-10 font-sans dark:from-black dark:to-zinc-950 sm:px-6">
      <main className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Drinking
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Track hydration and explore drink recipes.
            </p>
          </div>
          <a
            href="https://agentic-fd08edc4.vercel.app"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Live
          </a>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <HydrationTracker />
          <RecipeExplorer />
        </div>
      </main>
    </div>
  );
}
