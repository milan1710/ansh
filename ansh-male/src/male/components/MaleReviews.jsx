import { FaStar, FaCheckCircle, FaQuoteLeft } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import reviews from '../../data/reviews.js';
import '../../components/Reviews/Reviews.css';

// सिर्फ़ पुरुष ग्राहकों की समीक्षाएँ दिखाई जाती हैं।
const menReviews = reviews.filter((review) => review.category === 'men');

const AVATAR_TONES = ['a', 'b', 'c', 'd', 'e'];
const toneFor = (id) => AVATAR_TONES[(id - 1) % AVATAR_TONES.length];

const average =
  menReviews.length > 0
    ? menReviews.reduce((sum, review) => sum + review.rating, 0) / menReviews.length
    : 0;

function Stars({ value }) {
  return (
    <span className="reviews__stars" aria-label={`${value} स्टार रेटिंग`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar key={i} style={{ opacity: i <= value ? 1 : 0.25 }} />
      ))}
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

export default function MaleReviews() {
  return (
    <section className="reviews section" id="reviews">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">ग्राहक समीक्षाएँ</p>
          <h2 className="section-title">पुरुषों के असली अनुभव</h2>
          <p className="section-subtitle">
            Ansh Ayurveda For Men पर भरोसा करने वाले पुरुषों की सच्ची कहानियाँ — ये अनुभव आपके लिए
            हैं।
          </p>
        </div>

        <div className="reviews__bar">
          <span className="reviews__bar-dot" aria-hidden="true" />
          <strong className="reviews__bar-label">लाइव रिव्यू</strong>
          {menReviews.length > 0 && (
            <span className="reviews__bar-rating">
              <FaStar aria-hidden="true" />
              <strong>{average.toFixed(1)}</strong>
              औसत रेटिंग
            </span>
          )}
          <span className="reviews__bar-count">
            <FiUsers aria-hidden="true" />
            {menReviews.length} पुरुषों के अनुभव
          </span>
        </div>

        <div className="reviews__grid">
          {menReviews.map((review, index) => (
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
