import {
  FiHeart,
  FiClock,
  FiShield,
  FiCalendar,
  FiActivity,
  FiAward,
  FiArrowRight,
} from 'react-icons/fi';
import products from '../../data/products.js';
import assets from '../../data/assets.js';
import Countdown from '../Countdown/Countdown.jsx';
import './ComboPack.css';

const menBenefits = [
  {
    icon: <FiHeart aria-hidden="true" />,
    title: 'शुक्राणु की संख्या',
    text: 'सुक्राणु की संख्या बढ़ाता है।',
  },
  {
    icon: <FiClock aria-hidden="true" />,
    title: 'सेक्स टाइमिंग',
    text: 'सेक्स टाइमिंग इम्प्रूव करता है।',
  },
  {
    icon: <FiShield aria-hidden="true" />,
    title: 'कोई और चेंज नहीं',
    text: 'शरीर में कोई और चेंज नहीं करता है।',
  },
];

const womenBenefits = [
  {
    icon: <FiCalendar aria-hidden="true" />,
    title: 'पीरियड्स समय पर',
    text: 'पीरियड्स को सही समय पर लाता है।',
  },
  {
    icon: <FiActivity aria-hidden="true" />,
    title: 'PCOD / PCOS',
    text: 'PCOD / PCOS को ठीक करता है।',
  },
  {
    icon: <FiShield aria-hidden="true" />,
    title: 'कोई और चेंज नहीं',
    text: 'शरीर में कोई और चेंज नहीं करता है।',
  },
];

function BenefitColumn({ accent, heading, items }) {
  return (
    <div className={`combo-pack__benefit combo-pack__benefit--${accent}`}>
      <h3>{heading}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            {item.icon}
            <span>
              <strong>{item.title}</strong>
              <em>{item.text}</em>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ComboPack() {
  const product = products.combo;
  const { price, mrp, packSize, name, shortDescription } = product;
  const hasMrp = Number.isFinite(mrp) && mrp > price;
  const offPercent = hasMrp ? Math.round(((mrp - price) / mrp) * 100) : null;
  const savings = hasMrp ? mrp - price : null;

  return (
    <section className="combo-pack" id="combo">
      <div className="container">
        <div className="combo-pack__card">
          <div className="combo-pack__media" data-reveal="left">
            <img
              src={assets.pair}
              alt="Ansh Ayurveda पुरुष और महिला के सप्लीमेंट्स का कॉम्बो पैक"
              loading="lazy"
            />
            {offPercent ? (
              <span className="combo-pack__ribbon">
                <strong>{offPercent}%</strong>
                <em>OFF</em>
              </span>
            ) : null}
          </div>

          <div className="combo-pack__content" data-reveal="right">
            <p className="eyebrow combo-pack__eyebrow">लिमिटेड टाइम कॉम्बो ऑफ़र</p>
            <h2 className="combo-pack__title">
              {name} — पुरुष और महिला दोनों के लिए एक साथ
            </h2>
            <p className="combo-pack__text">{shortDescription}</p>

            <div className="combo-pack__price">
              {hasMrp ? (
                <div className="combo-pack__mrp">
                  <span className="combo-pack__mrp-label">एमआरपी</span>
                  <span className="combo-pack__mrp-old">
                    ₹{mrp.toLocaleString('en-IN')}
                  </span>
                  {offPercent ? (
                    <span className="combo-pack__off">{offPercent}% छूट</span>
                  ) : null}
                </div>
              ) : null}

              <div className="combo-pack__offer">
                <span className="combo-pack__offer-label">ऑफर कीमत</span>
                <strong className="combo-pack__offer-value">
                  ₹{price.toLocaleString('en-IN')}
                </strong>
              </div>

              {packSize ? (
                <p className="combo-pack__pack">{packSize}</p>
              ) : null}
            </div>

            <Countdown label="आज का ऑफ़र समाप्त होने में" />

            <div className="combo-pack__benefits">
              <BenefitColumn accent="men" heading="पुरुषों के लिए फायदे" items={menBenefits} />
              <BenefitColumn accent="women" heading="महिलाओं के लिए फायदे" items={womenBenefits} />
            </div>

            <div className="combo-pack__guarantee">
              <FiAward aria-hidden="true" />
              <span>
                <strong>रिज़ल्ट की गारंटी</strong>
                <em>पैसे वापस की गारंटी के साथ मिलती है अन्श आयुर्वेद टैबलेट</em>
              </span>
            </div>

            <div className="combo-pack__actions">
              <a href="#order" className="btn btn--gold btn--lg">
                कॉम्बो पैक ऑर्डर करें
                <FiArrowRight />
              </a>
              <span className="combo-pack__note">
                {savings
                  ? `आज ऑर्डर करने पर ₹${savings.toLocaleString('en-IN')} की बचत`
                  : 'सीमित समय के लिए ऑफ़र'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
