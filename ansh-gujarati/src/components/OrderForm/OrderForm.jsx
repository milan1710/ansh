import { useEffect, useRef } from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import {
  FiAward,
  FiLock,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiUserCheck,
} from 'react-icons/fi';
import Countdown from '../Countdown/Countdown.jsx';
import siteConfig from '../../data/siteConfig.js';
import { trackEvent } from '../../lib/pixel.js';
import './OrderForm.css';

// ---- CRM फ़ॉर्म का विवरण (सिर्फ़ Gujarati वेबसाइट के लिए अलग फ़ॉर्म) ----
// ⚠️ `key` ठीक CRM फ़ॉर्म URL वाली key के बराबर होनी चाहिए, तभी લીડ CRM में दर्ज होती है।
const FORM_ACTION = 'https://crm.bhoomidhara.in/forms/wtl/972bb311e37b52777b969d7bd93137c2';
const CSRF_TOKEN = '972bb311e37b52777b969d7bd93137c2';
const FORM_KEY = '972bb311e37b52777b969d7bd93137c2';

// CRM दूसरे डोमेन पर है — वापसी का पता पूरा (absolute) होना ज़रूरी है।
const REDIRECT_PATH = '/ansh-gujarati/thankyou.html';

function absoluteRedirectUrl() {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return `${window.location.origin}${REDIRECT_PATH}`;
  }
  return REDIRECT_PATH;
}

// डिवाइस का प्रकार पहचानें (मूल कोड जैसा ही)।
function detectDevice() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'Android';
  if (/iPad|iPhone|iPod/.test(ua)) return 'iPhone/iPad';
  if (/tablet/i.test(ua)) return 'Tablet';
  if (/mobile/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

const trustPoints = [
  {
    icon: <FiShield aria-hidden="true" />,
    title: '100% આયુર્વેદિક',
    text: '17 જડીબુટ્ટીઓનું શુદ્ધ મિશ્રણ',
  },
  {
    icon: <FiAward aria-hidden="true" />,
    title: 'મની બેક ગેરંટી',
    text: 'નક્કી નિયમો અને શરતો મુજબ',
  },
  {
    icon: <FiTruck aria-hidden="true" />,
    title: 'સુરક્ષિત ડિલિવરી',
    text: 'આખા ભારતમાં ડિસ્ક્રીટ પેકિંગ',
  },
  {
    icon: <FiUserCheck aria-hidden="true" />,
    title: `${siteConfig.doctor.experience} નો અનુભવ`,
    text: 'આયુર્વેદ નિષ્ણાતનું માર્ગદર્શન',
  },
];

export default function OrderForm() {
  const ipRef = useRef('');
  const ipInputRef = useRef(null);
  const deviceInputRef = useRef(null);
  const redirectInputRef = useRef(null);

  // IP, शहर और डिवाइस की जानकारी भरें — मूल स्क्रिप्ट जैसा ही व्यवहार।
  useEffect(() => {
    let cancelled = false;

    // CRM को सबमिट के बाद का वापसी पता (पूरा URL) भेजें।
    if (redirectInputRef.current) {
      redirectInputRef.current.value = absoluteRedirectUrl();
    }

    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        ipRef.current = data && data.ip ? data.ip : '';
        if (ipInputRef.current) ipInputRef.current.value = ipRef.current;

        fetch(`https://ipinfo.io/${ipRef.current}/json?token=a6f2bf7eec9d73`)
          .then((res) => res.json())
          .then((location) => {
            if (cancelled) return;
            const city = (location && location.city) || 'Unknown';
            if (deviceInputRef.current) {
              deviceInputRef.current.value = `${detectDevice()}, ${city}`;
            }
          })
          .catch(() => {
            if (cancelled) return;
            if (deviceInputRef.current) {
              deviceInputRef.current.value = `${detectDevice()}, Unknown`;
            }
          });
      })
      .catch(() => {
        // IP न मिले तो भी फ़ॉर्म सामान्य रूप से भेजा जा सकता है।
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // एक ही IP से 24 घंटे में दोबारा सबमिट रोकें (मूल कोड जैसा ही)।
  const handleSubmit = (event) => {
    const currentTime = new Date().getTime();
    let storedData = {};
    try {
      storedData = JSON.parse(localStorage.getItem('formSubmissions')) || {};
    } catch {
      storedData = {};
    }

    const ip = ipRef.current;
    if (ip && storedData[ip]) {
      const diff = currentTime - storedData[ip];
      const hours = diff / (1000 * 60 * 60);

      if (hours < 24) {
        event.preventDefault();
        alert('તમે પહેલેથી ફોર્મ સબમિટ કરી ચૂક્યા છો. કૃપા કરીને પછી પ્રયાસ કરો.');
        window.location.href = absoluteRedirectUrl();
        return;
      }
    }

    // IP के साथ सबमिशन का समय सहेजें।
    if (ip) {
      storedData[ip] = currentTime;
      try {
        localStorage.setItem('formSubmissions', JSON.stringify(storedData));
      } catch {
        // localStorage उपलब्ध न हो तो चुपचाप आगे बढ़ें।
      }
    }
  };

  const { contact } = siteConfig;
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`;
  const waMessage = encodeURIComponent(
    'નમસ્તે અન્શ આયુર્વેદ, મને ઓર્ડર વિશે માહિતી જોઈએ છે.'
  );
  const waHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${waMessage}`;

  // कॉल / WhatsApp क्लिक भी Lead के रूप में गिना जाए।
  const trackLead = (method) => {
    trackEvent('Contact', { method });
    trackEvent('Lead', { method });
  };

  return (
    <section className="order-form section" id="order">
      <span className="order-form__blob order-form__blob--gold" aria-hidden="true" />
      <span className="order-form__blob order-form__blob--green" aria-hidden="true" />

      <div className="container">
        <div className="section-head order-form__head" data-reveal>
          <p className="eyebrow order-form__eyebrow">મર્યાદિત સમયની ઓફર</p>
          <h2 className="section-title">હમણાં ઓર્ડર કરો</h2>
          <p className="section-subtitle">
            નીચેનું ફોર્મ ભરવામાં ફક્ત 30 સેકન્ડ લાગશે. સબમિટ કરતાં જ અમારી ટીમ જલદી તમારો
            સંપર્ક કરશે.
          </p>
        </div>

        <div className="order-form__card" data-reveal="zoom">
          <div className="order-form__urgency">
            <span className="order-form__badge">
              <FiShoppingBag aria-hidden="true" />
              આજની ઓફર સક્રિય છે
            </span>
            <Countdown label="ઓફર પૂરી થવામાં" />
          </div>

          <div className="order-form__body">
            <form
              action={FORM_ACTION}
              method="post"
              encType="multipart/form-data"
              acceptCharset="utf-8"
              id="myForm"
              className="order-form__form"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="csrf_token_name" value={CSRF_TOKEN} readOnly />
              <input type="hidden" name="key" value={FORM_KEY} readOnly />
              <input
                type="hidden"
                name="websites"
                ref={redirectInputRef}
                defaultValue={REDIRECT_PATH}
              />

              {/* IP और डिवाइस की जानकारी के लिए छिपे फ़ील्ड */}
              <input type="hidden" name="email" id="ipAddress" ref={ipInputRef} />
              <input type="hidden" name="company" id="deviceDetails" ref={deviceInputRef} />

              <div className="order-form__field">
                <label htmlFor="order-name">પૂરું નામ</label>
                <input
                  type="text"
                  id="order-name"
                  className="order-input"
                  name="name"
                  required
                  placeholder="તમારું પૂરું નામ લખો"
                  autoComplete="name"
                />
              </div>

              <div className="order-form__field">
                <label htmlFor="order-number">ફોન નંબર</label>
                <input
                  type="tel"
                  id="order-number"
                  className="order-input"
                  name="phonenumber"
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="સાચો 10 આંકડાનો મોબાઇલ નંબર દાખલ કરો."
                  placeholder="10 આંકડાનો મોબાઇલ નંબર"
                  inputMode="numeric"
                  autoComplete="tel-national"
                />
              </div>

              <div className="order-form__field">
                <label htmlFor="order-address">પૂરું સરનામું</label>
                <input
                  type="text"
                  id="order-address"
                  className="order-input"
                  name="address"
                  required
                  placeholder="મકાન નંબર, શેરી, વિસ્તાર, શહેર, પિન કોડ"
                  autoComplete="street-address"
                />
              </div>

              <button
                type="submit"
                className="submit-button order-form__submit btn btn--gold btn--lg btn--block"
              >
                <FiShoppingBag aria-hidden="true" />
                ઓર્ડર કરો
              </button>

              <p className="order-form__note">
                <FiLock aria-hidden="true" />
                તમારી માહિતી સંપૂર્ણપણે સુરક્ષિત છે. સબમિટ પછી તમને આભાર પેજ મળશે.
              </p>
            </form>

            <aside className="order-form__side">
              <h3 className="order-form__side-title">Ansh Ayurveda કેમ?</h3>

              <ul className="order-form__trust">
                {trustPoints.map((point) => (
                  <li key={point.title}>
                    {point.icon}
                    <span>
                      <strong>{point.title}</strong>
                      <em>{point.text}</em>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="order-form__cta">
                <p className="order-form__cta-text">
                  ફોર્મ ભરવામાં તકલીફ થાય છે? તરત અમારો સંપર્ક કરો —
                </p>
                <div className="order-form__cta-row">
                  <a
                    href={telHref}
                    className="order-form__cta-btn order-form__cta-btn--call"
                    onClick={() => trackLead('phone')}
                  >
                    <FaPhoneAlt aria-hidden="true" />
                    કૉલ કરો
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="order-form__cta-btn order-form__cta-btn--wa"
                    onClick={() => trackLead('whatsapp')}
                  >
                    <FaWhatsapp aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

