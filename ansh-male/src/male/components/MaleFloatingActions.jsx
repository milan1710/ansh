import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig.js';
import { trackEvent } from '../../lib/pixel.js';
import '../../components/FloatingActions/FloatingActions.css';

// हर पेज पर नीचे दाईं ओर हमेशा दिखने वाले संपर्क बटन — पूरी तरह हिंदी में।
export default function MaleFloatingActions() {
  const { contact } = siteConfig;
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`;
  const waMessage = encodeURIComponent(
    'नमस्ते अन्श आयुर्वेद, मुझे पुरुषों के कोर्स की जानकारी चाहिए।'
  );
  const waHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${waMessage}`;

  const trackLead = (method) => {
    trackEvent('Contact', { method });
    trackEvent('Lead', { method });
  };

  return (
    <div className="floating-actions" aria-label="तुरंत संपर्क के विकल्प">
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        className="floating-actions__btn floating-actions__btn--wa"
        aria-label="WhatsApp पर बात करें"
        onClick={() => trackLead('whatsapp')}
      >
        <FaWhatsapp aria-hidden="true" />
        <span className="floating-actions__tip">WhatsApp</span>
      </a>

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
        <span>अभी ऑर्डर करें</span>
      </a>
    </div>
  );
}
