import { FiCheck, FiMinus, FiArrowRight } from 'react-icons/fi';
import './Comparison.css';

// यह तुलना सेवा-विशेषताओं (कोर्स, गारंटी, सहायता) पर आधारित है —
// किसी चिकित्सीय दावे के लिए नहीं।
const rows = [
  { feature: 'પૂરો કોર્સ એકસાથે (2 મહિના)', ours: 'હા — કોર્સ આધારિત સારવાર', theirs: 'સામાન્ય રીતે ફક્ત એક બોટલ' },
  { feature: 'પુરુષ અને મહિલા — અલગ ફોર્મ્યુલા', ours: 'બંને માટે અલગ ઉત્પાદન', theirs: 'એક જ સપ્લિમેન્ટ' },
  { feature: 'પૈસા પાછા મળવાની ગેરંટી', ours: 'હા — નક્કી નિયમો મુજબ', theirs: 'સામાન્ય રીતે ઉપલબ્ધ નથી' },
  { feature: 'સહાય ટીમ સાથે સીધી વાત', ours: 'ફોન અને WhatsApp પર ઉપલબ્ધ', theirs: 'મર્યાદિત સહાય' },
  { feature: 'સત્યાપિત ગ્રાહક અનુભવ', ours: '3000+ પરિવારોનો વિશ્વાસ', theirs: 'મિશ્ર માહિતી' },
  { feature: 'સુરક્ષિત અને ખાનગી ડિલિવરી', ours: 'ડિસ્ક્રીટ પેકિંગ', theirs: 'પેકિંગ સ્પષ્ટ નથી' },
];

export default function Comparison() {
  return (
    <section className="comparison section" id="comparison">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">યોગ્ય પસંદગીની તુલના</p>
          <h2 className="section-title">અન્શ આયુર્વેદ સામે સામાન્ય ઓનલાઇન સપ્લિમેન્ટ</h2>
          <p className="section-subtitle">
            ખરીદતા પહેલા જાણી લો કે તમને શું મળે છે — સ્પષ્ટ માહિતી, પૂરો કોર્સ અને વિશ્વાસપાત્ર
            સહાય.
          </p>
        </div>

        <div className="comparison__wrap" data-reveal="zoom">
          <table className="comparison__table">
            <caption className="sr-only">
              અન્શ આયુર્વેદ અને સામાન્ય ઓનલાઇન સપ્લિમેન્ટની સેવા-વિશેષતાઓની તુલના
            </caption>
            <thead>
              <tr>
                <th scope="col">વિશેષતા</th>
                <th scope="col" className="comparison__ours-head">
                  <span className="comparison__brand">Ansh Ayurveda</span>
                  <em>અમારી ખાસિયત</em>
                </th>
                <th scope="col">સામાન્ય ઓનલાઇન સપ્લિમેન્ટ</th>
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
          ધ્યાન આપો: આ તુલના સામાન્ય બજાર વિકલ્પોની સેવા-વિશેષતાઓ સમજાવવા માટે છે; આ કોઈ
          ચિકિત્સીય દાવો કે સારવારની ગેરંટી નથી.
        </p>

        <div className="comparison__cta" data-reveal>
          <a href="#order" className="btn btn--primary btn--lg">
            તમારો કોર્સ પસંદ કરો
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
