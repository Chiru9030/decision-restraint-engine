"use client";

import { useState } from "react";
import { AnalysisProcess } from "@/components/AnalysisProcess";
import { BrainCircuit, Loader2, ArrowRight } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Decision Engine malfunction.");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Analysis Failed. System overload or configuration error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30">

      <div className="max-w-4xl w-full flex flex-col items-center space-y-12">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <BrainCircuit className="w-10 h-10 text-zinc-500" />
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              Decision Restraint Engine
            </h1>
          </div>
          <p className="text-zinc-500 max-w-md mx-auto font-mono text-sm leading-relaxed">
            "A correct refusal is superior to a confident mistake. Visibility of uncertainty is intelligence."
          </p>
        </div>

        {/* INPUT AREA */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a decision or question for restraint analysis..."
            className="w-full bg-zinc-900/50 border border-zinc-800 p-6 pr-16 rounded-xl text-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all text-zinc-200 placeholder:text-zinc-700 font-medium"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query}
            className="absolute right-3 top-3 bottom-3 aspect-square bg-zinc-100 text-zinc-950 rounded-lg flex items-center justify-center hover:bg-zinc-300 disabled:opacity-20 disabled:hover:bg-zinc-100 transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          </button>
        </form>

        {/* RESULTS AREA */}
        <div className="w-full">
          {error && (
            <div className="text-red-500 font-mono text-center p-4 border border-red-900/20 bg-red-950/20 rounded">
              Error: {error}
            </div>
          )}

          {result && <AnalysisProcess data={result} />}
        </div>

      </div>

      {/* FOOTER */}
      <footer className="fixed bottom-6 text-zinc-800 text-xs font-mono uppercase tracking-widest">
        Restraint is a feature, not a failure.
      </footer>
    </main>
  );
}
