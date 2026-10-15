import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import {
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiHeart,
  FiUserCheck,
} from 'react-icons/fi';
import assets from '../../data/assets.js';
import siteConfig from '../../data/siteConfig.js';
import { trackEvent } from '../../lib/pixel.js';
import './DoctorProfile.css';

const { doctor, contact } = siteConfig;

const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`;
const waHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`;

const credentials = [
  { icon: <FiAward />, label: 'अनुभव', value: doctor.experience },
  { icon: <FiBookOpen />, label: 'शैक्षणिक योग्यता', value: doctor.qualification },
  { icon: <FiHeart />, label: 'विशेष रुचि', value: doctor.specialty },
];

// कॉल / WhatsApp क्लिक भी Lead के रूप में गिना जाए।
const trackLead = (method) => {
  trackEvent('Contact', { method });
  trackEvent('Lead', { method });
};

export default function DoctorProfile() {
  return (
    <section className="doctor section" id="doctor">
      <div className="container doctor__grid">
        <div className="doctor__media" data-reveal="left">
          <div className="doctor__frame">
            <img
              src={assets.doctor}
              alt={`${doctor.name} — ${doctor.role}`}
              loading="lazy"
            />
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

          <h3 className="doctor__headline">{doctor.headline}</h3>
          <p className="doctor__text">
            {doctor.name} का उद्देश्य लोगों को आयुर्वेद, स्वस्थ जीवनशैली और प्रजनन स्वास्थ्य से जुड़ी
            सही जानकारी प्रदान करना है। Ansh Ayurveda के माध्यम से पुरुषों और महिलाओं को उनकी
            स्वास्थ्य संबंधी चिंताओं को समझने, उचित सलाह प्राप्त करने और उपलब्ध विकल्पों के बारे में
            जागरूक होने में सहायता दी जाती है।
          </p>
          <p className="doctor__text">
            यदि आप लंबे समय से संतान प्राप्ति के लिए प्रयास कर रहे हैं, पुरुषों में शुक्राणुओं की
            संख्या या गुणवत्ता को लेकर चिंतित हैं, अथवा महिलाओं में मासिक धर्म अनियमित है, तो अपनी
            स्थिति के अनुसार योग्य चिकित्सक से परामर्श लें।
          </p>

          <p className="doctor__note">
            <FiCheckCircle aria-hidden="true" />
            <span>
              Ansh Ayurveda — सही जानकारी, व्यक्तिगत मार्गदर्शन और बेहतर स्वास्थ्य की दिशा में एक
              कदम।
            </span>
          </p>

          <div className="doctor__actions">
            <a
              href={telHref}
              className="btn btn--primary btn--lg"
              onClick={() => trackLead('phone')}
            >
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

          <a
            href={telHref}
            className="doctor__number"
            onClick={() => trackLead('phone')}
          >
            <span>सीधे बात करने के लिए:</span>
            <strong>{contact.phone}</strong>
          </a>
        </div>
      </div>
    </section>
  );
}
