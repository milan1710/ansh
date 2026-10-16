import { FiArrowRight, FiCheck } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './FamilyWellnessOffer.css';

// पहले का एक बड़ा पैराग्राफ था — अब 3 छोटे हिस्सों में, ताकि पढ़ना आसान हो।
const paragraphs = [
  'શું તમે વર્ષોથી માતા-પિતા બનવાનું સપનું જોઈ રહ્યા છો અને દરેક પ્રકારના ઉપાય કર્યા પછી પણ સંતાનનું સુખ નથી મળ્યું? તો હવે ચિંતા છોડો — અન્શ આયુર્વેદ તમારું સપનું પૂરું કરવા માટે અહીં છે.',
  'આ 17 પ્રકારની જડીબુટ્ટીઓને મિશ્ર કરીને તૈયાર કરાયેલી આયુર્વેદિક સારવાર છે, જે વર્ષોથી ચાલી આવતી વંધ્યત્વ (ઇનફર્ટિલિટી)ની સમસ્યાનો ઉકેલ આપવા માટે બનાવવામાં આવી છે. પુરુષો અને મહિલાઓ — બંનેની અલગ જરૂરિયાતો ધ્યાનમાં રાખીને તેના અલગ-અલગ ઉત્પાદનો તૈયાર કરવામાં આવ્યા છે.',
  'સૌથી મોટી વાત — અન્શ આયુર્વેદ ટેબ્લેટ પૈસા પાછા મળવાની ગેરંટી સાથે મળે છે. હજારો દંપતીઓએ તેને અપનાવ્યું અને માતા-પિતા બનવાનું સુખ મેળવ્યું. તો વાર શેની?',
];

const menPoints = ['શુક્રાણુ (સ્પર્મ)ની કમી', 'નબળાઈ / ઢીલાપણું', 'શીઘ્રપતન (સમયની સમસ્યા)'];
const womenPoints = ['અનિયમિત માસિક ધર્મ', 'PCOS / PCOD', 'ગર્ભધારણમાં અવરોધ'];

const highlights = [
  '17 જડીબુટ્ટીઓનું અસરકારક મિશ્રણ',
  'પુરુષ અને મહિલા બંને માટે ઉકેલ',
  'ફક્ત 1 મહિનામાં સારા સમાચારનો અનુભવ',
  'પૈસા પાછા મળવાની ગેરંટી સાથે',
];

export default function FamilyWellnessOffer() {
  return (
    <section className="wellness-offer section" id="family-offer">
      <div className="container wellness-offer__grid">
        <div className="wellness-offer__media" data-reveal="left">
          <div className="wellness-offer__image">
            <img
              src={assets.familyOffer}
              alt="અન્શ આયુર્વેદ ફેમિલી વેલનેસ ઓફર"
              loading="lazy"
            />
          </div>
          <span className="wellness-offer__stamp" aria-hidden="true">
            <strong>17</strong>
            <em>જડીબુટ્ટીઓ</em>
          </span>
        </div>

        <div className="wellness-offer__copy" data-reveal="right">
          <p className="eyebrow">અન્શ આયુર્વેદ શું છે?</p>
          <h2 className="wellness-offer__title">
            વંધ્યત્વની અસરકારક આયુર્વેદિક સારવાર — માતા-પિતા બનવાનું સુખ મેળવો
          </h2>

          <div className="wellness-offer__text">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="wellness-offer__cards">
            <div className="wellness-offer__card wellness-offer__card--men">
              <h3>પુરુષોમાં કઈ સમસ્યાઓ માટે</h3>
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
              <h3>મહિલાઓમાં કઈ સમસ્યાઓ માટે</h3>
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
              હમણાં ઓર્ડર કરો
              <FiArrowRight />
            </a>
            <a href="#contact" className="btn btn--outline btn--lg">
              અમારી સાથે વાત કરો
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
