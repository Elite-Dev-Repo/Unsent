import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion"; // Added

const FAQS = [
  {
    id: "item-1",
    q: "IS MY DATA STORED?",
    a: "NO. WE PROCESS YOUR INPUT IN REAL-TIME. ONCE THE SESSION ENDS, THE DATA IS WIPED FROM OUR VOLATILE MEMORY.",
  },
  {
    id: "item-2",
    q: "HOW DOES SAFE LOCK WORK?",
    a: "IT DISABLES THE COPY BUTTON UNTIL 8:00 AM THE NEXT DAY. IT PREVENTS LATE-NIGHT MESSAGES YOU MIGHT REGRET.",
  },
  {
    id: "item-3",
    q: "CAN I CUSTOMIZE THE TONES?",
    a: "PRO USERS CAN DEFINE CUSTOM BRAND VOICES AND KEYWORDS TO ENSURE THE AI MATCHES THEIR EXACT VIBE.",
  },
];

const FAQ = () => {
  // Variants for the container to stagger the children
  const containerVariants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for each FAQ item
  const itemVariants = {
    initial: { opacity: 0, x: -10 },
    whileInView: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 px-8 bg-background border-t border-foreground">
      <div className="max-w-4xl mx-auto" id="faqs">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-semibold tracking-tighter uppercase italic">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* --- Main Stacked Container --- */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="relative bg-background rounded-none overflow-hidden border border-foreground/10"
        >
          {/* Grain Overlay Re-added for consistency */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <Accordion type="single" collapsible className="w-full relative z-10">
            {FAQS.map((faq, i) => (
              <motion.div key={faq.id} variants={itemVariants}>
                <AccordionItem
                  value={faq.id}
                  className="border-b border-foreground/10 last:border-b-0 px-6 hover:bg-foreground/[0.01] transition-colors"
                >
                  <AccordionTrigger className="font-mono font-semibold text-lg tracking-tight hover:no-underline py-6 transition-all uppercase group">
                    <div className="flex items-center justify-start group-hover:translate-x-1 transition-transform">
                      <span className="text-zinc-500 mr-2">
                        {"0" + (i + 1)}.
                      </span>{" "}
                      {faq.q}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="font-mono text-[14px] leading-relaxed text-zinc-500 pb-6 uppercase border-l-2 border-foreground/20 ml-2 pl-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
