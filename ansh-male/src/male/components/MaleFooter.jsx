import assets from '../../data/assets.js';
import siteConfig from '../../data/siteConfig.js';
import '../../components/Footer/Footer.css';

const columns = [
  {
    title: 'उत्पाद',
    links: [
      { label: 'पुरुषों का कोर्स', href: '#men' },
      { label: 'समस्याएँ', href: '#problems' },
      { label: 'अभी ऑर्डर करें', href: '#order' },
    ],
  },
  {
    title: 'सहायता',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'ग्राहक समीक्षाएँ', href: '#reviews' },
      { label: 'संपर्क करें', href: '#contact' },
    ],
  },
  {
    title: 'कानूनी',
    links: [
      { label: 'गोपनीयता नीति', href: '#privacy' },
      { label: 'नियम और शर्तें', href: '#terms' },
    ],
  },
];

export default function MaleFooter() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand" data-reveal>
          <img src={assets.logo} alt="Ansh Ayurveda Natural Wellness लोगो" />
          <p>
            Ansh Ayurveda For Men — पुरुषों के लिए प्राकृतिक आयुर्वेदिक कोर्स। शुक्राणु की कमी,
            शीघ्रपतन, सेक्स टाइमिंग और कमजोरी के लिए भरोसेमंद जानकारी।
          </p>
        </div>

        {columns.map((col, index) => (
          <div
            className="footer__col"
            key={col.title}
            data-reveal
            data-reveal-delay={(index + 1) * 80}
          >
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
          <h3>संपर्क</h3>
          <ul>
            {contact.phone && <li>{contact.phone}</li>}
            {contact.email && <li>{contact.email}</li>}
            {contact.address && <li>{contact.address}</li>}
            {!contact.phone && !contact.email && !contact.address && (
              <li className="footer__muted">जानकारी शीघ्र उपलब्ध होगी</li>
            )}
          </ul>
        </div>
      </div>

      <div className="container footer__legal">
        <div className="footer__legal-block" id="privacy" data-reveal>
          <h3>गोपनीयता नीति</h3>
          <p>
            आपकी सारी जानकारी पूरी तरह निजी रहती है और किसी तीसरे पक्ष के साथ साझा नहीं की जाती।
          </p>
        </div>
        <div className="footer__legal-block" id="terms" data-reveal data-reveal-delay="90">
          <h3>नियम और शर्तें</h3>
          <p>
            मनी बैक गारंटी तय नियमों एवं शर्तों के अनुसार लागू होती है। पूरी जानकारी टीम से प्राप्त करें।
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner" data-reveal>
          <span>© {year} Ansh Ayurveda. सर्वाधिकार सुरक्षित।</span>
          <div className="footer__legal-links">
            <a href="#privacy">गोपनीयता नीति</a>
            <a href="#terms">नियम और शर्तें</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
