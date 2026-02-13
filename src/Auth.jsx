import React, { useState } from "react";
import { supabase } from "@/lib/supabase"; // Path to your supabase client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) toast.error(error.message);
    else toast.success("user created successfully");

    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Login successful!");
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className=" cont flex flex-col items-center justify-center py-20 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] absolute">
      <Toaster position="top-center" />
      <div
        className="relative w-full max-w-md p-10 bg-background border border-foreground rounded-none overflow-hidden"
        style={{
          boxShadow:
            "10px 15px 0px 0px rgba(0,0,0,.8), 20px 30px 0px 0px rgba(0,0,0,.5)",
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tighter uppercase italic underline decoration-foreground/20 decoration-4">
              Access_System.
            </h2>
            <p className="font-mono text-[10px] text-zinc-500 mt-2 uppercase">
              Identity verification required // v2.0
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase font-bold text-zinc-400 ml-1">
                Email_Address
              </label>
              <Input
                type="email"
                placeholder="USER@DOMAIN.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-none border-foreground/30 focus:border-foreground bg-foreground/5 font-mono text-xs uppercase"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase font-bold text-zinc-400 ml-1">
                Secure_Password
              </label>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-none border-foreground/30 focus:border-foreground bg-foreground/5 font-mono text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                onClick={handleLogin}
                disabled={loading}
                className="rounded-none border border-foreground bg-foreground text-background hover:bg-zinc-200 transition-colors font-mono text-[10px] uppercase font-bold h-12"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
