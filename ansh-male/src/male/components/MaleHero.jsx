import { FaStar } from 'react-icons/fa';
import { FiArrowRight, FiAward, FiFeather, FiShield, FiTruck, FiUserCheck } from 'react-icons/fi';
import assets from '../../data/assets.js';
import reviews from '../../data/reviews.js';
import '../../components/Hero/Hero.css';

// सिर्फ़ पुरुषों की समीक्षाओं से रेटिंग बनाई जाती है।
const menReviews = reviews.filter((review) => review.category === 'men');
const average =
  menReviews.length > 0
    ? menReviews.reduce((sum, review) => sum + review.rating, 0) / menReviews.length
    : 0;

// पूरे 5 स्टार दिखाने वाला छोटा हेल्पर (सभी समीक्षाएँ 5 स्टार हैं)।
function Stars() {
  return (
    <span className="hero__stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar key={i} />
      ))}
    </span>
  );
}

export default function MaleHero() {
  return (
    <section className="hero" id="home">
      <span className="hero__blob hero__blob--green" aria-hidden="true" />
      <span className="hero__blob hero__blob--gold" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">सिर्फ़ पुरुषों के लिए — 100% आयुर्वेदिक</p>
          <h1 className="hero__title">
            शुक्राणु की कमी, शीघ्रपतन और कमजोरी
            <span className="shine-text">Ansh Ayurveda के साथ दूर करें</span>
          </h1>

          {menReviews.length > 0 && (
            <div className="hero__rating">
              <Stars />
              <strong>{average.toFixed(1)} / 5</strong>
              <span className="hero__rating-note">
                {menReviews.length} सत्यापित पुरुष समीक्षाओं के आधार पर · 22 वर्ष का अनुभव
              </span>
            </div>
          )}

          <p className="hero__lead">
            17 आयुर्वेदिक जड़ी-बूटियों का शुद्ध मिश्रण — शुक्राणु की संख्या बढ़ाने, शीघ्रपतन व सेक्स
            टाइमिंग सुधारने और शरीर की कमजोरी दूर करने में सहायक। 1 बोतल = 1 महीने का पूरा कोर्स,
            सिर्फ़ ₹1499 में।
          </p>

          <div className="hero__actions">
            <a href="#order" className="btn btn--primary btn--lg">
              अभी ऑर्डर करें — सिर्फ़ ₹1499
              <FiArrowRight />
            </a>
            <a href="#problems" className="btn btn--outline btn--lg">
              अपनी समस्या देखें
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
              डिस्क्रीट डिलीवरी
            </li>
          </ul>

          <a href="#order" className="hero__order-link">
            कोर्स शुरू करें
            <FiArrowRight />
          </a>
        </div>

        <div className="hero__art">
          <div className="hero__frame">
            <img
              src={assets.malePoster}
              alt="पुरुषों की सम्पूर्ण ताकत — Ansh Ayurveda For Men"
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
              <strong>1 महीने का कोर्स</strong>
              <em>सिर्फ़ ₹1499</em>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
