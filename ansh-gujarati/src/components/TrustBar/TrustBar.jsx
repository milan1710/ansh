import { FiRefreshCw, FiHeart, FiTruck, FiHeadphones } from 'react-icons/fi';
import './TrustBar.css';

const items = [
  {
    icon: <FiRefreshCw aria-hidden="true" />,
    title: '100% મની બેક ગેરંટી',
    text: 'નક્કી કરેલા નિયમો અને શરતો મુજબ',
  },
  {
    icon: <FiHeart aria-hidden="true" />,
    title: '100% આયુર્વેદિક ઉત્પાદન',
    text: 'કુદરતી આયુર્વેદિક સંભાળ',
  },
  {
    icon: <FiTruck aria-hidden="true" />,
    title: 'ઝડપી અને સુરક્ષિત ડિલિવરી',
    text: 'તમારા ઘર સુધી, સમયસર ડિલિવરી',
  },
  {
    icon: <FiHeadphones aria-hidden="true" />,
    title: 'વિશ્વાસપાત્ર ગ્રાહક સહાય',
    text: 'દરેક સવાલ માટે અમારી ટીમ તમારી સાથે',
  },
];

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="ઉત્પાદન અને ખરીદીની માહિતી">
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
