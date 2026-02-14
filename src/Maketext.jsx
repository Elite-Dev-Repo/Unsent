import { useState } from "react";
import {
  Ban,
  TrendingUp,
  PauseCircle,
  LogOut,
  Scale,
  Flame,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Toaster, toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Maketext() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeModeId, setActiveModeId] = useState(null);
  const [copied, setCopied] = useState(false);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleGenerate = async (mode) => {
    if (!input.trim()) {
      toast.error("Please enter a message context.");
      return;
    }
    setActiveModeId(mode.id);
    setOutput("Generating...");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `
You are an elite communication strategist who writes emotionally intelligent, concise, high-impact text messages response.

Your task:
Generate a response for the user's message context based on the selected mode.

USER CONTEXT:
"${input}"

SELECTED MODE:
${mode.label}

MODE BEHAVIOR RULES:
${mode.description}

STRICT REQUIREMENTS:
- Keep it under 80 words.
- Be direct and clear.
- No fluff.
- No emojis.
- No hashtags.
- Output ONLY the final message text.
- Output ONLY the copy paste ready message text.
- Make it sound human, not robotic.
- Ensure emotional intelligence no matter the mode.
- Protect the sender’s boundaries.
- Avoid unnecessary aggression unless the mode requires it.

If the message involves conflict, maintain control and composure.
If it involves declining, remove guilt.
If it involves negotiation, protect value.
If it involves stepping back, sound calm and decisive.

SUPER IMPORTANT RULES:
- do not be bossy or rude, remember your responses are for the user to send and it will affect lives if you do not critically think about the response, also the user is not always right, so be careful and do it at you own discretion.

Now generate the final message.
`;

      const result = await model.generateContent(prompt);
      setOutput(result.response.text());
    } catch (error) {
      toast.error("Error generating Message response:");
      console.error("Error generating Message response:", error);
    }
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
      icon: Ban,
      activeClass: "bg-black text-white shadow-lg",
      description: `
  - Enforce firm boundaries.
  - Be direct and decisive.
  - Do not apologize.
  - Do not over-explain.
  - Do not leave the door open.
  - Remove guilt from the tone.
  - Keep it short and controlled.
  `,
    },
    {
      id: "boss",
      label: "Executive Pivot",
      icon: TrendingUp,
      activeClass: "bg-black text-white shadow-lg",
      description: `
  - Sound strategic and composed.
  - Reframe the issue toward priorities or long-term goals.
  - Avoid emotional language.
  - Redirect the conversation with authority.
  - Focus on alignment, impact, or efficiency.
  - Keep it professional and confident.
  `,
    },
    {
      id: "safe",
      label: "Cooling Period",
      icon: PauseCircle,
      activeClass: "bg-black text-white shadow-lg",
      description: `
  - De-escalate tension.
  - Slow the conversation down.
  - Avoid reacting emotionally.
  - Suggest revisiting later.
  - Sound calm, steady, and self-controlled.
  - Do not attack or accuse.
  `,
    },
    {
      id: "ghost",
      label: "Silent Fade",
      icon: LogOut,
      activeClass: "bg-black text-white shadow-lg",
      description: `
  - Exit gracefully.
  - Avoid drama or confrontation.
  - Do not over-explain.
  - Sound neutral and disengaged.
  - Close the loop calmly.
  `,
    },
    {
      id: "negotiate",
      label: "Value Lock",
      icon: Scale,
      activeClass: "bg-black text-white shadow-lg",
      description: `
  - Push back confidently.
  - Protect time, scope, or pricing.
  - Clarify expectations.
  - Offer structured options if needed.
  - Do not undersell.
  - Sound firm but reasonable.
  `,
    },
    {
      id: "fire",
      label: "Bridge Burner",
      icon: Flame,
      activeClass: "bg-black text-white shadow-lg",
      description: `
  - Final and decisive.
  - No emotional tone.
  - No reopening discussion.
  - Clear termination of engagement.
  - Professional but firm.
  `,
    },
  ];

  return (
    <div className="cont">
      <Nav />
      <Toaster position="top-center" richColors />
      <div
        className=" mb-10 max-w-4xl mx-auto border border-foreground rounded-xl relative overflow-hidden mt-10"
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
                Response Draft
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
      <Footer />
    </div>
  );
}

export default Maketext;
