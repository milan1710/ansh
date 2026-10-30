import { FaPhoneAlt } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig.js';
import { trackEvent } from '../../lib/pixel.js';
import './FloatingActions.css';

// हर पेज पर नीचे दाईं ओर हमेशा दिखने वाले बटन — कॉल और ऑर्डर।
// इनसे ग्राहक एक ही टैप में जुड़ सकता है।
export default function FloatingActions() {
  const { contact } = siteConfig;
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`;

  // कॉल क्लिक भी Lead के रूप में गिना जाए।
  const trackLead = (method) => {
    trackEvent('Contact', { method });
    trackEvent('Lead', { method });
  };

  return (
    <div className="floating-actions" aria-label="तुरंत संपर्क के विकल्प">
      <a
        href={telHref}
        className="floating-actions__btn floating-actions__btn--call"
        aria-label="फ़ोन पर बात करें"
        onClick={() => trackLead('phone')}
      >
        <FaPhoneAlt aria-hidden="true" />
        <span className="floating-actions__tip">कॉल करें</span>
      </a>

      <a href="#order" className="floating-actions__cta" aria-label="अभी ऑर्डर करें">
        <FiShoppingBag aria-hidden="true" />
        <span>Order Now</span>
      </a>
    </div>
  );
}
