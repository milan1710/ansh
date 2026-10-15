import { FiCheck, FiMinus, FiArrowRight } from 'react-icons/fi';
import './Comparison.css';

// यह तुलना सेवा-विशेषताओं (कोर्स, गारंटी, सहायता) पर आधारित है —
// किसी चिकित्सीय दावे के लिए नहीं।
const rows = [
  { feature: 'पूरा कोर्स एक साथ (2 महीने)', ours: 'हाँ — कोर्स आधारित इलाज', theirs: 'आमतौर पर सिर्फ़ अकेली बोतल' },
  { feature: 'पुरुष व महिला — अलग फ़ॉर्मूला', ours: 'दोनों के लिए अलग उत्पाद', theirs: 'एक ही सप्लीमेंट' },
  { feature: 'पैसे वापस की गारंटी', ours: 'हाँ — तय नियमों के अनुसार', theirs: 'सामान्यतः उपलब्ध नहीं' },
  { feature: 'सहायता टीम से सीधी बात', ours: 'फ़ोन व WhatsApp पर उपलब्ध', theirs: 'सीमित सहायता' },
  { feature: 'सत्यापित ग्राहक अनुभव', ours: '3000+ परिवारों का भरोसा', theirs: 'मिली-जुली जानकारी' },
  { feature: 'सुरक्षित और निजी डिलीवरी', ours: 'डिस्क्रीट पैकिंग', theirs: 'पैकिंग स्पष्ट नहीं' },
];

export default function Comparison() {
  return (
    <section className="comparison section" id="comparison">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">सही चुनाव की तुलना</p>
          <h2 className="section-title">अन्श आयुर्वेद बनाम सामान्य ऑनलाइन सप्लीमेंट</h2>
          <p className="section-subtitle">
            खरीदने से पहले यह जान लें कि आपको क्या मिलता है — स्पष्ट जानकारी, पूरा कोर्स और भरोसेमंद
            सहायता।
          </p>
        </div>

        <div className="comparison__wrap" data-reveal="zoom">
          <table className="comparison__table">
            <caption className="sr-only">
              अन्श आयुर्वेद और सामान्य ऑनलाइन सप्लीमेंट की सेवा-विशेषताओं की तुलना
            </caption>
            <thead>
              <tr>
                <th scope="col">विशेषता</th>
                <th scope="col" className="comparison__ours-head">
                  <span className="comparison__brand">Ansh Ayurveda</span>
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
