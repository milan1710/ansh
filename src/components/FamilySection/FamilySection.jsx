import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { FiArrowRight, FiCalendar, FiCheckCircle, FiHeart } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './FamilySection.css';

// ग्राहक की असली कहानी — लंबे पैराग्राफ को छोटे-छोटे हिस्सों में बाँटा गया है
// ताकि पढ़ने में बोरियत न हो।
const story = [
  'नमस्कार, मेरा नाम Anu शर्मा है। यह कहानी मैं इसलिए लिख रही हूँ कि बांझपन के जिस दुख और दर्द से मैं और मेरे पति गुज़रे, उससे कोई और जोड़ा न गुज़रे।',
  'अन्श आयुर्वेद का कुल कोर्स 2 महीने का था। दवा लेते हुए 1 महीना बीत गया, फिर भी कोई रिज़ल्ट नहीं मिला। मुझे लगने लगा था कि शायद आयुर्वेद में भी इस समस्या का कोई उपचार नहीं है।',
  'लेकिन अभी 1 महीने का कोर्स बाकी था और मेरे पति को पूरी उम्मीद थी कि इस बार ज़रूर रिज़ल्ट मिलेगा। कोर्स ख़त्म हुआ… और कोर्स ख़त्म होने के 1 महीने बाद वो हुआ जिसकी हमने कभी कल्पना भी नहीं की थी — मेरी pregnancy test report positive आई।',
];

const facts = [
  { icon: <FiCalendar aria-hidden="true" />, value: '2 महीने', label: 'कोर्स की अवधि' },
  { icon: <FiHeart aria-hidden="true" />, value: '1 महीने बाद', label: 'रिज़ल्ट का अनुभव' },
  { icon: <FiCheckCircle aria-hidden="true" />, value: '5 / 5', label: 'संतुष्टि' },
];

export default function FamilySection() {
  return (
    <section className="story section" id="success-story">
      <div className="container story__grid">
        <div className="story__media" data-reveal="left">
          <figure className="story__photo">
            <img
              src={assets.family}
              alt="खुशखबरी के बाद अन्श आयुर्वेद का परिवार"
              loading="lazy"
            />
          </figure>

          <figure className="story__photo story__photo--small">
            <img
              src={assets.familyAlt}
              alt="आयुर्वेदिक वेलनेस के साथ खुश परिवार"
              loading="lazy"
            />
          </figure>

          <span className="story__badge">
            <em>कोर्स ख़त्म होने के बाद</em>
            <strong>Report Positive 🎉</strong>
          </span>
        </div>

        <div className="story__copy" data-reveal="right">
          <p className="eyebrow">सच्ची कहानी</p>
          <h2 className="story__title">2 साल की बेचैनी… फिर मिली वो खुशखबरी</h2>

          <div className="story__rating">
            <span className="story__stars" aria-hidden="true">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </span>
            <span>ग्राहक का अनुभव</span>
          </div>

          <blockquote className="story__quote">
            <FaQuoteLeft className="story__quote-mark" aria-hidden="true" />
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </blockquote>

          <ul className="story__facts">
            {facts.map((fact) => (
              <li key={fact.label}>
                <span className="story__fact-icon">{fact.icon}</span>
                <span className="story__fact-text">
                  <strong>{fact.value}</strong>
                  <em>{fact.label}</em>
                </span>
              </li>
            ))}
          </ul>

          <div className="story__author">
            <span className="story__avatar" aria-hidden="true">
              A
            </span>
            <span className="story__author-text">
              <strong>Anu Sharma</strong>
              <em>अन्श आयुर्वेद के साथ</em>
            </span>
          </div>

          <div className="story__actions">
            <a href="#order" className="btn btn--primary btn--lg">
              अगली कहानी आपकी हो सकती है
              <FiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
