import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <section className="py-24 px-8 bg-background border-t border-foreground">
      <div className="max-w-4xl mx-auto" id="faqs">
        <div className="mb-16">
          <h2 className="text-4xl font-semibold tracking-tighter uppercase italic">
            Frequently Asked Questions
          </h2>
        </div>

        {/* --- Main Stacked Container --- */}
        <div className="relative bg-background rounded-none overflow-hidden">
          {/* Grain Overlay */}

          <Accordion type="single" collapsible className="w-full relative z-10">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b border-foreground/10 last:border-b-0 px-6"
              >
                <AccordionTrigger className="font-mono font-semibold text-lg tracking-tight hover:no-underline py-6 transition-all uppercase">
                  <div className="flex items-center justify-start">
                    <span className="text-zinc-500 mr-2">{"0" + (i + 1)}.</span>{" "}
                    {faq.q}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-mono text-[14px] leading-relaxed text-zinc-500 pb-6 uppercase">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
