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
    <span className="reviews__stars" aria-label={`${value} સ્ટાર રેટિંગ`}>
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
          <span className="reviews__verified" title="સત્યાપિત ગ્રાહક">
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
          <span>સમસ્યા</span>
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
            સત્યાપિત ખરીદી
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
            <p className="eyebrow">ગ્રાહક સમીક્ષાઓ</p>
            <h2 className="section-title">અમારા ગ્રાહકોનો અનુભવ</h2>
          </div>
          <div className="reviews__empty">
            <p>
              તમારો અનુભવ અમારા માટે મહત્વનો છે. સાચી ગ્રાહક સમીક્ષાઓ ઉપલબ્ધ થતાં અહીં
              દેખાશે.
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
          <p className="eyebrow">ગ્રાહક સમીક્ષાઓ</p>
          <h2 className="section-title">અમારા ગ્રાહકોનો અનુભવ</h2>
          <p className="section-subtitle">
            અન્શ આયુર્વેદ પર વિશ્વાસ કરતા દંપતીઓની સાચી વાતો — આ અનુભવો તમારા માટે છે.
          </p>
        </div>

        <div className="reviews__bar">
          <span className="reviews__bar-dot" aria-hidden="true" />
          <strong className="reviews__bar-label">લાઇવ રિવ્યૂ</strong>
          {summary && (
            <span className="reviews__bar-rating">
              <FaStar aria-hidden="true" />
              <strong>{summary.average.toFixed(1)}</strong>
              સરેરાશ રેટિંગ
            </span>
          )}
          <span className="reviews__bar-count">
            <FiUsers aria-hidden="true" />
            {reviews.length} ગ્રાહકોના અનુભવ
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
