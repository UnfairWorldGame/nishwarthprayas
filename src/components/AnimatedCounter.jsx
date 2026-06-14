import { useEffect, useState } from "react";

function AnimatedCounter({ value, duration = 1800, active }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : String(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || !target) return undefined;

    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  if (!match) return value;
  return (
    <>
      {active ? count : 0}
      {suffix}
    </>
  );
}

export default AnimatedCounter;
