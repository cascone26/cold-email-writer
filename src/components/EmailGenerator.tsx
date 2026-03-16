"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { EmailResults } from "./EmailResults";

interface EmailVariant {
  style: string;
  subject: string;
  body: string;
}

interface FormData {
  productName: string;
  productDescription: string;
  targetAudience: string;
  senderName: string;
  senderTitle: string;
}

export function EmailGenerator() {
  const { user, openAuth } = useAuth();
  const [form, setForm] = useState<FormData>({
    productName: "",
    productDescription: "",
    targetAudience: "",
    senderName: "",
    senderTitle: "",
  });
  const [results, setResults] = useState<EmailVariant[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const generate = async () => {
    setError("");

    if (!form.productName || !form.productDescription || !form.targetAudience || !form.senderName) {
      setError("Fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError(
            user
              ? "Daily limit reached. Upgrade to Pro for unlimited generations."
              : "Daily limit reached. Sign in and upgrade to Pro for unlimited."
          );
        } else {
          setError(data.error || "Generation failed. Try again.");
        }
        setLoading(false);
        return;
      }

      setResults(data.emails);
      if (data.remaining !== undefined) {
        setRemaining(data.remaining);
      }
    } catch {
      setError("Network error. Try again.");
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate();
  };

  return (
    <div className="w-full">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Product / Service name *
            </label>
            <input
              name="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder="e.g., ColdDraft"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Target audience *
            </label>
            <input
              name="targetAudience"
              value={form.targetAudience}
              onChange={handleChange}
              placeholder="e.g., SaaS founders, sales teams"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            What does it do? *
          </label>
          <textarea
            name="productDescription"
            value={form.productDescription}
            onChange={handleChange}
            rows={3}
            placeholder="e.g., AI-powered cold email writer that generates 3 personalized email variants in seconds"
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Your name *
            </label>
            <input
              name="senderName"
              value={form.senderName}
              onChange={handleChange}
              placeholder="e.g., Alex Chen"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Your title
            </label>
            <input
              name="senderTitle"
              value={form.senderTitle}
              onChange={handleChange}
              placeholder="e.g., Founder & CEO"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-4 py-3 rounded-xl">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>{error}</span>
            {error.includes("Upgrade") && (
              <a href="#pricing" className="ml-auto underline font-medium hover:text-red-600">
                See pricing
              </a>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate cold emails"
            )}
          </button>

          {remaining !== null && !user?.isPro && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {remaining} free generation{remaining !== 1 ? "s" : ""} left today
            </span>
          )}
        </div>
      </form>

      {/* Results */}
      {loading && !results && (
        <div className="mt-10 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-3"
            >
              <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded shimmer" />
              <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded shimmer" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded shimmer" />
                <div className="h-3 w-5/6 bg-zinc-100 dark:bg-zinc-800/50 rounded shimmer" />
                <div className="h-3 w-4/6 bg-zinc-100 dark:bg-zinc-800/50 rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      )}

      {results && (
        <EmailResults
          emails={results}
          onRegenerate={generate}
          loading={loading}
        />
      )}
    </div>
  );
}
