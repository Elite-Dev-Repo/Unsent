import { Check, MessageSquare, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <section className="cont py-24 px-8 bg-background" id="pricing">
      <div className="mb-16">
        <h2 className="text-4xl font-semibold tracking-tighter uppercase italic">
          Pricing
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`p-8 bg-background border border-foreground rounded-sm flex flex-col justify-between min-h-[400px]
                         ${t.active ? "bg-foreground text-background" : ""}
                         transition-all duration-300`}
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-[10px] border border-foreground px-2 py-1 uppercase">
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
                  className={`font-mono text-[10px] ml-2 text-zinc-500 ${t.active ? "text-background" : "text-zinc-500"}`}
                >
                  /MO
                </span>
              </div>
              <div className="space-y-3 mb-12">
                {t.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 font-mono text-[10px] text-zinc-400 uppercase"
                  >
                    <Check
                      size={12}
                      className={`text-foreground ${t.active ? "text-white" : "text-zinc-500"}`}
                    />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full rounded-none border border-foreground bg-background text-foreground hover:bg-foreground hover:text-background font-mono text-xs h-12 uppercase transition-colors">
              SELECT_{t.name}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
