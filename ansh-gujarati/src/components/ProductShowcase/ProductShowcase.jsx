import { FiCheckCircle, FiArrowRight, FiFeather } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './ProductShowcase.css';

const points = [
  '17 આયુર્વેદિક જડીબુટ્ટીઓનું પરંપરાગત મિશ્રણ',
  'પુરુષો અને મહિલાઓ માટે અલગ-અલગ ઉત્પાદન',
  '2 મહિનાનો પૂરો કોર્સ — દરરોજ સવારે 1 ટેબ્લેટ',
  'જમ્યા પછી સાદા પાણી સાથે લેવું',
  'પૈસા પાછા મળવાની ગેરંટી સાથે',
];

export default function ProductShowcase() {
  return (
    <section className="showcase section" id="product-showcase">
      <div className="container showcase__grid">
        <div className="showcase__media" data-reveal="left">
          <figure className="showcase__main">
            <img
              src={assets.premiumBottles}
              alt="અન્શ આયુર્વેદના પ્રીમિયમ આયુર્વેદિક વેલનેસ ઉત્પાદનો"
              loading="lazy"
            />
          </figure>
          <figure className="showcase__side">
            <img
              src={assets.campaign}
              alt="કુદરતી આયુર્વેદિક આરોગ્ય અભિયાનની ઝલક"
              loading="lazy"
            />
          </figure>
          <span className="showcase__badge" aria-hidden="true">
            <FiFeather />
            <strong>17</strong>
            <em>જડીબુટ્ટીઓ</em>
          </span>
        </div>

        <div className="showcase__copy" data-reveal="right">
          <p className="eyebrow">ઉત્પાદનની ઝલક</p>
          <h2 className="showcase__title">એક નજરમાં અન્શ આયુર્વેદ</h2>
          <p className="showcase__lead">
            સરળ કોર્સ, સ્પષ્ટ રીત અને પૂરી પારદર્શકતા — જેથી તમે કોઈ ગૂંચવણ વગર યોગ્ય નિર્ણય લઈ
            શકો.
          </p>

          <ul className="showcase__points">
            {points.map((point, index) => (
              <li key={point} data-reveal data-reveal-delay={index * 60}>
                <FiCheckCircle aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="showcase__note">
            સામગ્રીની પૂરી યાદી, માત્રા અને ઉપયોગની સૂચનાઓ ઉત્પાદનની પેકિંગ પર ઉપલબ્ધ છે.
          </p>

          <div className="showcase__actions">
            <a href="#order" className="btn btn--primary btn--lg">
              હમણાં ઓર્ડર કરો
              <FiArrowRight />
            </a>
            <a href="#faq" className="btn btn--outline btn--lg">
              સામાન્ય પ્રશ્નો જુઓ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
