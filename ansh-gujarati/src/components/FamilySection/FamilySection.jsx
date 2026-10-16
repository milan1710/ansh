import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { FiArrowRight, FiCalendar, FiCheckCircle, FiHeart } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './FamilySection.css';

// ग्राहक की असली कहानी — लंबे पैराग्राफ को छोटे-छोटे हिस्सों में बाँटा गया है
// ताकि पढ़ने में बोरियत न हो।
const story = [
  'નમસ્કાર, મારું નામ Anu શર્મા છે. આ વાત હું એટલા માટે લખી રહી છું કે વંધ્યત્વના જે દુઃખ અને પીડામાંથી મેં અને મારા પતિએ પસાર થવું પડ્યું, તેમાંથી બીજું કોઈ દંપતી ન પસાર થાય.',
  'અન્શ આયુર્વેદનો કુલ કોર્સ 2 મહિનાનો હતો. દવા લેતાં 1 મહિનો વીતી ગયો, તો પણ કોઈ પરિણામ ન મળ્યું. મને લાગવા માંડ્યું કે કદાચ આયુર્વેદમાં પણ આ સમસ્યાનો કોઈ ઉપચાર નથી.',
  'પણ હજી 1 મહિનાનો કોર્સ બાકી હતો અને મારા પતિને પૂરી આશા હતી કે આ વખતે ચોક્કસ પરિણામ મળશે. કોર્સ પૂરો થયો… અને કોર્સ પૂરો થયાના 1 મહિના પછી તે થયું જેની અમે ક્યારેય કલ્પના પણ નહોતી કરી — મારો pregnancy test report positive આવ્યો.',
];

const facts = [
  { icon: <FiCalendar aria-hidden="true" />, value: '2 મહિના', label: 'કોર્સનો સમયગાળો' },
  { icon: <FiHeart aria-hidden="true" />, value: '1 મહિના પછી', label: 'પરિણામનો અનુભવ' },
  { icon: <FiCheckCircle aria-hidden="true" />, value: '5 / 5', label: 'સંતુષ્ટિ' },
];

export default function FamilySection() {
  return (
    <section className="story section" id="success-story">
      <div className="container story__grid">
        <div className="story__media" data-reveal="left">
          <figure className="story__photo">
            <img
              src={assets.family}
              alt="સારા સમાચાર પછી અન્શ આયુર્વેદનો પરિવાર"
              loading="lazy"
            />
          </figure>

          <figure className="story__photo story__photo--small">
            <img
              src={assets.familyAlt}
              alt="આયુર્વેદિક વેલનેસ સાથે ખુશ પરિવાર"
              loading="lazy"
            />
          </figure>

          <span className="story__badge">
            <em>કોર્સ પૂરો થયા પછી</em>
            <strong>Report Positive 🎉</strong>
          </span>
        </div>

        <div className="story__copy" data-reveal="right">
          <p className="eyebrow">સાચી વાત</p>
          <h2 className="story__title">2 વર્ષની બેચેની… પછી મળ્યા તે સારા સમાચાર</h2>

          <div className="story__rating">
            <span className="story__stars" aria-hidden="true">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </span>
            <span>ગ્રાહકનો અનુભવ</span>
          </div>

          <blockquote className="story__quote">
            <FaQuoteLeft className="story__quote-mark" aria-hidden="true" />
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </blockquote>

          <ul className="story__facts">
            {facts.map((fact) => (
              <li key={fact.label}>
                <span className="story__fact-icon">{fact.icon}</span>
                <span className="story__fact-text">
                  <strong>{fact.value}</strong>
                  <em>{fact.label}</em>
                </span>
              </li>
            ))}
          </ul>

          <div className="story__author">
            <span className="story__avatar" aria-hidden="true">
              A
            </span>
            <span className="story__author-text">
              <strong>Anu Sharma</strong>
              <em>અન્શ આયુર્વેદ સાથે</em>
            </span>
          </div>

          <div className="story__actions">
            <a href="#order" className="btn btn--primary btn--lg">
              આગળની વાત તમારી હોઈ શકે છે
              <FiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
