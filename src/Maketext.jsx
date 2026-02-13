import { useState } from "react";
import {
  ShieldAlert,
  Briefcase,
  XCircle,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Nav from "./components/Nav";
import { Toaster, toast } from "sonner";

function Maketext() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeModeId, setActiveModeId] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (mode) => {
    setActiveModeId(mode.id);
    setOutput(mode.draft);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const MODES = [
    {
      id: "no",
      label: "Hard Decline",
      icon: XCircle,
      activeClass: "bg-black text-white shadow-lg",
      description: "Firm boundaries, zero explanation.",
      draft:
        "I’ve reviewed the request. Given my current project load and internal commitments, I’m unable to take this on. I won't be able to provide further cycles on this for the foreseeable future. Best of luck with the initiative.",
    },
    {
      id: "boss",
      label: "Executive Pivot",
      icon: Briefcase,
      activeClass: "bg-black text-white shadow-lg",
      description: "High-level strategic redirection.",
      draft:
        "This doesn’t currently align with our core KPIs or the primary stakeholder roadmap. We need to pause and pivot the current strategy to ensure we aren't burning resources on low-impact tasks. Let's sync once you've re-aligned with the broader vision.",
    },
    {
      id: "safe",
      label: "Cooling Period",
      icon: ShieldAlert,
      activeClass: "bg-black text-white shadow-lg",
      description: "Prevent emotional or late-night sends.",
      draft:
        "SYSTEM NOTICE: This draft has been placed in an encrypted holding state. To maintain professional equilibrium, the 'Send' protocol is restricted until the next business cycle (08:00 AM). Review this with fresh eyes before finalizing.",
    },
  ];

  return (
    <div className="cont">
      <Nav />
      <Toaster position="top-center" richColors />
      <div
        className="max-w-4xl mx-auto border border-foreground rounded-xl relative overflow-hidden mt-10"
        style={{
          boxShadow: " 2px 3px 0px 0px rgba(0,0,0,.1)",
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
              Input Message Context
            </h3>
            <Textarea
              placeholder="Type the vibe of your message here..."
              className="bg-foreground/5 px-4 border-none text-xl focus-visible:ring-0 placeholder:text-foreground/40 min-h-[150px] resize-none rounded-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <h3 className="text-sm mt-4 font-medium uppercase tracking-widest text-foreground font-mono">
              Choose Message Mode
            </h3>
            <div className="grid grid-cols-2 gap-3 mt-6">
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
                      (toast.success("Message Copied!"),
                      (<Check size={16} className="text-green-500" />))
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
    </div>
  );
}

export default Maketext;
