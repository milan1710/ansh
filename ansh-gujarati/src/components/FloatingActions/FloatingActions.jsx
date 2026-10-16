import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig.js';
import { trackEvent } from '../../lib/pixel.js';
import './FloatingActions.css';

// हर पेज पर नीचे दाईं ओर हमेशा दिखने वाले संपर्क बटन —
// WhatsApp, कॉल और ऑर्डर। इनसे ग्राहक एक ही टैप में जुड़ सकता है।
export default function FloatingActions() {
  const { contact } = siteConfig;
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`;
  const waMessage = encodeURIComponent(
    'નમસ્તે અન્શ આયુર્વેદ, મને ઉત્પાદન અને કોર્સની માહિતી જોઈએ છે.'
  );
  const waHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${waMessage}`;

  // WhatsApp / कॉल क्लिक भी Lead के रूप में गिना जाए।
  const trackLead = (method) => {
    trackEvent('Contact', { method });
    trackEvent('Lead', { method });
  };

  return (
    <div className="floating-actions" aria-label="તરત સંપર્ક માટેના વિકલ્પ">
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        className="floating-actions__btn floating-actions__btn--wa"
        aria-label="WhatsApp પર વાત કરો"
        onClick={() => trackLead('whatsapp')}
      >
        <FaWhatsapp aria-hidden="true" />
        <span className="floating-actions__tip">WhatsApp</span>
      </a>

      <a
        href={telHref}
        className="floating-actions__btn floating-actions__btn--call"
        aria-label="ફોન પર વાત કરો"
        onClick={() => trackLead('phone')}
      >
        <FaPhoneAlt aria-hidden="true" />
        <span className="floating-actions__tip">કૉલ કરો</span>
      </a>

      <a href="#order" className="floating-actions__cta" aria-label="હમણાં ઓર્ડર કરો">
        <FiShoppingBag aria-hidden="true" />
        <span>ઓર્ડર કરો</span>
      </a>
    </div>
  );
}
