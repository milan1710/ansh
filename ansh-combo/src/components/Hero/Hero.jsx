import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FiArrowRight, FiAward, FiFeather, FiShield, FiTruck, FiUserCheck } from 'react-icons/fi';
import assets from '../../data/assets.js';
import siteConfig from '../../data/siteConfig.js';
import { getRatingSummary } from '../../lib/rating.js';
import './Hero.css';

const summary = getRatingSummary();

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
    <span className="hero__stars" aria-hidden="true">
      {stars}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <span className="hero__blob hero__blob--green" aria-hidden="true" />
      <span className="hero__blob hero__blob--gold" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">संतान सुख की आस</p>
          <h1 className="hero__title">
            माता-पिता बनने का सपना पूरा करें
            <span className="shine-text">Ansh Ayurveda के साथ</span>
          </h1>

          {summary && (
            <div className="hero__rating">
              <Stars value={summary.average} />
              <strong>{summary.average.toFixed(1)} / 5</strong>
              <span className="hero__rating-note">
                {summary.count} सत्यापित समीक्षाओं के आधार पर · {siteConfig.doctor.experience} का
                अनुभव
              </span>
            </div>
          )}

          <p className="hero__lead">
            शादी के बहुत साल बाद भी गुड न्यूज़ नहीं मिली? Ansh Ayurveda के पुरुषों और महिलाओं के लिए
            तैयार उत्पादों की जानकारी प्राप्त करें और अपनी जरूरत के अनुसार सही विकल्प चुनें।
          </p>

          <div className="hero__actions">
            <a href="#men" className="btn btn--primary btn--lg">
              पुरुषों का उत्पाद देखें
              <FiArrowRight />
            </a>
            <a href="#women" className="btn btn--outline btn--lg">
              महिलाओं का उत्पाद देखें
            </a>
          </div>

          <ul className="hero__trust">
            <li>
              <FiShield aria-hidden="true" />
              100% आयुर्वेदिक
            </li>
            <li>
              <FiAward aria-hidden="true" />
              मनी बैक गारंटी
            </li>
            <li>
              <FiTruck aria-hidden="true" />
              सुरक्षित डिलीवरी
            </li>
          </ul>

          <a href="#order" className="hero__order-link">
            अभी ऑर्डर करें
            <FiArrowRight />
          </a>
        </div>

        <div className="hero__art">
          <div className="hero__frame">
            <img
              src={assets.familyPng}
              alt="Ansh Ayurveda के साथ माता-पिता बनने का सपना पूरा करते भारतीय परिवार"
            />
          </div>

          <div className="hero__float hero__float--herbs">
            <span className="hero__float-icon" aria-hidden="true">
              <FiFeather />
            </span>
            <span className="hero__float-text">
              <strong>17 जड़ी-बूटियाँ</strong>
              <em>प्राकृतिक मिश्रण</em>
            </span>
          </div>

          <div className="hero__float hero__float--exp">
            <span className="hero__float-icon" aria-hidden="true">
              <FiUserCheck />
            </span>
            <span className="hero__float-text">
              <strong>{siteConfig.doctor.experience} अनुभव</strong>
              <em>आयुर्वेद विशेषज्ञ</em>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
