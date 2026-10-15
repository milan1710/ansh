import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCheckCircle,
  FaQuoteLeft,
} from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import reviews from '../../data/reviews.js';
import { getRatingSummary } from '../../lib/rating.js';
import './Reviews.css';

const summary = getRatingSummary();

const AVATAR_TONES = ['a', 'b', 'c', 'd', 'e'];

const toneFor = (id) => AVATAR_TONES[(id - 1) % AVATAR_TONES.length];

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
    <span className="reviews__stars" aria-label={`${value} स्टार रेटिंग`}>
      {stars}
    </span>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="reviews__card">
      <header className="reviews__head">
        <span
          className={`reviews__avatar reviews__avatar--${toneFor(review.id)}`}
          aria-hidden="true"
        >
          {review.name.charAt(0)}
        </span>

        <span className="reviews__who">
          <strong>{review.name}</strong>
          {review.englishName && <em>{review.englishName}</em>}
        </span>

        {review.verified && (
          <span className="reviews__verified" title="सत्यापित ग्राहक">
            <FaCheckCircle aria-hidden="true" />
          </span>
        )}
      </header>

      <div className="reviews__rate">
        <Stars value={review.rating} />
        <span className="reviews__score">{review.rating.toFixed(1)}</span>
      </div>

      {review.problem && (
        <p className="reviews__problem">
          <span>समस्या</span>
          {review.problem}
        </p>
      )}

      <p className="reviews__text">
        <FaQuoteLeft className="reviews__quote" aria-hidden="true" />
        {review.text}
      </p>

      <footer className="reviews__meta">
        {review.product && <span className="reviews__product">{review.product}</span>}
        {review.verified && (
          <span className="reviews__stamp">
            <FaCheckCircle aria-hidden="true" />
            सत्यापित खरीद
          </span>
        )}
      </footer>
    </article>
  );
}

export default function Reviews() {
  if (reviews.length === 0) {
    return (
      <section className="reviews section" id="reviews">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">ग्राहक समीक्षाएँ</p>
            <h2 className="section-title">हमारे ग्राहकों का अनुभव</h2>
          </div>
          <div className="reviews__empty">
            <p>
              आपका अनुभव हमारे लिए महत्वपूर्ण है। वास्तविक ग्राहक समीक्षाएँ यहाँ उपलब्ध होने पर
              दिखाई जाएँगी।
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reviews section" id="reviews">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">ग्राहक समीक्षाएँ</p>
          <h2 className="section-title">हमारे ग्राहकों का अनुभव</h2>
          <p className="section-subtitle">
            अन्श आयुर्वेद पर भरोसा करने वाले जोड़ों की सच्ची कहानियाँ — ये अनुभव आपके लिए हैं।
          </p>
        </div>

        <div className="reviews__bar">
          <span className="reviews__bar-dot" aria-hidden="true" />
          <strong className="reviews__bar-label">लाइव रिव्यू</strong>
          {summary && (
            <span className="reviews__bar-rating">
              <FaStar aria-hidden="true" />
              <strong>{summary.average.toFixed(1)}</strong>
              औसत रेटिंग
            </span>
          )}
          <span className="reviews__bar-count">
            <FiUsers aria-hidden="true" />
            {reviews.length} ग्राहकों के अनुभव
          </span>
        </div>

        <div className="reviews__grid">
          {reviews.map((review, index) => (
            <div
              className="reviews__cell"
              key={review.id}
              data-reveal
              data-reveal-delay={(index % 3) * 80}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
