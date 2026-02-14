import React from "react";
import { MessageSquare, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion"; // Added

// --- HOW IT WORKS: STACKED GRAIN CARDS ---
const HowItWorks = () => {
  const steps = [
    { title: "INPUT", desc: "PASTE RAW TEXT.", icon: MessageSquare },
    { title: "FILTER", desc: "SELECT MODE.", icon: Zap },
    { title: "OUTPUT", desc: "COPY RESPONSE.", icon: ShieldCheck },
  ];

  // Container variants to stagger the children
  const containerVariants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Individual card entrance variants
  const itemVariants = {
    initial: { opacity: 0, x: -50 },
    whileInView: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      className="cont py-24 px-8 bg-background border-t border-foreground/10"
      id="how-it-works"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl font-semibold tracking-tighter uppercase italic">
          How It Works
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="whileInView"
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12"
      >
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(0,0,0,0.02)",
                transition: { duration: 0.2 },
              }}
              className="step relative group p-8 bg-background border border-foreground rounded-none
                         transition-all duration-300 ease-out overflow-hidden max-sm:w-full"
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

                <motion.div
                  initial={{ rotate: -10, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="mb-6 h-10 w-10 border border-foreground flex items-center justify-center bg-foreground/5"
                >
                  <Icon size={20} />
                </motion.div>

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
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
