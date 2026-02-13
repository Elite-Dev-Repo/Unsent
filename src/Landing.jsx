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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

import HowItWorks from "./Howitworks";
import Pricing from "./Pricing";
import FAQ from "./Faq";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// --- Configuration Arrays ---
const NAV_LINKS = [
  { name: "How it works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQs", href: "#faqs" },
];

const MODES = [
  {
    id: "no",
    label: 'The "No" Button',
    icon: XCircle,
    activeClass: "bg-red-500/10 border-red-500/50 text-red-500",
    draft:
      "I appreciate the invite! I'm currently focusing on some personal priorities and won't be able to make it. Let's touch base later in the month.",
  },
  {
    id: "boss",
    label: "Boss Mode",
    icon: Briefcase,
    activeClass: "bg-indigo-500/10 border-indigo-500/50 text-indigo-500",
    draft:
      "I've reviewed the proposal. To ensure we meet our KPIs, I suggest we pivot the current strategy to align with the primary stakeholders' expectations.",
  },
  {
    id: "safe",
    label: "Safe Lock",
    icon: ShieldAlert,
    activeClass: "bg-amber-500/10 border-amber-500/50 text-amber-500",
    draft:
      "🔒 [DRAFT LOCKED]: You're currently in 'Safe Mode'. This draft is saved, but sending is disabled until 8:00 AM tomorrow.",
  },
];

const Landing = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeModeId, setActiveModeId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-indigo-500/30">
      {/* --- Nav Bar --- */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-foreground/30 bg-background sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center">
            <Zap size={22} fill="#fff" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground uppercase italic">
            Unsent.
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-foreground transition-colors uppercase text-xs font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-zinc-500 uppercase">
                {session.user.email}
              </span>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="rounded-none border-foreground/20 font-mono text-[10px] h-8"
              >
                LOGOUT
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button className="bg-foreground text-background hover:bg-zinc-200 hover:text-foreground transition-all font-bold uppercase tracking-widest text-[10px] rounded-none px-6">
                Sign Up
              </Button>
            </Link>
          )}
        </div>

        {/* --- Mobile Menu Sheet --- */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-foreground/10"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] border-l border-foreground bg-background p-0 rounded-none"
            >
              {/* Grain Texture Overlay in Drawer */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative z-10 h-full flex flex-col">
                <SheetHeader className="p-8 border-b border-foreground/10 text-left">
                  <SheetTitle className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold">
                    System_Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 flex flex-col items-start px-8 py-12 gap-8">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-lg font-bold uppercase  tracking-tighter hover:translate-x-2 transition-transform duration-200"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                <div className="p-8 border-t border-foreground/10 bg-foreground/[0.02]">
                  {session ? (
                    <div className="flex flex-col gap-4">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase break-all">
                        SESSION_USER: {session.user.email}
                      </span>
                      <Button
                        onClick={handleLogout}
                        className="w-full rounded-none border border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-all font-mono text-[10px] uppercase font-bold py-6"
                      >
                        Terminate Session
                      </Button>
                    </div>
                  ) : (
                    <Link to="/auth" className="w-full">
                      <Button className="w-full bg-foreground text-background hover:bg-zinc-200 hover:text-foreground transition-all font-bold uppercase tracking-widest text-xs rounded-none py-6">
                        Access System
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="flex flex-col items-center justify-center gap-6 ">
          <div className="flex items-center gap-3 px-3 py-1 border border-foreground/20 bg-foreground/[0.03] rounded-full">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold px-2">
              Just a dev tryna make it.
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-zinc-900 bg-clip-text text-transparent text-center">
            Stop Overthinking. <br /> Start Sending.
          </h1>

          <p className="text-foreground text-md md:text-lg max-w-2xl mx-auto text-center leading-relaxed">
            The premium interface for high-stakes communication. Craft the
            perfect message, set boundaries, and save your battery for things
            that matter.
          </p>

          <button className="px-8 py-3 bg-foreground text-background hover:bg-zinc-200 hover:text-foreground mb-16 transition-all font-bold uppercase tracking-widest text-xs rounded-none border border-foreground">
            Get Started
          </button>
        </div>

        {/* --- Main App Widget --- */}
        <div
          className="max-w-4xl mx-auto border border-foreground rounded-xl relative overflow-hidden"
          style={{
            boxShadow:
              "10px 15px 0px 0px rgba(0,0,0,.2), 20px 30px 0px 0px rgba(0,0,0,.1)",
          }}
        >
          {/* Grain Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="bg-background relative z-10 rounded-[calc(0.75rem-1px)] overflow-hidden grid md:grid-cols-2">
            {/* Input Side */}
            <div className="p-8 border-r border-foreground/10 text-left">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-4 font-mono">
                Input Context
              </h3>
              <Textarea
                placeholder="Type the vibe of your message here..."
                className="bg-foreground/5 px-4 border-none text-xl focus-visible:ring-0 placeholder:text-foreground/40 min-h-[150px] resize-none rounded-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <div className="grid grid-cols-1 gap-3 mt-6">
                {MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = activeModeId === mode.id;
                  return (
                    <Button
                      key={mode.id}
                      onClick={() => handleGenerate(mode)}
                      className={`justify-start gap-3 h-12 rounded-none text-foreground transition-all uppercase font-mono text-[10px] tracking-widest
                        ${isActive ? mode.activeClass : "bg-foreground/5 border border-foreground/10 hover:bg-foreground/10"}`}
                    >
                      <Icon size={18} /> {mode.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 bg-background/40 text-left relative flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-4 flex justify-between items-center font-mono">
                  Drafted Text
                  {output && (
                    <button
                      onClick={copyToClipboard}
                      className="hover:bg-foreground/10 p-2 rounded-none transition-colors border border-foreground/10"
                    >
                      {copied ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  )}
                </h3>
                {output ? (
                  <p className="text-lg leading-relaxed text-foreground animate-in fade-in duration-700">
                    {output}
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-foreground italic border border-dashed border-foreground/20 rounded-none bg-foreground/[0.02]">
                    <span className="font-mono text-[10px] uppercase opacity-50">
                      System Idle: Select Mode
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-foreground/10 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase">
                <span>AI Powered Generation</span>
                <span className="flex items-center gap-1">
                  <ArrowRight size={10} /> Ready to send
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <HowItWorks />
      <Pricing />
      <FAQ />

      <footer className="py-12 border-t border-foreground/10 text-center text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://oyenekanemmanuel.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Elite DEV
          </a>{" "}
          // All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Landing;
