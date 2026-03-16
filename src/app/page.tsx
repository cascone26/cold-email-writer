"use client";

import { AuthProvider } from "@/components/AuthProvider";
import { AuthModal } from "@/components/AuthModal";
import { Header } from "@/components/Header";
import { EmailGenerator } from "@/components/EmailGenerator";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

function UpgradeBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") === "true") {
      setShow(true);
      // Clean up URL
      window.history.replaceState({}, "", "/");
      setTimeout(() => setShow(false), 5000);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-500/25 animate-[slideUp_0.3s_ease-out]">
      Welcome to Pro! You now have unlimited generations.
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <AuthModal />
      <UpgradeBanner />
      <Header />

      <main id="top" className="pt-16">
        {/* Hero + Generator */}
        <section className="py-16 sm:py-24 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Hero text */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Powered by Claude AI
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
                Cold emails that{" "}
                <span className="gradient-text">actually get replies</span>
              </h1>

              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Describe your product and who you&apos;re reaching out to. Get three
                personalized email variants in seconds — casual, professional,
                and direct.
              </p>
            </div>

            {/* Stats bar */}
            <div className="flex items-center justify-center gap-8 mb-12 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                3 variants per generation
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Under 10 seconds
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                Free to start
              </div>
            </div>

            {/* Generator card */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 p-6 sm:p-8 shadow-xl shadow-zinc-200/50 dark:shadow-none">
              <EmailGenerator />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12">
              Three styles. One click.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Casual",
                  desc: "Friendly and conversational. Feels like a message from a sharp colleague who knows their stuff.",
                  color: "from-emerald-500 to-teal-500",
                  icon: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z",
                },
                {
                  title: "Professional",
                  desc: "Polished and credibility-driven. References outcomes and positions you as a trusted expert.",
                  color: "from-blue-500 to-indigo-500",
                  icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z",
                },
                {
                  title: "Direct",
                  desc: "Zero fluff. State the value, ask one question, done. Founder-to-founder energy.",
                  color: "from-orange-500 to-red-500",
                  icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
                },
              ].map((style) => (
                <div
                  key={style.title}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center mb-4`}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                    {style.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {style.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof / features */}
        <section className="py-20 px-4 border-t border-zinc-100 dark:border-zinc-800/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Stop writing cold emails from scratch
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
              Most cold emails get deleted in 2 seconds. ColdDraft generates
              emails built on what actually works — short, specific, human.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {[
                {
                  title: "No generic templates",
                  desc: "Every email is generated fresh from your specific product and audience. No fill-in-the-blank nonsense.",
                },
                {
                  title: "Proven structure",
                  desc: "Built on cold email principles from experts who've sent millions of outreach emails.",
                },
                {
                  title: "Ready to send",
                  desc: "Copy any variant with one click and paste it straight into your outreach tool or inbox.",
                },
                {
                  title: "Three angles",
                  desc: "Test casual vs professional vs direct to find what resonates with your specific audience.",
                },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <div className="border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30">
          <Pricing />
        </div>

        {/* CTA */}
        <section className="py-20 px-4 border-t border-zinc-100 dark:border-zinc-800/50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Your next cold email is 10 seconds away
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              No sign-up required. Start generating right now.
            </p>
            <a
              href="#top"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
              Start writing emails
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </AuthProvider>
  );
}
