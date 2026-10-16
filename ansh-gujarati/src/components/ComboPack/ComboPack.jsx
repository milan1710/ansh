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
    title: 'શુક્રાણુની સંખ્યા',
    text: 'શુક્રાણુની સંખ્યા વધારે છે.',
  },
  {
    icon: <FiClock aria-hidden="true" />,
    title: 'સેક્સ ટાઈમિંગ',
    text: 'સેક્સ ટાઈમિંગ સુધારે છે.',
  },
  {
    icon: <FiShield aria-hidden="true" />,
    title: 'બીજો કોઈ ફેરફાર નહીં',
    text: 'શરીરમાં બીજો કોઈ ફેરફાર કરતું નથી.',
  },
];

const womenBenefits = [
  {
    icon: <FiCalendar aria-hidden="true" />,
    title: 'પીરિયડ્સ સમયસર',
    text: 'પીરિયડ્સ સાચા સમયે લાવે છે.',
  },
  {
    icon: <FiActivity aria-hidden="true" />,
    title: 'PCOD / PCOS',
    text: 'PCOD / PCOS સુધારે છે.',
  },
  {
    icon: <FiShield aria-hidden="true" />,
    title: 'બીજો કોઈ ફેરફાર નહીં',
    text: 'શરીરમાં બીજો કોઈ ફેરફાર કરતું નથી.',
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
              alt="Ansh Ayurveda પુરુષ અને મહિલા સપ્લિમેન્ટ્સનું કોમ્બો પેક"
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
            <p className="eyebrow combo-pack__eyebrow">લિમિટેડ ટાઇમ કોમ્બો ઓફર</p>
            <h2 className="combo-pack__title">
              {name} — પુરુષ અને મહિલા બંને માટે એકસાથે
            </h2>
            <p className="combo-pack__text">{shortDescription}</p>

            <div className="combo-pack__price">
              {hasMrp ? (
                <div className="combo-pack__mrp">
                  <span className="combo-pack__mrp-label">MRP</span>
                  <span className="combo-pack__mrp-old">
                    ₹{mrp.toLocaleString('en-IN')}
                  </span>
                  {offPercent ? (
                    <span className="combo-pack__off">{offPercent}% છૂટ</span>
                  ) : null}
                </div>
              ) : null}

              <div className="combo-pack__offer">
                <span className="combo-pack__offer-label">ઓફર કિંમત</span>
                <strong className="combo-pack__offer-value">
                  ₹{price.toLocaleString('en-IN')}
                </strong>
              </div>

              {packSize ? (
                <p className="combo-pack__pack">{packSize}</p>
              ) : null}
            </div>

            <Countdown label="આજનો ઓફર પૂરો થવામાં" />

            <div className="combo-pack__benefits">
              <BenefitColumn accent="men" heading="પુરુષો માટે ફાયદા" items={menBenefits} />
              <BenefitColumn accent="women" heading="મહિલાઓ માટે ફાયદા" items={womenBenefits} />
            </div>

            <div className="combo-pack__guarantee">
              <FiAward aria-hidden="true" />
              <span>
                <strong>રિઝલ્ટની ગેરંટી</strong>
                <em>પૈસા પાછા મળવાની ગેરંટી સાથે મળે છે અન્શ આયુર્વેદ ટેબ્લેટ</em>
              </span>
            </div>

            <div className="combo-pack__actions">
              <a href="#order" className="btn btn--gold btn--lg">
                કોમ્બો પેક ઓર્ડર કરો
                <FiArrowRight />
              </a>
              <span className="combo-pack__note">
                {savings
                  ? `આજે ઓર્ડર કરવાથી ₹${savings.toLocaleString('en-IN')} ની બચત`
                  : 'મર્યાદિત સમય માટે ઓફર'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
