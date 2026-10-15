import { useEffect } from 'react';

// पूरी वेबसाइट में जिन भी एलिमेंट पर `data-reveal` लगा है, वे स्क्रॉल करते समय
// नीचे से ऊपर की ओर उठते हुए धीरे-धीरे दिखाई देते हैं। इसे App में एक बार चलाया जाता है।
// `data-reveal-delay="150"` देकर देरी (मिलीसेकंड) भी दी जा सकती है।
//
// यह पूरी तरह fail-safe है:
//  • कंटेंट छिपाया सिर्फ़ तब जाता है जब JS ठीक से चल रहा हो (`.js-reveal` class)।
//  • threshold 0 रखा गया है, इसलिए छोटा-सा हिस्सा दिखते ही reveal हो जाता है —
//    लंबे या छोटे, किसी भी एलिमेंट के छूटने का सवाल नहीं।
//  • रेंडर के बाद जुड़ने वाले नए एलिमेंट (जैसे समस्या बदलने पर बनने वाला नया कार्ड)
//    भी MutationObserver की मदद से उसी तरह animate होते हैं।
//  • कोई भी error आने पर छिपाव हटा दिया जाता है और सारा कंटेंट दिख जाता है।
export default function useScrollReveal() {
  useEffect(() => {
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // कम-गति उपयोगकर्ता या पुराना ब्राउज़र: कुछ भी छिपाएँ ही नहीं — कंटेंट सीधे दिखे।
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    let observer;
    let mutationObserver;

    const revealNode = (node) => node.classList.add('is-revealed');

    // स्क्रीन पर दिख रहा है या नहीं (transform को ध्यान में रखते हुए)।
    const isOnScreen = (node) => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const allRevealNodes = () => Array.from(document.querySelectorAll('[data-reveal]'));

    const observeNode = (node) => {
      if (!node || node.classList.contains('is-revealed')) {
        return;
      }
      observer.observe(node);
    };

    // पहले से दिख रहे एलिमेंट को (देरी का ध्यान रखते हुए) दिखा देते हैं।
    const revealIfOnScreen = (node) => {
      if (!isOnScreen(node)) {
        return;
      }
      const delay = Number(node.dataset.revealDelay || 0);
      if (delay > 0) {
        window.setTimeout(() => revealNode(node), delay);
      } else {
        revealNode(node);
      }
      observer.unobserve(node);
    };

    try {
      // अब से कंटेंट छिपाया जाए (क्योंकि JS चल रहा है)।
      document.documentElement.classList.add('js-reveal');

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
            const node = entry.target;
            const delay = Number(node.dataset.revealDelay || 0);
            if (delay > 0) {
              window.setTimeout(() => revealNode(node), delay);
            } else {
              revealNode(node);
            }
            observer.unobserve(node);
          });
        },
        { threshold: 0, rootMargin: '0px 0px -40px 0px' }
      );

      allRevealNodes().forEach(observeNode);

      // कुछ ब्राउज़र पहला callback देर से भेजते हैं — इसलिए जो एलिमेंट
      // इस समय स्क्रीन पर हैं, उन्हें तुरंत दिखा देते हैं।
      window.requestAnimationFrame(() => {
        allRevealNodes().forEach(revealIfOnScreen);
      });

      // बाद में जुड़ने वाले नए एलिमेंट (React में key बदलने पर बनने वाले कार्ड आदि)
      // भी इसी एनिमेशन का हिस्सा बनें — इसलिए उन्हें भी निगरानी में लेते हैं।
      if (typeof MutationObserver !== 'undefined' && document.body) {
        mutationObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((added) => {
              if (!added || added.nodeType !== 1) {
                return;
              }
              const nodes = added.matches('[data-reveal]')
                ? [added]
                : Array.from(added.querySelectorAll('[data-reveal]'));

              nodes.forEach((node) => {
                observeNode(node);
                // पहले ब्राउज़र एलिमेंट को छिपी अवस्था में बना ले, तभी transition चलता है।
                void node.offsetWidth;
                revealIfOnScreen(node);
              });
            });
          });
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });
      }
    } catch (error) {
      // कुछ भी गड़बड़ हो तो कंटेंट छिपा न रहे।
      document.documentElement.classList.remove('js-reveal');
      allRevealNodes().forEach(revealNode);
      return undefined;
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, []);
}
