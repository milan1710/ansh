import { FiShoppingBag, FiEdit, FiCheckCircle } from 'react-icons/fi';
import './HowItWorks.css';

const steps = [
  {
    icon: <FiShoppingBag />,
    title: 'अपना उत्पाद चुनें',
    text: 'पुरुषों या महिलाओं के लिए उपयुक्त उत्पाद का चयन करें।',
  },
  {
    icon: <FiEdit />,
    title: 'अपनी जानकारी भरें',
    text: 'नीचे दिए गए फॉर्म में अपनी आवश्यक जानकारी दर्ज करें।',
  },
  {
    icon: <FiCheckCircle />,
    title: 'जानकारी की समीक्षा करें',
    text: 'भरी गई जानकारी की पुष्टि करें और फॉर्म पूरा करें।',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">कैसे काम करता है</p>
          <h2 className="section-title">सिर्फ तीन आसान चरण</h2>
        </div>

        <ol className="how-it-works__steps">
          {steps.map((step, index) => (
            <li
              className="how-it-works__step"
              key={step.title}
              data-reveal
              data-reveal-delay={index * 90}
            >
              <span className="how-it-works__number">{index + 1}</span>
              <span className="how-it-works__icon">{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="how-it-works__cta">
          <a href="#order" className="btn btn--gold btn--lg">
            अभी फॉर्म भरें
          </a>
        </div>
      </div>
    </section>
  );
}
