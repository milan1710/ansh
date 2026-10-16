import { useState } from 'react';
import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { maleProblems, maleProduct } from '../maleConfig.js';
import '../../components/ProblemSelector/ProblemSelector.css';

// आइकन के नाम को असली आइकन से जोड़ता है।
const ICONS = {
  TrendingUp: <FiTrendingUp aria-hidden="true" />,
  Clock: <FiClock aria-hidden="true" />,
  Activity: <FiActivity aria-hidden="true" />,
  Heart: <FiHeart aria-hidden="true" />,
  Target: <FiTarget aria-hidden="true" />,
  Users: <FiUsers aria-hidden="true" />,
};

const resultPoints = [
  `${maleProduct.herbs} आयुर्वेदिक जड़ी-बूटियों का शुद्ध मिश्रण`,
  `${maleProduct.packSize} — रोज़ सुबह 1 टैबलेट`,
  'पैसे वापस की गारंटी के साथ',
];

export default function MaleProblems() {
  const [activeId, setActiveId] = useState(maleProblems[0].id);
  const current = maleProblems.find((problem) => problem.id === activeId) ?? maleProblems[0];

  return (
    <section
      className="problem-picker section"
      id="problems"
      aria-label="अपनी समस्या चुनकर सही कोर्स जानें"
    >
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">अपनी समस्या पहचानें</p>
          <h2 className="section-title">आप किस समस्या से परेशान हैं?</h2>
          <p className="section-subtitle">
            नीचे अपनी समस्या पर टैप करें — हम तुरंत बता देंगे कि Ansh Ayurveda For Men आपके लिए
            कैसे मददगार है।
          </p>
        </div>

        <div className="problem-picker__grid">
          <ul className="problem-picker__chips" data-reveal="left">
            {maleProblems.map((problem) => {
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
                    <span className="problem-picker__chip-icon">{ICONS[problem.icon]}</span>
                    <span className="problem-picker__chip-text">
                      <strong>{problem.label}</strong>
                      <em>{problem.english}</em>
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
            <h3 className="problem-picker__result-title">{maleProduct.name}</h3>
            <p className="problem-picker__result-note">{current.text}</p>

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
              <a href="#men" className="btn btn--outline btn--lg">
                कोर्स विस्तार से देखें
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
