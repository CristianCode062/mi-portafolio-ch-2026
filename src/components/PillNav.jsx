import React, { useState } from 'react';
import { motion } from 'framer-motion';
// satisfy some ESLint configs that flag `motion` as unused when referenced only in JSX
const _MotionRef = motion;
import './PillNav.css';

/**
 * PillNav
 * Props implemented to match user's spec table.
 */
export default function PillNav({
  logo = undefined,
  logoAlt = 'Logo',
  items = [],
  activeHref = undefined,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor = undefined, // default to baseColor below
  onMobileMenuClick = undefined,
  initialLoadAnimation = false
}) {
  const resolvedPillText = pillTextColor || baseColor;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (e, href) => {
    e && e.preventDefault && e.preventDefault();
    if (onMobileMenuClick) {
      // if mobile menu handler provided, prefer it when href is falsy
      if (!href) return onMobileMenuClick();
    }
    if (href && typeof href === 'string') {
      const id = href.replace(/^#/, '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cssVars = {
    '--pillnav-base': baseColor,
    '--pillnav-pill': pillColor,
    '--pillnav-pill-text': resolvedPillText,
    '--pillnav-pill-text-hover': hoveredPillTextColor,
    '--ease': ease
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: initialLoadAnimation ? 0.12 : 0 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <header className={`pillnav-root ${className}`} style={cssVars}>
      <div className="pillnav-inner">
        <motion.div className="pillnav-left" initial={initialLoadAnimation ? 'hidden' : false} animate={initialLoadAnimation ? 'show' : false} variants={containerVariants}>
          <motion.div className="pillnav-logo" aria-label={logoAlt} variants={itemVariants} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
            {logo ? <img src={logo} alt={logoAlt} /> : <div className="pillnav-logo-fallback">CH</div>}
          </motion.div>
        </motion.div>

        <nav className="pillnav-items" role="navigation" aria-label="Main navigation">
          <motion.div className="pillnav-items-inner" initial={initialLoadAnimation ? 'hidden' : false} animate={initialLoadAnimation ? 'show' : false} variants={containerVariants}>
            {items.map((it) => {
              const hrefVal = it.href && String(it.href);
              const resolvedHref = hrefVal && hrefVal.startsWith('#') ? hrefVal : (hrefVal ? `#${hrefVal}` : '#');
              const isActive = activeHref === it.href;

              return (
                <motion.a
                  key={(it.href || it.label) + it.label}
                  href={resolvedHref}
                  aria-label={it.ariaLabel || it.label}
                  aria-current={isActive ? 'page' : undefined}
                  className={`pillnav-pill ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleClick(e, it.href)}
                  variants={itemVariants}
                  style={{ transitionTimingFunction: ease }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.span layoutId="pill-active" className="pill-active-indicator" aria-hidden />
                  )}
                  <span className="pill-label">{it.label}</span>
                </motion.a>
              );
            })}
          </motion.div>
        </nav>

        {/* Mobile menu button (visible on small screens via CSS) */}
        <button
          className={`pillnav-mobile-btn ${mobileOpen ? 'open' : ''}`}
          onClick={() => { setMobileOpen(!mobileOpen); onMobileMenuClick && onMobileMenuClick(); }}
          aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={mobileOpen}
        >
          <span className="pillnav-mobile-bar" />
          <span className="pillnav-mobile-bar" />
          <span className="pillnav-mobile-bar" />
        </button>
      </div>
    </header>
  );
}
