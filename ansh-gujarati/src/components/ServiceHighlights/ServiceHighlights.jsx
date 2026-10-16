import { FiCheck, FiArrowRight } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './ServiceHighlights.css';

const highlights = [
  {
    id: 'positive-results',
    image: assets.service2,
    alt: 'અલ્ટ્રાસાઉન્ડ રિપોર્ટ સાથે ખુશ દંપતી — અન્શ આયુર્વેદના સકારાત્મક પરિણામ',
    eyebrow: 'વિશ્વાસપાત્ર પરિણામો',
    stat: '90% સુધી',
    statLabel: 'Positive પરિણામ',
    title: '90% સુધી Positive પરિણામ, સંતુષ્ટિની ગેરંટી',
    text:
      'અન્શ આયુર્વેદ લેનારા મોટાભાગના દંપતીઓને નક્કી સમયમાં positive પરિણામ મળ્યું છે. અમારું પૂરું ધ્યાન વહેલામાં વહેલું પરિણામ દેખાડવા અને તમારી સંતુષ્ટિ પર રહે છે.',
    points: [
      '90% સુધી positive પરિણામનો અનુભવ',
      'સંતુષ્ટિની ગેરંટી સાથે વિશ્વાસ',
      'ઝડપી પરિણામ દેખાડવા પર પૂરું ધ્યાન',
    ],
  },
  {
    id: 'happy-customers',
    image: assets.service3,
    alt: 'હાથમાં નવજાત શિશુ — 3000+ સંતુષ્ટ ગ્રાહકોનો વિશ્વાસ',
    eyebrow: 'ગ્રાહકોનો વિશ્વાસ',
    stat: '3000+',
    statLabel: 'Happy Customers',
    title: 'IVF નિષ્ફળ ગયા પછી આયુર્વેદ પર વિશ્વાસ',
    text:
      'આખા ભારતમાં 3000+ થી વધુ સંતુષ્ટ ગ્રાહકો આજે અન્શ આયુર્વેદ પર વિશ્વાસ કરે છે — જેમાં ઘણા એવા દંપતીઓ છે જેમણે IVF નિષ્ફળ ગયા પછી કુદરતી રીતે ગર્ભધારણની દિશામાં આગળ વધ્યા.',
    points: [
      'IVF નિષ્ફળ ગયા પછી પણ આશા બની રહે',
      'કુદરતી રીતે ગર્ભધારણની દિશામાં પગલું',
      '3000+ સંતુષ્ટ ગ્રાહકોનો સાથ',
    ],
  },
];

export default function ServiceHighlights() {
  return (
    <section className="service-highlights" id="results">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">પરિણામ અને વિશ્વાસ</p>
          <h2 className="section-title">અન્શ આયુર્વેદના અસરકારક અને વિશ્વાસપાત્ર પરિણામો</h2>
          <p className="section-subtitle">
            હજારો દંપતીઓનો વિશ્વાસ અને વર્ષોનો આયુર્વેદિક અનુભવ — આ જ અમારી સૌથી મોટી ઓળખ છે.
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
            આજે જ અન્શ આયુર્વેદ સાથે જોડાઓ
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
