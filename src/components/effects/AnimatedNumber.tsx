import { useEffect, useState } from "react";

export default function AnimatedNumber({ value }: { value: string }) {
  const [num, setNum] = useState(0);
  const target = parseInt(value.replace(/\D/g, "")) || 0;

  useEffect(() => {
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setNum(target);
        clearInterval(interval);
      } else {
        setNum(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [target]);

  return <span>{value.replace(/\d+/, num.toString())}</span>;
}
