import { useState } from "react";
import { motion } from "framer-motion";
import "./PillNav.css";

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

export default function PillNav({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "easeOut",
  baseColor = "#fff",
  pillColor = "#060010",
  hoveredPillTextColor = "#060010",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = false
}: PillNavProps) {
  const resolvedPillText = pillTextColor || baseColor;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`pillnav-root ${className}`}>
      <nav className="pillnav-items">
        {items.map((it) => {
          const isActive = activeHref === it.href;

          return (
            <motion.a
              key={it.href}
              href={`#${it.href}`}
              className={`pillnav-pill ${isActive ? "active" : ""}`}
              onClick={(e) => handleClick(e, it.href)}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="pill-label">{it.label}</span>
            </motion.a>
          );
        })}
      </nav>

      <button
        className={`pillnav-mobile-btn ${mobileOpen ? "open" : ""}`}
        onClick={() => {
          setMobileOpen(!mobileOpen);
          onMobileMenuClick?.();
        }}
      />
    </header>
  );
}
