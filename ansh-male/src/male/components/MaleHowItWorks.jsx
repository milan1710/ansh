import { FiShoppingBag, FiEdit, FiCheckCircle } from 'react-icons/fi';
import '../../components/HowItWorks/HowItWorks.css';

const steps = [
  {
    icon: <FiShoppingBag aria-hidden="true" />,
    title: 'कोर्स चुनें',
    text: 'पुरुषों के लिए बना 1 महीने का आयुर्वेदिक कोर्स चुनें — सिर्फ़ ₹1499।',
  },
  {
    icon: <FiEdit aria-hidden="true" />,
    title: 'जानकारी भरें',
    text: 'नीचे फ़ॉर्म में अपना नाम, पता, शहर और पिन कोड भरें।',
  },
  {
    icon: <FiCheckCircle aria-hidden="true" />,
    title: 'घर पर कोर्स पाएँ',
    text: 'डिस्क्रीट पैकिंग में कोर्स आपके घर पहुँचेगा और टीम आपसे संपर्क करेगी।',
  },
];

export default function MaleHowItWorks() {
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
