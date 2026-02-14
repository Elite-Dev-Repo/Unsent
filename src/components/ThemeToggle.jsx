import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch in v4 environments
  useEffect(() => setMounted(true), []);
  if (!mounted)
    return <div className="h-10 w-10 border border-foreground/10" />;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-10 w-10 rounded-none border-foreground bg-background hover:bg-foreground hover:text-background transition-colors overflow-hidden group"
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
            <Moon size={16} strokeWidth={2.5} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Sun size={16} strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brutalist Detail: Corner Notch */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-foreground opacity-20 group-hover:opacity-100" />
    </Button>
  );
};

export default ThemeToggle;
