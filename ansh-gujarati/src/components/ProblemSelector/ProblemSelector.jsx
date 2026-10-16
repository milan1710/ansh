import { useState } from 'react';
import {
  FiActivity,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import './ProblemSelector.css';

// यह अनुभाग ग्राहक को सक्रिय रखता है — अपनी समस्या चुनते ही
// उसे सही उत्पाद का सुझाव और सीधा ऑर्डर बटन मिल जाता है।
const problems = [
  {
    id: 'sperm',
    label: 'શુક્રાણુની કમી / નબળાઈ',
    icon: <FiTrendingUp aria-hidden="true" />,
    audience: 'પુરુષો માટે',
    target: '#men',
    product: 'Ansh Ayurveda For Men',
    note: 'શુક્રાણુની સંખ્યા અને સેક્સ ટાઈમિંગ પર ધ્યાન આપતો 2 મહિનાનો આયુર્વેદિક કોર્સ.',
  },
  {
    id: 'timing',
    label: 'શીઘ્રપતન / ટાઈમિંગની સમસ્યા',
    icon: <FiClock aria-hidden="true" />,
    audience: 'પુરુષો માટે',
    target: '#men',
    product: 'Ansh Ayurveda For Men',
    note: 'ટાઈમિંગ સુધારવામાં અને શરીરની નબળાઈ દૂર કરવામાં સહાયક કોર્સ.',
  },
  {
    id: 'pcos',
    label: 'PCOS / PCOD',
    icon: <FiActivity aria-hidden="true" />,
    audience: 'મહિલાઓ માટે',
    target: '#women',
    product: 'Ansh Ayurveda For Women',
    note: 'PCOD / PCOS અને હોર્મોનલ અસંતુલન પર પૂરું ધ્યાન આપતો કોર્સ.',
  },
  {
    id: 'periods',
    label: 'અનિયમિત માસિક ધર્મ',
    icon: <FiCalendar aria-hidden="true" />,
    audience: 'મહિલાઓ માટે',
    target: '#women',
    product: 'Ansh Ayurveda For Women',
    note: 'માસિક ધર્મને સાચા અને નિયમિત સમયે લાવવામાં સહાયક.',
  },
  {
    id: 'ovulation',
    label: 'ઓવ્યુલેશન / ઈંડાની ગુણવત્તા',
    icon: <FiTarget aria-hidden="true" />,
    audience: 'મહિલાઓ માટે',
    target: '#fertility-benefits',
    product: 'Ansh Ayurveda For Women',
    note: 'સમયસર ઓવ્યુલેશન અને ઈંડાની વૃદ્ધિ તથા ગુણવત્તા પર ધ્યાન.',
  },
  {
    id: 'delay',
    label: 'વર્ષોથી ગર્ભધારણ નથી',
    icon: <FiRefreshCw aria-hidden="true" />,
    audience: 'પુરુષ + મહિલા બંને',
    target: '#combo',
    product: 'Ansh Ayurveda Combo Pack',
    note: 'બંને માટે એકસાથે કોર્સ — આખા પરિવારના સ્વાસ્થ્ય પર એકસાથે ધ્યાન.',
  },
  {
    id: 'ivf',
    label: 'IVF નિષ્ફળ ગયા પછી',
    icon: <FiUsers aria-hidden="true" />,
    audience: 'પુરુષ + મહિલા બંને',
    target: '#combo',
    product: 'Ansh Ayurveda Combo Pack',
    note: 'IVF પછી પણ આશા બની રહે — કુદરતી દિશામાં આગળનું પગલું.',
  },
];

const resultPoints = [
  '17 આયુર્વેદિક જડીબુટ્ટીઓનું મિશ્રણ',
  '2 મહિનાનો પૂરો કોર્સ — દરરોજ સવારે 1 ટેબ્લેટ',
  'પૈસા પાછા મળવાની ગેરંટી સાથે',
];

export default function ProblemSelector() {
  const [activeId, setActiveId] = useState(problems[0].id);
  const current = problems.find((problem) => problem.id === activeId) ?? problems[0];

  return (
    <section
      className="problem-picker section"
      id="find-your-course"
      aria-label="તમારી સમસ્યા પસંદ કરીને યોગ્ય ઉત્પાદન જાણો"
    >
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">તમારી જરૂરિયાત ઓળખો</p>
          <h2 className="section-title">તમારી સમસ્યા શું છે? યોગ્ય ઉત્પાદન પસંદ કરો</h2>
          <p className="section-subtitle">
            નીચે તમારી સમસ્યા પર ટેપ કરો — અમે તરત જણાવીશું કે તમારા માટે કયું ઉત્પાદન યોગ્ય રહેશે.
          </p>
        </div>

        <div className="problem-picker__grid">
          <ul className="problem-picker__chips" data-reveal="left">
            {problems.map((problem) => {
              const isActive = problem.id === current.id;
              return (
                <li key={problem.id}>
                  <button
                    type="button"
                    className={`problem-picker__chip ${
                      isActive ? 'problem-picker__chip--active' : ''
                    }`}
                    aria-pressed={isActive}
                    onClick={() => setActiveId(problem.id)}
                  >
                    <span className="problem-picker__chip-icon">{problem.icon}</span>
                    <span className="problem-picker__chip-text">
                      <strong>{problem.label}</strong>
                      <em>{problem.audience}</em>
                    </span>
                    <FiArrowRight className="problem-picker__chip-arrow" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* key बदलने पर कार्ड फिर से animate होता है — हर चयन पर नया एहसास। */}
          <div className="problem-picker__result" data-reveal="right" key={current.id}>
            <p className="problem-picker__result-eyebrow">તમારા માટે સૂચન</p>
            <h3 className="problem-picker__result-title">{current.product}</h3>
            <p className="problem-picker__result-note">{current.note}</p>

            <ul className="problem-picker__result-points">
              {resultPoints.map((point) => (
                <li key={point}>
                  <FiCheckCircle aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="problem-picker__result-actions">
              <a href="#order" className="btn btn--primary btn--lg">
                હમણાં ઓર્ડર કરો
                <FiArrowRight />
              </a>
              <a href={current.target} className="btn btn--outline btn--lg">
                વિગતવાર જુઓ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
