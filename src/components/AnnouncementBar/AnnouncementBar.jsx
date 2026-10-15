import { FaPhoneAlt } from 'react-icons/fa';
import { FiAward, FiFeather, FiTruck, FiUsers } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig.js';
import { trackEvent } from '../../lib/pixel.js';
import './AnnouncementBar.css';

// पेज के सबसे ऊपर चलने वाली भरोसे की पट्टी।
const messages = [
  { icon: <FiAward aria-hidden="true" />, text: '100% मनी बैक गारंटी — तय नियमों एवं शर्तों के अनुसार' },
  { icon: <FiFeather aria-hidden="true" />, text: '100% आयुर्वेदिक उत्पाद — 17 जड़ी-बूटियों का मिश्रण' },
  { icon: <FiUsers aria-hidden="true" />, text: '3000+ संतुष्ट परिवारों का भरोसा' },
  { icon: <FiTruck aria-hidden="true" />, text: 'फास्ट एवं सुरक्षित डिलीवरी — पूरे भारत में' },
];

export default function AnnouncementBar() {
  const { contact } = siteConfig;
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`;
  const track = [...messages, ...messages];

  return (
    <div className="announcement">
      <div className="announcement__marquee" aria-hidden="true">
        <ul className="announcement__track">
          {track.map((item, index) => (
            <li className="announcement__item" key={`${item.text}-${index}`}>
              <span className="announcement__icon">{item.icon}</span>
              {item.text}
              <span className="announcement__star">★</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="announcement__sr">
        100% मनी बैक गारंटी, 100% आयुर्वेदिक उत्पाद, 3000+ संतुष्ट परिवार और सुरक्षित डिलीवरी।
      </p>

      <a
        href={telHref}
        className="announcement__call"
        onClick={() => {
          /* कॉल क्लिक — Contact के साथ Lead भी गिना जाता है। */
          trackEvent('Contact', { method: 'phone' });
          trackEvent('Lead', { method: 'phone' });
        }}
      >
        <FaPhoneAlt aria-hidden="true" />
        <span className="announcement__call-text">अभी बात करें</span>
        <strong>{contact.phone}</strong>
      </a>
    </div>
  );
}
