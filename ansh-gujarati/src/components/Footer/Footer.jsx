import assets from '../../data/assets.js';
import siteConfig from '../../data/siteConfig.js';
import './Footer.css';

const columns = [
  {
    title: 'ઉત્પાદન',
    links: [
      { label: 'પુરુષો માટે', href: '#men' },
      { label: 'મહિલાઓ માટે', href: '#women' },
      { label: 'હમણાં ઓર્ડર કરો', href: '#order' },
    ],
  },
  {
    title: 'સહાય',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'ગ્રાહક સમીક્ષાઓ', href: '#reviews' },
      { label: 'સંપર્ક કરો', href: '#contact' },
    ],
  },
  {
    title: 'કાનૂની',
    links: [
      { label: 'ગોપનીયતા નીતિ', href: '#privacy' },
      { label: 'નિયમો અને શરતો', href: '#terms' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand" data-reveal>
          <img src={assets.logo} alt="Ansh Ayurveda Natural Wellness લોગો" />
          <p>
            Ansh Ayurveda — કુદરતી આયુર્વેદિક વેલનેસ. પુરુષો અને મહિલાઓ માટે તૈયાર ઉત્પાદનોની
            પારદર્શક માહિતી.
          </p>
        </div>

        {columns.map((col, index) => (
          <div className="footer__col" key={col.title} data-reveal data-reveal-delay={(index + 1) * 80}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((link) => (
                <li key={`${col.title}-${link.href}`}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__col" data-reveal data-reveal-delay={(columns.length + 1) * 80}>
          <h3>સંપર્ક</h3>
          <ul>
            {contact.phone && <li>{contact.phone}</li>}
            {contact.email && <li>{contact.email}</li>}
            {contact.address && <li>{contact.address}</li>}
            {!contact.phone && !contact.email && !contact.address && (
              <li className="footer__muted">માહિતી જલદી ઉપલબ્ધ થશે</li>
            )}
          </ul>
        </div>
      </div>

      <div className="container footer__legal">
        <div className="footer__legal-block" id="privacy" data-reveal>
          <h3>ગોપનીયતા નીતિ</h3>
          <p>ગોપનીયતા નીતિની વિગતવાર માહિતી જલદી ઉપલબ્ધ કરાવવામાં આવશે.</p>
        </div>
        <div className="footer__legal-block" id="terms" data-reveal data-reveal-delay="90">
          <h3>નિયમો અને શરતો</h3>
          <p>નિયમો અને શરતોની વિગતવાર માહિતી જલદી ઉપલબ્ધ કરાવવામાં આવશે.</p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner" data-reveal>
          <span>© {year} Ansh Ayurveda. સર્વ હક અધિકાર સાચવેલા.</span>
          <div className="footer__legal-links">
            <a href="#privacy">ગોપનીયતા નીતિ</a>
            <a href="#terms">નિયમો અને શરતો</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
