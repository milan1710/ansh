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
    label: 'शुक्राणु की कमी / कमज़ोरी',
    icon: <FiTrendingUp aria-hidden="true" />,
    audience: 'पुरुषों के लिए',
    target: '#men',
    product: 'Ansh Ayurveda For Men',
    note: 'शुक्राणु की संख्या और सेक्स टाइमिंग पर ध्यान देने वाला 2 महीने का आयुर्वेदिक कोर्स।',
  },
  {
    id: 'timing',
    label: 'शीघ्रपतन / टाइमिंग की समस्या',
    icon: <FiClock aria-hidden="true" />,
    audience: 'पुरुषों के लिए',
    target: '#men',
    product: 'Ansh Ayurveda For Men',
    note: 'टाइमिंग सुधारने और शरीर की कमज़ोरी दूर करने में सहायक कोर्स।',
  },
  {
    id: 'pcos',
    label: 'PCOS / PCOD',
    icon: <FiActivity aria-hidden="true" />,
    audience: 'महिलाओं के लिए',
    target: '#women',
    product: 'Ansh Ayurveda For Women',
    note: 'PCOD / PCOS और हार्मोनल असंतुलन पर पूरा ध्यान देने वाला कोर्स।',
  },
  {
    id: 'periods',
    label: 'अनियमित मासिक धर्म',
    icon: <FiCalendar aria-hidden="true" />,
    audience: 'महिलाओं के लिए',
    target: '#women',
    product: 'Ansh Ayurveda For Women',
    note: 'मासिक धर्म को सही और नियमित समय पर लाने में सहायक।',
  },
  {
    id: 'ovulation',
    label: 'ओव्यूलेशन / अंडे की गुणवत्ता',
    icon: <FiTarget aria-hidden="true" />,
    audience: 'महिलाओं के लिए',
    target: '#fertility-benefits',
    product: 'Ansh Ayurveda For Women',
    note: 'समय पर ओव्यूलेशन और अंडे की वृद्धि व गुणवत्ता पर ध्यान।',
  },
  {
    id: 'delay',
    label: 'सालों से गर्भधारण नहीं',
    icon: <FiRefreshCw aria-hidden="true" />,
    audience: 'पुरुष + महिला दोनों',
    target: '#combo',
    product: 'Ansh Ayurveda Combo Pack',
    note: 'दोनों के लिए एक साथ कोर्स — पूरे परिवार की सेहत पर एक साथ ध्यान।',
  },
  {
    id: 'ivf',
    label: 'IVF असफल होने के बाद',
    icon: <FiUsers aria-hidden="true" />,
    audience: 'पुरुष + महिला दोनों',
    target: '#combo',
    product: 'Ansh Ayurveda Combo Pack',
    note: 'IVF के बाद भी उम्मीद बरकरार — प्राकृतिक दिशा में अगला कदम।',
  },
];

const resultPoints = [
  '17 आयुर्वेदिक जड़ी-बूटियों का मिश्रण',
  '2 महीने का पूरा कोर्स — रोज़ सुबह 1 टैबलेट',
  'पैसे वापस की गारंटी के साथ',
];

export default function ProblemSelector() {
  const [activeId, setActiveId] = useState(problems[0].id);
  const current = problems.find((problem) => problem.id === activeId) ?? problems[0];

  return (
    <section
      className="problem-picker section"
      id="find-your-course"
      aria-label="अपनी समस्या चुनकर सही उत्पाद जानें"
    >
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">अपनी ज़रूरत पहचानें</p>
          <h2 className="section-title">आपकी समस्या क्या है? सही उत्पाद चुनें</h2>
          <p className="section-subtitle">
            नीचे अपनी समस्या पर टैप करें — हम तुरंत बता देंगे कि आपके लिए कौन सा उत्पाद सही रहेगा।
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
            <p className="problem-picker__result-eyebrow">आपके लिए सुझाव</p>
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
                अभी ऑर्डर करें
                <FiArrowRight />
              </a>
              <a href={current.target} className="btn btn--outline btn--lg">
                विस्तार से देखें
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
