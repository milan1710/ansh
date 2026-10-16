import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FiCheckCircle, FiShield, FiUsers } from 'react-icons/fi';
import { getRatingSummary } from '../../lib/rating.js';
import './RatingSection.css';

function Stars({ value }) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    if (value >= i) {
      stars.push(<FaStar key={i} />);
    } else if (value >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return (
    <span className="rating-section__stars" aria-hidden="true">
      {stars}
    </span>
  );
}

const facts = [
  { icon: <FiCheckCircle aria-hidden="true" />, label: 'સત્યાપિત ખરીદી' },
  { icon: <FiUsers aria-hidden="true" />, label: '3000+ સંતુષ્ટ પરિવાર' },
  { icon: <FiShield aria-hidden="true" />, label: '100% મની બેક ગેરંટી' },
];

export default function RatingSection() {
  // रेटिंग सीधे वास्तविक समीक्षाओं से बनती है — कोई नकली आँकड़ा नहीं।
  const summary = getRatingSummary();

  if (!summary) {
    return null;
  }

  return (
    <section className="rating-section" aria-label="ગ્રાહક રેટિંગ અને વિશ્વાસ">
      <div className="container">
        <div className="rating-section__card" data-reveal>
          <div className="rating-section__score">
            <Stars value={summary.average} />
            <div className="rating-section__meta">
              <strong>{summary.average.toFixed(1)} / 5</strong>
              <span>{summary.count} સત્યાપિત સમીક્ષાઓ</span>
            </div>
          </div>

          <span className="rating-section__divider" aria-hidden="true" />

          <ul className="rating-section__facts">
            {facts.map((fact) => (
              <li key={fact.label}>
                {fact.icon}
                {fact.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
