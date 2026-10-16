import { FiCheck, FiArrowRight } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './ServiceHighlights.css';

const highlights = [
  {
    id: 'positive-results',
    image: assets.service2,
    alt: 'अल्ट्रासाउंड रिपोर्ट के साथ खुश जोड़ा — अन्श आयुर्वेद के positive नतीजे',
    eyebrow: 'भरोसेमंद नतीजे',
    stat: '90% तक',
    statLabel: 'Positive रिज़ल्ट',
    title: '90% तक Positive रिज़ल्ट, संतुष्टि की गारंटी',
    text:
      'अन्श आयुर्वेद लेने वाले ज़्यादातर जोड़ों को तय समय के भीतर positive रिज़ल्ट मिला है। हमारा पूरा ध्यान जल्द से जल्द नतीजा दिखाने और आपकी संतुष्टि पर रहता है।',
    points: [
      '90% तक positive रिज़ल्ट के अनुभव',
      'संतुष्टि की गारंटी के साथ भरोसा',
      'जल्द रिज़ल्ट दिखाने पर पूरा ध्यान',
    ],
  },
  {
    id: 'happy-customers',
    image: assets.service3,
    alt: 'हाथों में नवजात शिशु — 3000+ संतुष्ट ग्राहकों का भरोसा',
    eyebrow: 'ग्राहकों का भरोसा',
    stat: '3000+',
    statLabel: 'Happy Customers',
    title: 'IVF असफल होने के बाद आयुर्वेद पर भरोसा',
    text:
      'पूरे भारत में 3000+ से ज़्यादा संतुष्ट ग्राहक आज अन्श आयुर्वेद पर भरोसा करते हैं — जिनमें कई ऐसे जोड़े हैं जिन्होंने IVF असफल होने के बाद प्राकृतिक रूप से गर्भधारण की दिशा में आगे बढ़े।',
    points: [
      'IVF असफल होने के बाद भी उम्मीद बरकरार',
      'प्राकृतिक रूप से गर्भधारण की दिशा में कदम',
      '3000+ संतुष्ट ग्राहकों का साथ',
    ],
  },
];

export default function ServiceHighlights() {
  return (
    <section className="service-highlights" id="results">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">नतीजे और भरोसा</p>
          <h2 className="section-title">अन्श आयुर्वेद के असरदार और भरोसेमंद नतीजे</h2>
          <p className="section-subtitle">
            हज़ारों जोड़ों का भरोसा और सालों का आयुर्वेदिक अनुभव — यही हमारी सबसे बड़ी पहचान है।
          </p>
        </div>

        <div className="service-highlights__grid">
          {highlights.map((item, index) => (
            <article
              className="service-highlights__card"
              key={item.id}
              data-reveal
              data-reveal-delay={index * 120}
            >
              <div className="service-highlights__media">
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="service-highlights__stat">
                  <strong>{item.stat}</strong>
                  <em>{item.statLabel}</em>
                </span>
              </div>

              <div className="service-highlights__body">
                <p className="eyebrow">{item.eyebrow}</p>
                <h3 className="service-highlights__title">{item.title}</h3>
                <p className="service-highlights__text">{item.text}</p>

                <ul className="service-highlights__points">
                  {item.points.map((point) => (
                    <li key={point}>
                      <FiCheck aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="service-highlights__actions">
          <a href="#order" className="btn btn--primary btn--lg">
            आज ही अन्श आयुर्वेद से जुड़ें
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
