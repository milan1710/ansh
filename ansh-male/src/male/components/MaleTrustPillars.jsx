import {
  FiAward,
  FiCalendar,
  FiFeather,
  FiHeadphones,
  FiLock,
  FiShield,
  FiTruck,
} from 'react-icons/fi';
import '../../components/TrustPillars/TrustPillars.css';

const pillars = [
  {
    icon: <FiFeather aria-hidden="true" />,
    title: '17 आयुर्वेदिक जड़ी-बूटियाँ',
    text: 'पारंपरिक आयुर्वेदिक जड़ी-बूटियों को मिलाकर तैयार किया गया शुद्ध मिश्रण।',
  },
  {
    icon: <FiCalendar aria-hidden="true" />,
    title: '1 महीने का पूरा कोर्स',
    text: 'रोज़ सुबह खाने के बाद 1 टैबलेट — सरल और पूरी तरह स्पष्ट तरीका। सिर्फ़ ₹1499।',
  },
  {
    icon: <FiShield aria-hidden="true" />,
    title: 'पैसे वापस की गारंटी',
    text: 'तय नियमों एवं शर्तों के अनुसार 100% मनी बैक गारंटी।',
  },
  {
    icon: <FiLock aria-hidden="true" />,
    title: 'पूरी गोपनीयता',
    text: 'आपकी जानकारी और समस्या पूरी तरह निजी रहती है — कोई शर्मिंदगी नहीं।',
  },
  {
    icon: <FiTruck aria-hidden="true" />,
    title: 'डिस्क्रीट और सुरक्षित डिलीवरी',
    text: 'बिना किसी नाम के पैकिंग में पूरे भारत में आपके घर तक डिलीवरी।',
  },
  {
    icon: <FiHeadphones aria-hidden="true" />,
    title: 'सहायता टीम से सीधी बात',
    text: 'कोर्स, कीमत या किसी भी सवाल के लिए टीम फ़ोन और WhatsApp पर उपलब्ध।',
  },
];

export default function MaleTrustPillars() {
  return (
    <section className="trust-pillars section" id="why-trust-us">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">भरोसे की वजहें</p>
          <h2 className="section-title">हज़ारों पुरुष Ansh Ayurveda पर भरोसा क्यों करते हैं?</h2>
          <p className="section-subtitle">
            प्राकृतिक तरीका, पूरी गोपनीयता और पारदर्शी गारंटी — यही हमारी सबसे बड़ी पहचान है।
          </p>
        </div>

        <ul className="trust-pillars__grid">
          {pillars.map((pillar, index) => (
            <li
              className="trust-pillars__card"
              key={pillar.title}
              data-reveal
              data-reveal-delay={index * 70}
            >
              <span className="trust-pillars__icon">{pillar.icon}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </li>
          ))}
        </ul>

        <div className="trust-pillars__seal" data-reveal="zoom">
          <span className="trust-pillars__seal-badge" aria-hidden="true">
            <FiAward />
          </span>
          <div className="trust-pillars__seal-text">
            <strong>100% मनी बैक गारंटी</strong>
            <span>
              रिज़ल्ट न मिलने पर तय नियमों एवं शर्तों के अनुसार पैसे वापस — आपको कोई रिस्क नहीं।
            </span>
          </div>
          <a href="#order" className="btn btn--gold btn--lg trust-pillars__seal-btn">
            जोखिम-मुक्त ऑर्डर करें
          </a>
        </div>
      </div>
    </section>
  );
}
