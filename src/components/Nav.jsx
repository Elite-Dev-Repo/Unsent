import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { Zap, Menu, Moon, Sun } from "lucide-react"; // Added Moon/Sun
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"; // Added
import { motion, AnimatePresence } from "framer-motion"; // Added
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Sub-component for the mechanical toggle
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9 border border-foreground/10" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-9 w-9 rounded-none border border-foreground/20 hover:bg-foreground/5 transition-colors overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Moon size={16} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Sun size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

function Nav() {
  const NAV_LINKS = [
    { name: "How it works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQs", href: "/#faqs" },
  ];

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-foreground/30 bg-background sticky top-0 z-50">
      <Link to={"/"}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center">
            <Zap size={22} className="text-background" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground uppercase italic">
            Unsent.
          </span>
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-foreground transition-colors uppercase text-xs font-medium"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Desktop Auth & Theme */}
      <div className="hidden md:flex items-center gap-4">
        <ThemeToggle />
        <div className="h-4 w-[1px] bg-foreground/10 mx-2" /> {/* Divider */}
        {session ? (
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-zinc-500 uppercase">
              {session.user.email}
            </span>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="rounded-none border-foreground/20 font-mono text-[10px] h-8 hover:bg-foreground hover:text-background"
            >
              LOGOUT
            </Button>
          </div>
        ) : (
          <Link to="/auth">
            <Button className="bg-foreground text-background hover:bg-zinc-200 hover:text-foreground transition-all font-bold uppercase tracking-widest text-[10px] rounded-none px-6 h-9">
              Sign Up
            </Button>
          </Link>
        )}
      </div>

      {/* --- Mobile Menu Sheet --- */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-foreground/10"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] border-l border-foreground bg-background p-0 rounded-none"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 h-full flex flex-col">
              <SheetHeader className="p-8 border-b border-foreground/10 text-left">
                <SheetTitle className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold">
                  System_Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 flex flex-col items-start px-8 py-12 gap-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-bold uppercase tracking-tighter hover:translate-x-2 transition-transform duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="p-8 border-t border-foreground/10 bg-foreground/[0.02]">
                {session ? (
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase break-all">
                      SESSION_USER: {session.user.email}
                    </span>
                    <Button
                      onClick={handleLogout}
                      className="w-full rounded-none border border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-all font-mono text-[10px] uppercase font-bold py-6"
                    >
                      Terminate Session
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" className="w-full">
                    <Button className="w-full bg-foreground text-background hover:bg-zinc-200 hover:text-foreground transition-all font-bold uppercase tracking-widest text-xs rounded-none py-6">
                      Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Nav;
