"use client";

import { useAuth } from "./AuthProvider";
import { useState } from "react";

export function Pricing() {
  const { user, openAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      openAuth();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // ignore
    }
    setLoading(false);
  };

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Free
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                  $0
                </span>
                <span className="text-zinc-500">/month</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Perfect for trying it out.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "3 generations per day",
                "All 3 email styles",
                "Copy to clipboard",
                "No sign-up required",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <a
                href="#top"
                className="block w-full text-center py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
              >
                Start generating
              </a>
            </div>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border-2 border-indigo-500 bg-white dark:bg-zinc-900/50 p-8 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold uppercase tracking-wider">
                Most Popular
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Pro
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                  $9
                </span>
                <span className="text-zinc-500">/month</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                For teams and power users.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Unlimited generations",
                "All 3 email styles",
                "Copy to clipboard",
                "Priority generation speed",
                "Cancel anytime",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <button
                onClick={handleUpgrade}
                disabled={loading || user?.isPro}
                className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/25"
              >
                {user?.isPro
                  ? "You're on Pro"
                  : loading
                  ? "Loading..."
                  : "Upgrade to Pro"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
