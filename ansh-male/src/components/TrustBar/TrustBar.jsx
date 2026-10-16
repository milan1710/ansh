import { FiRefreshCw, FiHeart, FiTruck, FiHeadphones } from 'react-icons/fi';
import './TrustBar.css';

const items = [
  {
    icon: <FiRefreshCw aria-hidden="true" />,
    title: '100% मनी बैक गारंटी',
    text: 'तय नियमों एवं शर्तों के अनुसार',
  },
  {
    icon: <FiHeart aria-hidden="true" />,
    title: '100% आयुर्वेदिक उत्पाद',
    text: 'प्राकृतिक आयुर्वेदिक देखभाल',
  },
  {
    icon: <FiTruck aria-hidden="true" />,
    title: 'फास्ट एवं सुरक्षित डिलीवरी',
    text: 'आपके घर तक, समय पर डिलीवरी',
  },
  {
    icon: <FiHeadphones aria-hidden="true" />,
    title: 'भरोसेमंद ग्राहक सहायता',
    text: 'हर सवाल के लिए हमारी टीम आपके साथ',
  },
];

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="उत्पाद और खरीदारी की जानकारी">
      <div className="container">
        <ul className="trustbar__list">
          {items.map((item, index) => (
            <li
              className="trustbar__item"
              key={item.title}
              data-reveal
              data-reveal-delay={index * 80}
            >
              <span className="trustbar__icon">{item.icon}</span>
              <span className="trustbar__text">
                <strong>{item.title}</strong>
                <em>{item.text}</em>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
