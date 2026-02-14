import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Briefcase,
  XCircle,
  Copy,
  Check,
  ArrowRight,
  Zap,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "./lib/supabase";

import HowItWorks from "./components/Howitworks";
import Pricing from "./components/Pricing";
import FAQ from "./components/Faq";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const MODES = [
  {
    id: "no",
    label: "Hard Decline",
    icon: XCircle,
    activeClass: "bg-foreground text-background shadow-lg",
    description: "Firm boundaries, zero explanation.",
    draft:
      "I’ve reviewed the request. Given my current project load and internal commitments, I’m unable to take this on. I won't be able to provide further cycles on this for the foreseeable future. Best of luck with the initiative.",
  },
  {
    id: "boss",
    label: "Executive Pivot",
    icon: Briefcase,
    activeClass: "bg-foreground text-background shadow-lg",
    description: "High-level strategic redirection.",
    draft:
      "This doesn’t currently align with our core KPIs or the primary stakeholder roadmap. We need to pause and pivot the current strategy to ensure we aren't burning resources on low-impact tasks. Let's sync once you've re-aligned with the broader vision.",
  },
  {
    id: "safe",
    label: "Cooling Period",
    icon: ShieldAlert,
    activeClass: "bg-foreground text-background shadow-lg",
    description: "Prevent emotional or late-night sends.",
    draft:
      "SYSTEM NOTICE: This draft has been placed in an encrypted holding state. To maintain professional equilibrium, the 'Send' protocol is restricted until the next business cycle (08:00 AM). Review this with fresh eyes before finalizing.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Landing = () => {
  const [output, setOutput] = useState(
    "I've received your proposal and appreciate the detail included. To ensure this aligns with our current roadmap and high-priority deliverables, I’ll need to run a quick internal review with the stakeholders.",
  );
  const [activeModeId, setActiveModeId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      setSession(currentSession);
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGenerate = (mode) => {
    setActiveModeId(mode.id);
    setOutput(mode.draft);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      <Nav />

      <main className="max-w-6xl mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 px-3 py-1 border border-foreground/20 bg-foreground/[0.03] rounded-full"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold px-2">
              Just a dev tryna make it.
            </span>
          </motion.div>

          {/* RESTORED: Gradient Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent text-center"
          >
            Stop Overthinking. <br /> Start Sending.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-foreground/70 text-md md:text-lg max-w-2xl mx-auto text-center leading-relaxed"
          >
            The premium interface for high-stakes communication. Craft the
            perfect message, set boundaries, and save your battery for things
            that matter.
          </motion.p>

          {/* RESTORED: Two-tone Button Logic */}
          <motion.div variants={fadeInUp}>
            <Link to={session ? "/maketext" : "/auth"}>
              <button className="cursor-pointer group h-12 flex items-center justify-between bg-foreground text-background mb-16 transition-all font-bold uppercase tracking-widest text-xs rounded-none border border-foreground">
                <span className="pl-5 pr-5">Get Started</span>
                <span className="bg-background text-foreground h-full w-10 flex items-center justify-center hidden group-hover:flex animate-in fade-in slide-in-from-left-10 duration-300">
                  <ArrowRight size={16} />
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* --- Main App Widget --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto bg-foreground/5 rounded-[48px] p-4 relative overflow-hidden border border-foreground/5"
          style={{ boxShadow: "0 2px 15px 0px rgba(0,0,0,0.1)" }}
        >
          {/* Grain Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 bg-background rounded-[40px] shadow-sm flex flex-col min-h-[500px] border border-foreground/10">
            {/* Header Area */}
            <div className="p-6 flex items-center justify-between ">
              <div className="flex items-center gap-2 bg-foreground/[0.02] border border-foreground/5 rounded-full px-4 py-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                <span className="text-[11px] font-bold font-mono tracking-tighter uppercase mr-2 border-r pr-2 border-foreground/10">
                  Generated Text
                </span>
                <button className="p-1 hover:bg-foreground/5 rounded-md text-foreground/40">
                  <Zap size={14} />
                </button>
                <span className="h-4 w-[1px] bg-foreground/10 mx-1" />
                <button className="text-xs font-bold px-2 italic max-sm:hidden text-foreground/40">
                  B
                </button>
                <button className="text-xs font-serif px-2 italic max-sm:hidden text-foreground/40">
                  i
                </button>
                <button className="p-1 hover:bg-foreground/5 rounded-md text-foreground/40">
                  <Menu size={14} />
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="h-10 w-10 bg-foreground text-background rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  {copied ? <Check size={18} /> : <Copy size={17} />}
                </button>
                <div className="max-sm:hidden h-10 w-10 bg-background border border-foreground/10 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-foreground/5 transition-colors">
                  <ArrowRight size={18} className="rotate-[-45deg]" />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 px-10 max-sm:px-4 pb-32 text-left">
              <div className="bg-foreground/[0.03] rounded-xl p-6 max-sm:p-4 h-[250px] mt-8 border border-foreground/5 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={output}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-sm:text-sm text-lg leading-relaxed text-foreground font-light"
                  >
                    {output}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Controls Area */}
            <div className="absolute bottom-10 left-10 right-10 max-sm:left-4 max-sm:right-4 flex items-center justify-between">
              <div className="flex items-center gap-1 bg-background border border-foreground/5 rounded-full p-1 shadow-xl">
                {MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = activeModeId === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => handleGenerate(mode)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
                        ${isActive ? "bg-foreground text-background shadow-lg" : "bg-transparent text-foreground/40 hover:text-foreground hover:bg-foreground/5"}`}
                    >
                      <Icon size={14} />
                      <span className={isActive ? "block" : "hidden"}>
                        {mode.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <button className="max-sm:hidden px-6 py-3 bg-foreground/[0.02] border border-foreground/5 text-foreground/40 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-foreground/5 transition-all">
                  AI Summary
                </button>

                <div className="flex items-center gap-1 bg-background border border-foreground/5 rounded-full p-1 shadow-xl">
                  <button className="px-6 py-2 bg-foreground text-background rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Save
                  </button>
                  <div className="h-8 w-8 bg-foreground text-background rounded-full flex items-center justify-center">
                    <ArrowRight size={14} className="rotate-90" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <HowItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Landing;
