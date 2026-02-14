import React, { useState } from "react";
import { supabase } from "@/lib/supabase"; // Path to your supabase client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { House } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Added

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("User created successfully. Please check your email.");
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Login successful!");
      navigate("/maketext");
    }
    setLoading(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <Toaster position="top-center" richColors />

      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-foreground/10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md p-8 sm:p-10 bg-background border border-foreground rounded-none overflow-hidden z-10"
        style={{
          boxShadow:
            "10px 15px 0px 0px rgba(0,0,0,.8), 20px 30px 0px 0px rgba(0,0,0,.05)",
        }}
      >
        {/* Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 space-y-6">
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-between items-start"
          >
            <div
              onClick={() => navigate("/")}
              className="group cursor-pointer active:scale-95 transition-all text-foreground/40 hover:text-foreground flex items-center gap-2"
            >
              <House size={18} />
              <span className="font-mono text-[10px] uppercase hidden group-hover:inline animate-in fade-in slide-in-from-left-2">
                Home
              </span>
            </div>

            <div className="text-right">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter uppercase italic underline decoration-foreground/20 decoration-4">
                Access_System.
              </h2>
              <p className="font-mono text-[9px] text-zinc-500 mt-1 uppercase tracking-widest">
                ID_Verification_Required
              </p>
            </div>
          </motion.div>

          <form className="space-y-4">
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="font-mono text-[10px] uppercase font-bold text-zinc-400 ml-1">
                Email_Address
              </label>
              <Input
                type="email"
                placeholder="USER@DOMAIN.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-none border-foreground/30 focus:border-foreground bg-foreground/5 font-mono text-xs uppercase h-11"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="font-mono text-[10px] uppercase font-bold text-zinc-400 ml-1">
                Secure_Password
              </label>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-none border-foreground/30 focus:border-foreground bg-foreground/5 font-mono text-xs h-11"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              <Button
                onClick={handleLogin}
                disabled={loading}
                className="rounded-none border border-foreground bg-foreground text-background hover:text-foreground hover:bg-zinc-200 transition-colors font-mono text-[10px] uppercase font-bold h-12"
              >
                {loading ? "AUTHENTICATING..." : "LOGIN"}
              </Button>
              <Button
                onClick={handleSignUp}
                disabled={loading}
                variant="outline"
                className="rounded-none border border-foreground/20 bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all font-mono text-[10px] uppercase font-bold h-12"
              >
                SIGN_UP
              </Button>
            </motion.div>
          </form>

          <motion.div
            variants={itemVariants}
            className="pt-4 border-t border-foreground/5"
          >
            <p className="font-mono text-[8px] text-center text-zinc-400 uppercase tracking-[0.2em]">
              Encrypted Session // Port 443 Active
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Background visual detail */}
      <div className="absolute bottom-10 left-10 font-mono text-[10px] text-foreground/5 rotate-90 origin-left uppercase tracking-[0.5em] pointer-events-none select-none">
        Unauthorized access is logged
      </div>
    </div>
  );
};

export default Auth;
