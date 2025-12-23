import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const SplitText = ({ text = '', delay = 100, duration = 0.6, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const chars = ref.current ? Array.from(ref.current.querySelectorAll('.rb-char')) : [];
    if (!chars.length) return;

    gsap.set(chars, { yPercent: 100, opacity: 0 });
    const tween = gsap.to(chars, {
      yPercent: 0,
      opacity: 1,
      duration,
      ease: 'back.out(1.7)',
      stagger: 0.03,
      delay: delay / 1000
    });

    return () => {
      tween.kill();
    };
  }, [text, delay, duration]);

  return (
    <span ref={ref} className={className} aria-label={text} role="heading">
      {String(text).split('').map((ch, i) => (
        <span key={i} className="rb-char inline-block" aria-hidden={ch === ' '}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
