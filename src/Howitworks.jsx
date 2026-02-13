import React from "react";
import { MessageSquare, Zap, ShieldCheck } from "lucide-react";

// --- HOW IT WORKS: STACKED GRAIN CARDS ---
const HowItWorks = () => {
  const steps = [
    { title: "INPUT", desc: "PASTE RAW TEXT.", icon: MessageSquare },
    { title: "FILTER", desc: "SELECT MODE.", icon: Zap },
    { title: "OUTPUT", desc: "COPY RESPONSE.", icon: ShieldCheck },
  ];

  return (
    <section
      className="cont py-24 px-8 bg-background border-t border-foreground/10"
      id="how-it-works"
    >
      <div className="mb-16">
        <h2 className="text-4xl font-semibold tracking-tighter uppercase italic">
          How It Works
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="relative group p-8 bg-background border border-foreground rounded-none
                         hover:translate-x-[-4px] hover:translate-y-[-4px] 
                         transition-all duration-300 ease-out overflow-hidden max-sm:w-[330px]"
              style={{
                boxShadow:
                  "10px 15px 0px 0px rgba(0,0,0,.8), 20px 30px 0px 0px rgba(0,0,0,.5)",
              }}
            >
              {/* --- Grain/Noise Overlay --- */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04] contrast-150 brightness-100 z-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* --- Card Content --- */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-2 w-2 bg-foreground animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">
                    Step_0{i + 1}
                  </span>
                </div>
                <div className="mb-6 h-10 w-10 border border-foreground flex items-center justify-center bg-foreground/5">
                  <Icon size={20} />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-bold tracking-tighter uppercase mb-4">
                    {s.title}
                  </h2>
                </div>

                <p className="text-zinc-500 text-[10px] font-bold uppercase leading-tight tracking-tight">
                  {s.desc}
                </p>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute bottom-0 right-0 p-1 opacity-20">
                <div className="border-r border-b border-foreground h-2 w-2" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
