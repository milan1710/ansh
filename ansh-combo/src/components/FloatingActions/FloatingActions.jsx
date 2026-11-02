import { FiShoppingBag } from 'react-icons/fi';
import './FloatingActions.css';

// हर पेज पर नीचे दाईं ओर हमेशा दिखने वाला एक ही बटन — Order Now।
// इससे ग्राहक एक ही टैप में ऑर्डर फ़ॉर्म तक पहुँच सकता है।
export default function FloatingActions() {
  return (
    <div className="floating-actions" aria-label="ऑर्डर के विकल्प">
      <a href="#order" className="floating-actions__cta" aria-label="अभी ऑर्डर करें">
        <FiShoppingBag aria-hidden="true" />
        <span>Order Now</span>
      </a>
    </div>
  );
}
