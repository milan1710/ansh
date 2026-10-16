import { FiShoppingBag, FiEdit, FiCheckCircle } from 'react-icons/fi';
import './HowItWorks.css';

const steps = [
  {
    icon: <FiShoppingBag />,
    title: 'તમારું ઉત્પાદન પસંદ કરો',
    text: 'પુરુષો કે મહિલાઓ માટે યોગ્ય ઉત્પાદન પસંદ કરો.',
  },
  {
    icon: <FiEdit />,
    title: 'તમારી માહિતી ભરો',
    text: 'નીચે આપેલા ફોર્મમાં તમારી જરૂરી માહિતી દાખલ કરો.',
  },
  {
    icon: <FiCheckCircle />,
    title: 'માહિતીની સમીક્ષા કરો',
    text: 'ભરેલી માહિતીની પુષ્ટિ કરો અને ફોર્મ પૂર્ણ કરો.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">કેવી રીતે કામ કરે છે</p>
          <h2 className="section-title">ફક્ત ત્રણ સરળ પગલાં</h2>
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
            હમણાં ફોર્મ ભરો
          </a>
        </div>
      </div>
    </section>
  );
}
