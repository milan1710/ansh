import { FiCheckCircle, FiArrowRight, FiFeather } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './ProductShowcase.css';

const points = [
  '17 आयुर्वेदिक जड़ी-बूटियों का पारंपरिक मिश्रण',
  'पुरुषों और महिलाओं के लिए अलग-अलग उत्पाद',
  '2 महीने का पूरा कोर्स — रोज़ सुबह 1 टैबलेट',
  'खाने के बाद सादे पानी के साथ लें',
  'पैसे वापस की गारंटी के साथ',
];

export default function ProductShowcase() {
  return (
    <section className="showcase section" id="product-showcase">
      <div className="container showcase__grid">
        <div className="showcase__media" data-reveal="left">
          <figure className="showcase__main">
            <img
              src={assets.premiumBottles}
              alt="अन्श आयुर्वेद के प्रीमियम आयुर्वेदिक वेलनेस उत्पाद"
              loading="lazy"
            />
          </figure>
          <figure className="showcase__side">
            <img
              src={assets.campaign}
              alt="प्राकृतिक आयुर्वेदिक स्वास्थ्य अभियान की झलक"
              loading="lazy"
            />
          </figure>
          <span className="showcase__badge" aria-hidden="true">
            <FiFeather />
            <strong>17</strong>
            <em>जड़ी-बूटियाँ</em>
          </span>
        </div>

        <div className="showcase__copy" data-reveal="right">
          <p className="eyebrow">उत्पाद की झलक</p>
          <h2 className="showcase__title">एक नज़र में अन्श आयुर्वेद</h2>
          <p className="showcase__lead">
            सरल कोर्स, स्पष्ट तरीका और पूरी पारदर्शिता — ताकि आप बिना किसी उलझन के सही फ़ैसला ले
            सकें।
          </p>

          <ul className="showcase__points">
            {points.map((point, index) => (
              <li key={point} data-reveal data-reveal-delay={index * 60}>
                <FiCheckCircle aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="showcase__note">
            सामग्री की पूरी सूची, मात्रा और उपयोग के निर्देश उत्पाद की पैकिंग पर उपलब्ध होते हैं।
          </p>

          <div className="showcase__actions">
            <a href="#order" className="btn btn--primary btn--lg">
              अभी ऑर्डर करें
              <FiArrowRight />
            </a>
            <a href="#faq" className="btn btn--outline btn--lg">
              सामान्य प्रश्न देखें
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
