import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { FiAward, FiBookOpen, FiCheckCircle, FiHeart, FiUserCheck } from 'react-icons/fi';
import assets from '../../data/assets.js';
import siteConfig from '../../data/siteConfig.js';
import { trackEvent } from '../../lib/pixel.js';
import '../../components/DoctorProfile/DoctorProfile.css';

const { doctor, contact } = siteConfig;

const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`;
const waHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`;

const credentials = [
  { icon: <FiAward aria-hidden="true" />, label: 'अनुभव', value: doctor.experience },
  { icon: <FiBookOpen aria-hidden="true" />, label: 'शैक्षणिक योग्यता', value: doctor.qualification },
  { icon: <FiHeart aria-hidden="true" />, label: 'विशेष रुचि', value: 'पुरुष प्रजनन व मर्दाना स्वास्थ्य' },
];

const trackLead = (method) => {
  trackEvent('Contact', { method });
  trackEvent('Lead', { method });
};

export default function MaleDoctor() {
  return (
    <section className="doctor section" id="doctor">
      <div className="container doctor__grid">
        <div className="doctor__media" data-reveal="left">
          <div className="doctor__frame">
            <img src={assets.doctor} alt={`${doctor.name} — ${doctor.role}`} loading="lazy" />
          </div>
          <span className="doctor__badge">
            <FiUserCheck aria-hidden="true" />
            {doctor.experience} का अनुभव
          </span>
        </div>

        <div className="doctor__content" data-reveal="right">
          <p className="eyebrow">हमारे आयुर्वेद विशेषज्ञ</p>
          <h2 className="doctor__name">{doctor.name}</h2>
          <p className="doctor__role">{doctor.role}</p>

          <ul className="doctor__credentials">
            {credentials.map((item) => (
              <li key={item.label}>
                <span className="doctor__cred-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="doctor__cred-text">
                  <strong>{item.label}</strong>
                  <em>{item.value}</em>
                </span>
              </li>
            ))}
          </ul>

          <h3 className="doctor__headline">पुरुषों के स्वास्थ्य की दिशा में सही मार्गदर्शन</h3>
          <p className="doctor__text">
            {doctor.name} का उद्देश्य पुरुषों को आयुर्वेद, स्वस्थ जीवनशैली और मर्दाना स्वास्थ्य से जुड़ी
            सही जानकारी प्रदान करना है। Ansh Ayurveda For Men के माध्यम से शुक्राणु की कमी,
            शीघ्रपतन, सेक्स टाइमिंग और कमजोरी जैसी चिंताओं को समझने तथा उचित सलाह प्राप्त करने में
            सहायता दी जाती है।
          </p>
          <p className="doctor__text">
            यदि आप लंबे समय से शुक्राणुओं की संख्या या गुणवत्ता को लेकर चिंतित हैं, शीघ्रपतन या सेक्स
            टाइमिंग की समस्या से परेशान हैं, या शरीर में लगातार कमजोरी महसूस करते हैं, तो अपनी स्थिति
            के अनुसार योग्य चिकित्सक से परामर्श लें।
          </p>

          <p className="doctor__note">
            <FiCheckCircle aria-hidden="true" />
            <span>
              Ansh Ayurveda — सही जानकारी, व्यक्तिगत मार्गदर्शन और बेहतर स्वास्थ्य की दिशा में एक
              कदम।
            </span>
          </p>

          <div className="doctor__actions">
            <a href={telHref} className="btn btn--primary btn--lg" onClick={() => trackLead('phone')}>
              <FaPhoneAlt aria-hidden="true" />
              डॉक्टर से बात करने के लिए डायल करें
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn--outline btn--lg"
              onClick={() => trackLead('whatsapp')}
            >
              <FaWhatsapp aria-hidden="true" />
              WhatsApp पर बात करें
            </a>
          </div>

          <a href={telHref} className="doctor__number" onClick={() => trackLead('phone')}>
            <span>सीधे बात करने के लिए:</span>
            <strong>{contact.phone}</strong>
          </a>
        </div>
      </div>
    </section>
  );
}
