import { FiAward, FiFeather, FiShield, FiUsers } from 'react-icons/fi';
import useInView from '../../hooks/useInView.js';
import useCountUp from '../../hooks/useCountUp.js';
import '../../components/StatsStrip/StatsStrip.css';

// पुरुषों की वेबसाइट के आँकड़े — वही जो मौजूदा साइट पर बताए गए हैं।
const stats = [
  {
    icon: <FiUsers aria-hidden="true" />,
    value: 3000,
    suffix: '+',
    label: 'संतुष्ट पुरुष',
    note: 'पूरे भारत से',
  },
  {
    icon: <FiAward aria-hidden="true" />,
    value: 22,
    suffix: '+',
    label: 'वर्षों का अनुभव',
    note: 'आयुर्वेदिक विशेषज्ञ',
  },
  {
    icon: <FiFeather aria-hidden="true" />,
    value: 17,
    suffix: '',
    label: 'जड़ी-बूटियों का मिश्रण',
    note: 'प्राकृतिक तरीका',
  },
  {
    icon: <FiShield aria-hidden="true" />,
    value: 100,
    suffix: '%',
    label: 'मनी बैक गारंटी',
    note: 'तय नियमों के अनुसार',
  },
];

function Stat({ stat, index }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const value = useCountUp(stat.value, inView);

  return (
    <li className="stats__item" ref={ref} data-reveal data-reveal-delay={index * 90}>
      <span className="stats__icon">{stat.icon}</span>
      <strong className="stats__value">
        {value.toLocaleString('en-IN')}
        <em>{stat.suffix}</em>
      </strong>
      <span className="stats__label">{stat.label}</span>
      <span className="stats__note">{stat.note}</span>
    </li>
  );
}

export default function MaleStats() {
  return (
    <section className="stats" id="why-us" aria-label="अन्श आयुर्वेद के आँकड़े">
      <div className="container">
        <ul className="stats__list">
          {stats.map((stat, index) => (
            <Stat key={stat.label} stat={stat} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
