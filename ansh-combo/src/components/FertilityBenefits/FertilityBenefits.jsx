import {
  FiArrowRight,
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiFeather,
  FiHeart,
  FiRefreshCw,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUmbrella,
  FiUnlock,
} from 'react-icons/fi';
import products from '../../data/products.js';
import './FertilityBenefits.css';

const women = products.women;

// मुख्य फायदों के आइकन (products.women.highlights के क्रम में)।
const highlightIcons = [<FiStar />, <FiCalendar />, <FiHeart />, <FiUnlock />, <FiTarget />];

// विस्तृत फायदों के आइकन (products.women.benefits के क्रम में)।
const benefitIcons = [
  <FiFeather />,
  <FiShield />,
  <FiHeart />,
  <FiCalendar />,
  <FiTrendingUp />,
  <FiCheckCircle />,
  <FiUmbrella />,
  <FiActivity />,
  <FiRefreshCw />,
];

export default function FertilityBenefits() {
  const highlights = women.highlights ?? [];
  const benefits = women.benefits ?? [];

  return (
    <section className="fertility section" id="fertility-benefits">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">महिलाओं के लिए खास फायदे</p>
          <h2 className="section-title">आयुर्वेद से प्राकृतिक रूप से गर्भधारण करें</h2>
          <p className="section-subtitle">
            {women.name} — 17 जड़ी-बूटियों से तैयार, महिलाओं की प्रजनन सेहत पर पूरा ध्यान।
          </p>
        </div>

        {highlights.length > 0 && (
          <ul className="fertility__highlights">
            {highlights.map((item, index) => (
              <li
                key={item}
                className="fertility__highlight"
                data-reveal="zoom"
                data-reveal-delay={index * 70}
              >
                <span className="fertility__highlight-icon" aria-hidden="true">
                  {highlightIcons[index] ?? <FiCheckCircle />}
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {benefits.length > 0 && (
          <ul className="fertility__grid">
            {benefits.map((item, index) => (
              <li className="fertility__card" key={item}>
                <span className="fertility__icon" aria-hidden="true">
                  {benefitIcons[index] ?? <FiCheckCircle />}
                </span>
                <span className="fertility__text">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="fertility__cta">
          <p>
            हर महिला की स्थिति अलग होती है — सही कोर्स और सलाह के लिए अन्श आयुर्वेद की टीम से जुड़ें।
          </p>
          <div className="fertility__actions">
            <a href="#order" className="btn btn--pink btn--lg">
              अभी ऑर्डर करें
              <FiArrowRight />
            </a>
            <a href="#women" className="btn btn--outline btn--lg">
              महिलाओं का उत्पाद देखें
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
