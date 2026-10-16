import { useEffect, useState } from 'react';

// 0 से target तक का आँकड़ा धीरे-धीरे गिनता है।
// `start` true होने पर ही एनिमेशन शुरू होता है (आमतौर पर useInView से)।
// कम गति (reduced motion) वाले उपयोगकर्ताओं के लिए सीधे अंतिम मान दिखता है।
export default function useCountUp(target, start = false, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return undefined;
    }

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    let frame;
    const begin = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - begin) / duration);
      // easeOutCubic — शुरुआत तेज़, अंत धीमा।
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);

  return value;
}
