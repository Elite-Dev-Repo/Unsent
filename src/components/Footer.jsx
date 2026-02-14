import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-foreground/10 text-center text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
      <p>&copy; {new Date().getFullYear()} Elite DEV // All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
