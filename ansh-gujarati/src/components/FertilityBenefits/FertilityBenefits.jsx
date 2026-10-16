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
          <p className="eyebrow">મહિલાઓ માટે ખાસ ફાયદા</p>
          <h2 className="section-title">આયુર્વેદથી કુદરતી રીતે ગર્ભધારણ કરો</h2>
          <p className="section-subtitle">
            {women.name} — 17 જડીબુટ્ટીઓથી તૈયાર, મહિલાઓના પ્રજનન સ્વાસ્થ્ય પર પૂરું ધ્યાન.
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
            દરેક મહિલાની સ્થિતિ અલગ હોય છે — યોગ્ય કોર્સ અને સલાહ માટે અન્શ આયુર્વેદની ટીમ સાથે જોડાઓ.
          </p>
          <div className="fertility__actions">
            <a href="#order" className="btn btn--pink btn--lg">
              હમણાં ઓર્ડર કરો
              <FiArrowRight />
            </a>
            <a href="#women" className="btn btn--outline btn--lg">
              મહિલાઓનું ઉત્પાદન જુઓ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
