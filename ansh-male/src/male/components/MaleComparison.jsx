import { FiCheck, FiMinus, FiArrowRight } from 'react-icons/fi';
import { maleComparison } from '../maleConfig.js';
import '../../components/Comparison/Comparison.css';

// सेवा-विशेषताओं की तुलना — कोई चिकित्सीय दावा नहीं।
const rows = maleComparison;

export default function MaleComparison() {
  return (
    <section className="comparison section" id="comparison">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">सही चुनाव की तुलना</p>
          <h2 className="section-title">Ansh Ayurveda For Men बनाम सामान्य ऑनलाइन सप्लीमेंट</h2>
          <p className="section-subtitle">
            खरीदने से पहले यह जान लें कि आपको क्या मिलता है — स्पष्ट जानकारी, पूरा कोर्स और
            भरोसेमंद सहायता।
          </p>
        </div>

        <div className="comparison__wrap" data-reveal="zoom">
          <table className="comparison__table">
            <caption className="sr-only">
              Ansh Ayurveda For Men और सामान्य ऑनलाइन सप्लीमेंट की सेवा-विशेषताओं की तुलना
            </caption>
            <thead>
              <tr>
                <th scope="col">विशेषता</th>
                <th scope="col" className="comparison__ours-head">
                  <span className="comparison__brand">Ansh Ayurveda For Men</span>
                  <em>हमारी खासियत</em>
                </th>
                <th scope="col">सामान्य ऑनलाइन सप्लीमेंट</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  <td className="comparison__ours-cell">
                    <span className="comparison__tick" aria-hidden="true">
                      <FiCheck />
                    </span>
                    {row.ours}
                  </td>
                  <td className="comparison__theirs-cell">
                    <span className="comparison__dash" aria-hidden="true">
                      <FiMinus />
                    </span>
                    {row.theirs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="comparison__note">
          ध्यान दें: यह तुलना सामान्य बाज़ार विकल्पों की सेवा-विशेषताओं को समझाने के लिए है; यह किसी
          चिकित्सीय दावे या इलाज की गारंटी नहीं है।
        </p>

        <div className="comparison__cta" data-reveal>
          <a href="#order" className="btn btn--primary btn--lg">
            अपना कोर्स चुनें
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
