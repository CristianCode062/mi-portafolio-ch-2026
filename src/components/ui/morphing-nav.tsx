"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
};

interface MorphingNavProps {
  items: NavItem[];
  className?: string;
}

export function MorphingNav({ items, className }: MorphingNavProps) {
  return (
    <nav
      className={cn(
        "relative flex items-center gap-1 rounded-full bg-black/60 p-1 backdrop-blur-md border border-white/10 shadow-lg",
        className
      )}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="relative px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white"
        >
          <motion.span
            layoutId="morphing-nav"
            className="absolute inset-0 rounded-full bg-white/10"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
          />
          <span className="relative z-10">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
