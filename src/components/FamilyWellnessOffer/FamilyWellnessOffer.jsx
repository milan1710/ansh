import { FiArrowRight, FiCheck } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './FamilyWellnessOffer.css';

// पहले का एक बड़ा पैराग्राफ था — अब 3 छोटे हिस्सों में, ताकि पढ़ना आसान हो।
const paragraphs = [
  'क्या आप सालों से माता-पिता बनने का सपना देख रहे हैं और हर तरह के उपाय करने के बाद भी संतान की खुशी नहीं मिल रही? तो अब चिंता छोड़िए — अन्श आयुर्वेद आपके सपने को पूरा करने के लिए यहाँ है।',
  'यह 17 तरह की जड़ी-बूटियों को मिलाकर तैयार किया गया आयुर्वेदिक उपचार है, जो सालों से चली आ रही बांझपन (इनफर्टिलिटी) की समस्या का समाधान देने के लिए बनाया गया है। पुरुषों और महिलाओं — दोनों की अलग ज़रूरतों को ध्यान में रखकर इसके अलग-अलग उत्पाद तैयार किए गए हैं।',
  'सबसे बड़ी बात — अन्श आयुर्वेद टैबलेट पैसे वापस की गारंटी के साथ मिलती है। हज़ारों जोड़ों ने इसे अपनाया और माता-पिता बनने की खुशी पाई। तो देर किस बात की?',
];

const menPoints = ['शुक्राणु (स्पर्म) की कमी', 'कमज़ोरी / ढीलापन', 'शीघ्रपतन (समय की समस्या)'];
const womenPoints = ['अनियमित मासिक धर्म', 'PCOS / PCOD', 'गर्भधारण में रुकावट'];

const highlights = [
  '17 जड़ी-बूटियों का असरदार मिश्रण',
  'पुरुष और महिला दोनों के लिए समाधान',
  'सिर्फ 1 महीने में खुशखबरी के अनुभव',
  'पैसे वापस की गारंटी के साथ',
];

export default function FamilyWellnessOffer() {
  return (
    <section className="wellness-offer section" id="family-offer">
      <div className="container wellness-offer__grid">
        <div className="wellness-offer__media" data-reveal="left">
          <div className="wellness-offer__image">
            <img
              src={assets.familyOffer}
              alt="अन्श आयुर्वेद फैमिली वेलनेस ऑफ़र"
              loading="lazy"
            />
          </div>
          <span className="wellness-offer__stamp" aria-hidden="true">
            <strong>17</strong>
            <em>जड़ी-बूटियाँ</em>
          </span>
        </div>

        <div className="wellness-offer__copy" data-reveal="right">
          <p className="eyebrow">अन्श आयुर्वेद क्या है?</p>
          <h2 className="wellness-offer__title">
            बांझपन का असरदार आयुर्वेदिक उपचार — माता-पिता बनने की खुशी पाएं
          </h2>

          <div className="wellness-offer__text">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="wellness-offer__cards">
            <div className="wellness-offer__card wellness-offer__card--men">
              <h3>पुरुषों में किन समस्याओं के लिए</h3>
              <ul>
                {menPoints.map((point) => (
                  <li key={point}>
                    <FiCheck aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="wellness-offer__card wellness-offer__card--women">
              <h3>महिलाओं में किन समस्याओं के लिए</h3>
              <ul>
                {womenPoints.map((point) => (
                  <li key={point}>
                    <FiCheck aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="wellness-offer__points">
            {highlights.map((point, index) => (
              <li key={point} data-reveal data-reveal-delay={index * 60}>
                <span className="wellness-offer__dot" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="wellness-offer__actions">
            <a href="#order" className="btn btn--gold btn--lg">
              अभी ऑर्डर करें
              <FiArrowRight />
            </a>
            <a href="#contact" className="btn btn--outline btn--lg">
              हमसे बात करें
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
