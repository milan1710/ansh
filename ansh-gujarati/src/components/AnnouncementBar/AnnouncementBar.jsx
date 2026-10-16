import { FaPhoneAlt } from 'react-icons/fa';
import { FiAward, FiFeather, FiTruck, FiUsers } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig.js';
import { trackEvent } from '../../lib/pixel.js';
import './AnnouncementBar.css';

// पेज के सबसे ऊपर चलने वाली भरोसे की पट्टी।
const messages = [
  { icon: <FiAward aria-hidden="true" />, text: '100% મની બેક ગેરંટી — નક્કી કરેલા નિયમો અને શરતો મુજબ' },
  { icon: <FiFeather aria-hidden="true" />, text: '100% આયુર્વેદિક ઉત્પાદન — 17 જડીબુટ્ટીઓનું મિશ્રણ' },
  { icon: <FiUsers aria-hidden="true" />, text: '3000+ સંતુષ્ટ પરિવારોનો વિશ્વાસ' },
  { icon: <FiTruck aria-hidden="true" />, text: 'ઝડપી અને સુરક્ષિત ડિલિવરી — આખા ભારતમાં' },
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
        100% મની બેક ગેરંટી, 100% આયુર્વેદિક ઉત્પાદન, 3000+ સંતુષ્ટ પરિવાર અને સુરક્ષિત ડિલિવરી.
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
        <span className="announcement__call-text">હમણાં વાત કરો</span>
        <strong>{contact.phone}</strong>
      </a>
    </div>
  );
}
