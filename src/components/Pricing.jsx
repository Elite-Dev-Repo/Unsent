import { Check, MessageSquare, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Added

const Pricing = () => {
  const tiers = [
    { name: "FREE", price: "0", features: ["5 DRAFTS/DAY", "NO MODE"] },
    {
      name: "PRO",
      price: "12",
      features: ["UNLIMITED", "BOSS MODE", "SAFE LOCK"],
      active: true,
    },
    { name: "TEAM", price: "49", features: ["API ACCESS", "CUSTOM VOICE"] },
  ];

  // Stagger variants for the container
  const containerVariants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Card entrance variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="cont py-24 px-8 bg-background" id="pricing">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-16"
      >
        <h2 className="text-4xl font-semibold tracking-tighter uppercase italic">
          Pricing
        </h2>
        <p className="text-foreground mt-4 text-[10px] font-bold uppercase leading-tight tracking-tight">
          Simple, transparent pricing. No hidden fees.{" "}
          <span className="text-foreground/50 ml-4">- coming soon</span>
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="whileInView"
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12"
      >
        {tiers.map((t) => (
          <motion.div
            key={t.name}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }} // Hover lift
            className={`p-8 bg-background border border-foreground rounded-sm flex flex-col justify-between min-h-[400px]
                        ${t.active ? "bg-foreground text-background" : ""}
                        transition-colors duration-300 relative group`}
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <span
                  className={`font-mono text-[10px] border px-2 py-1 uppercase ${t.active ? "border-background" : "border-foreground"}`}
                >
                  {t.name}
                </span>
                {t.active && (
                  <div className="h-2 w-2 bg-background animate-pulse" />
                )}
              </div>
              <div className="mb-10">
                <span className="text-6xl font-bold tracking-tighter">
                  ${t.price}
                </span>
                <span
                  className={`font-mono text-[10px] ml-2 ${t.active ? "text-background/60" : "text-zinc-500"}`}
                >
                  /MO
                </span>
              </div>
              <div className="space-y-3 mb-12">
                {t.features.map((f) => (
                  <div
                    key={f}
                    className={`flex items-center gap-3 font-mono text-[10px] uppercase ${t.active ? "text-background/70" : "text-zinc-400"}`}
                  >
                    <Check
                      size={12}
                      className={`${t.active ? "text-background" : "text-foreground"}`}
                    />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <Button
              className={`w-full rounded-none border font-mono text-xs h-12 uppercase transition-all
                ${
                  t.active
                    ? "bg-background text-foreground hover:bg-zinc-200 border-background"
                    : "bg-background text-foreground border-foreground hover:bg-foreground hover:text-background"
                }`}
            >
              SELECT_{t.name}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Pricing;
