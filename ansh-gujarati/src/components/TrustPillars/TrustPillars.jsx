import {
  FiAward,
  FiCalendar,
  FiFeather,
  FiHeadphones,
  FiShield,
  FiTruck,
  FiUserCheck,
} from 'react-icons/fi';
import './TrustPillars.css';

const pillars = [
  {
    icon: <FiFeather aria-hidden="true" />,
    title: '17 આયુર્વેદિક જડીબુટ્ટીઓ',
    text: 'પરંપરાગત આયુર્વેદિક જડીબુટ્ટીઓને મિશ્ર કરીને તૈયાર કરાયેલું મિશ્રણ.',
  },
  {
    icon: <FiUserCheck aria-hidden="true" />,
    title: 'પુરુષ અને મહિલા — અલગ ફોર્મ્યુલા',
    text: 'બંનેની અલગ જરૂરિયાતો ધ્યાનમાં રાખીને તૈયાર કરાયેલા ઉત્પાદનો.',
  },
  {
    icon: <FiCalendar aria-hidden="true" />,
    title: '2 મહિનાનો પૂરો કોર્સ',
    text: 'દરરોજ સવારે જમ્યા પછી 1 ટેબ્લેટ — સરળ અને પૂરી રીતે સ્પષ્ટ રીત.',
  },
  {
    icon: <FiShield aria-hidden="true" />,
    title: 'પૈસા પાછા મળવાની ગેરંટી',
    text: 'નક્કી નિયમો અને શરતો મુજબ 100% મની બેક ગેરંટી.',
  },
  {
    icon: <FiHeadphones aria-hidden="true" />,
    title: 'સહાય ટીમ સાથે સીધી વાત',
    text: 'કોર્સ, કિંમત કે કોઈ પણ સવાલ માટે ટીમ ફોન અને WhatsApp પર ઉપલબ્ધ.',
  },
  {
    icon: <FiTruck aria-hidden="true" />,
    title: 'સુરક્ષિત અને ખાનગી ડિલિવરી',
    text: 'ડિસ્ક્રીટ પેકિંગ સાથે આખા ભારતમાં તમારા ઘર સુધી ડિલિવરી.',
  },
];

export default function TrustPillars() {
  return (
    <section className="trust-pillars section" id="why-trust-us">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">વિશ્વાસનાં કારણો</p>
          <h2 className="section-title">હજારો પરિવારો અન્શ આયુર્વેદ પર વિશ્વાસ કેમ કરે છે?</h2>
          <p className="section-subtitle">
            કુદરતી રીત, સ્પષ્ટ માહિતી અને પારદર્શક ગેરંટી — આ જ અમારી સૌથી મોટી ઓળખ છે.
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
            <strong>100% મની બેક ગેરંટી</strong>
            <span>
              રિઝલ્ટ ન મળે તો નક્કી નિયમો અને શરતો મુજબ પૈસા પાછા — તમને કોઈ રિસ્ક નથી.
            </span>
          </div>
          <a href="#order" className="btn btn--gold btn--lg trust-pillars__seal-btn">
            જોખમ-મુક્ત ઓર્ડર કરો
          </a>
        </div>
      </div>
    </section>
  );
}
