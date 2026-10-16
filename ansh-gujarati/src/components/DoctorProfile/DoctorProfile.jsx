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
  { icon: <FiAward />, label: 'અનુભવ', value: doctor.experience },
  { icon: <FiBookOpen />, label: 'શૈક્ષણિક યોગ્યતા', value: doctor.qualification },
  { icon: <FiHeart />, label: 'ખાસ રુચિ', value: doctor.specialty },
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
            {doctor.experience} નો અનુભવ
          </span>
        </div>

        <div className="doctor__content" data-reveal="right">
          <p className="eyebrow">અમારા આયુર્વેદ નિષ્ણાત</p>
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
            {doctor.name} નો ઉદ્દેશ લોકોને આયુર્વેદ, સ્વસ્થ જીવનશૈલી અને પ્રજનન સ્વાસ્થ્ય સાથે જોડાયેલી
            સાચી માહિતી પ્રદાન કરવાનો છે. Ansh Ayurveda ના માધ્યમથી પુરુષો અને મહિલાઓને તેમની
            સ્વાસ્થ્ય સંબંધી ચિંતાઓ સમજવા, યોગ્ય સલાહ મેળવવા અને ઉપલબ્ધ વિકલ્પો વિશે
            જાગૃત થવામાં સહાય કરવામાં આવે છે.
          </p>
          <p className="doctor__text">
            જો તમે લાંબા સમયથી સંતાન પ્રાપ્તિ માટે પ્રયાસ કરી રહ્યા છો, પુરુષોમાં શુક્રાણુની
            સંખ્યા કે ગુણવત્તા અંગે ચિંતિત છો, અથવા મહિલાઓમાં માસિક ધર્મ અનિયમિત છે, તો તમારી
            સ્થિતિ મુજબ યોગ્ય તબીબની સલાહ લો.
          </p>

          <p className="doctor__note">
            <FiCheckCircle aria-hidden="true" />
            <span>
              Ansh Ayurveda — સાચી માહિતી, વ્યક્તિગત માર્ગદર્શન અને સારા સ્વાસ્થ્યની દિશામાં એક
              પગલું.
            </span>
          </p>

          <div className="doctor__actions">
            <a
              href={telHref}
              className="btn btn--primary btn--lg"
              onClick={() => trackLead('phone')}
            >
              <FaPhoneAlt aria-hidden="true" />
              ડૉક્ટર સાથે વાત કરવા માટે ડાયલ કરો
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn--outline btn--lg"
              onClick={() => trackLead('whatsapp')}
            >
              <FaWhatsapp aria-hidden="true" />
              WhatsApp પર વાત કરો
            </a>
          </div>

          <a
            href={telHref}
            className="doctor__number"
            onClick={() => trackLead('phone')}
          >
            <span>સીધી વાત કરવા માટે:</span>
            <strong>{contact.phone}</strong>
          </a>
        </div>
      </div>
    </section>
  );
}
