import { useEffect, useRef, useState } from 'react';

// जब कोई एलिमेंट स्क्रीन पर दिखाई देता है तो true लौटाता है।
// इसी के आधार पर काउंटर चलते हैं ताकि एनिमेशन सिर्फ़ तभी हो जब यह दिखे।
// किसी भी गड़बड़ की स्थिति में false नहीं अटकता — कंटेंट दिखता रहता है।
export default function useInView({ threshold = 0.3, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    let observer;

    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold, rootMargin }
      );

      observer.observe(node);
    } catch (error) {
      // पुराने ब्राउज़र में rootMargin/observer समर्थित न हो तो
      // एनिमेशन छोड़कर सीधे अंतिम मान दिखाएँ।
      setInView(true);
      return undefined;
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin]);

  return [ref, inView];
}
