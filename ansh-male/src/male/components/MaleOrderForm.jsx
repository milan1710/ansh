import { useEffect, useRef, useState } from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import {
  FiAward,
  FiLock,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiUserCheck,
} from 'react-icons/fi';
import Countdown from '../../components/Countdown/Countdown.jsx';
import siteConfig from '../../data/siteConfig.js';
import { maleForm, maleProduct } from '../maleConfig.js';
import { trackEvent } from '../../lib/pixel.js';
import '../../components/OrderForm/OrderForm.css';

// ---- CRM फ़ॉर्म का विवरण (मौजूदा साइट वाला ही, ताकि ऑर्डर सीधे CRM में पहुँचे) ----
const FORM_ACTION = maleForm.action;
const CSRF_TOKEN = maleForm.csrfToken;
const FORM_KEY = maleForm.formKey;
const REDIRECT_PATH = maleForm.redirectUrl;

// CRM अलग डोमेन पर है — वापसी का पता पूरा (absolute) होना ज़रूरी है, वरना
// ब्राउज़र CRM के ही डोमेन पर thank-you पेज ढूँढेगा और Lead ट्रैक नहीं होगा।
function absoluteRedirectUrl() {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return `${window.location.origin}${REDIRECT_PATH}`;
  }
  return REDIRECT_PATH;
}

// कोर्स के पैक — 1 बोतल = 1 महीना।
const packs = [
  { id: 1, label: '1 महीना', price: 1499 },
  { id: 2, label: '2 महीने', price: 2799 },
  { id: 3, label: '3 महीने', price: 3999 },
];

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
    title: '100% आयुर्वेदिक',
    text: '17 जड़ी-बूटियों का शुद्ध मिश्रण',
  },
  {
    icon: <FiAward aria-hidden="true" />,
    title: 'मनी बैक गारंटी',
    text: 'तय नियमों एवं शर्तों के अनुसार',
  },
  {
    icon: <FiTruck aria-hidden="true" />,
    title: 'डिस्क्रीट डिलीवरी',
    text: 'पूरे भारत में निजी पैकिंग',
  },
  {
    icon: <FiUserCheck aria-hidden="true" />,
    title: `${siteConfig.doctor.experience} का अनुभव`,
    text: 'आयुर्वेद विशेषज्ञ का मार्गदर्शन',
  },
];

export default function MaleOrderForm() {
  const ipRef = useRef('');
  const ipInputRef = useRef(null);
  const deviceInputRef = useRef(null);
  const redirectInputRef = useRef(null);
  const [packId, setPackId] = useState(1);

  const pack = packs.find((item) => item.id === packId) ?? packs[0];

  // IP, शहर और डिवाइस की जानकारी भरें।
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

  // एक ही IP से 24 घंटे में दोबारा सबमिट रोकें।
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
        alert('आप पहले ही फॉर्म सबमिट कर चुके हैं। कृपया बाद में कोशिश करें।');
        window.location.href = absoluteRedirectUrl();
        return;
      }
    }

    if (ip) {
      storedData[ip] = currentTime;
      try {
        localStorage.setItem('formSubmissions', JSON.stringify(storedData));
      } catch {
        // localStorage उपलब्ध न हो तो चुपचाप आगे बढ़ें।
      }
    }

    // Facebook Pixel — बिक्री (sales) गिनने के लिए Purchase इवेंट। यह सिर्फ़
    // /ansh-male वेबसाइट पर भेजा जाता है (Pixel ID .env की VITE_FB_PIXEL_ID से आता है)।
    trackEvent('Purchase', {
      value: pack.price,
      currency: 'INR',
      content_name: `Ansh Ayurveda For Men — ${pack.label}`,
      content_type: 'product',
    });
  };

  const { contact } = siteConfig;
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`;
  const waMessage = encodeURIComponent(
    'नमस्ते अन्श आयुर्वेद, मुझे पुरुषों के कोर्स के बारे में जानकारी चाहिए।'
  );
  const waHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${waMessage}`;

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
          <p className="eyebrow order-form__eyebrow">सीमित समय का ऑफ़र</p>
          <h2 className="section-title">अभी ऑर्डर करें</h2>
          <p className="section-subtitle">
            नीचे फ़ॉर्म भरने में सिर्फ़ 30 सेकंड लगेंगे। सबमिट करते ही हमारी टीम जल्द ही आपसे संपर्क
            करेगी। पूरी जानकारी और पैकिंग निजी रहेगी।
          </p>
        </div>

        <div className="order-form__card" data-reveal="zoom">
          <div className="order-form__urgency">
            <span className="order-form__badge">
              <FiShoppingBag aria-hidden="true" />
              1 महीने का कोर्स · ₹1499
            </span>
            <Countdown label="ऑफ़र समाप्त होने में" />
          </div>

          <div className="order-form__body">
            <form
              action={FORM_ACTION}
              method="post"
              encType="multipart/form-data"
              acceptCharset="utf-8"
              id="maleOrderForm"
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

              {/* चुना गया कोर्स */}
              <input
                type="hidden"
                name="product"
                value={`Ansh Ayurveda For Men — ${pack.label} का कोर्स`}
                readOnly
              />
              <input type="hidden" name="price" value={pack.price} readOnly />

              <div className="order-form__field">
                <span className="offer__pack-label">कोर्स चुनें (1 बोतल = 1 महीना)</span>
                <div className="offer__pack-options">
                  {packs.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`offer__pack-option ${
                        item.id === packId ? 'offer__pack-option--active' : ''
                      }`}
                      aria-pressed={item.id === packId}
                      onClick={() => setPackId(item.id)}
                    >
                      <strong>{item.label}</strong>
                      <em>₹{item.price.toLocaleString('en-IN')}</em>
                    </button>
                  ))}
                </div>
              </div>

              <div className="order-form__field">
                <label htmlFor="male-name">पूरा नाम</label>
                <input
                  type="text"
                  id="male-name"
                  className="order-input"
                  name="name"
                  required
                  placeholder="अपना पूरा नाम लिखें"
                  autoComplete="name"
                />
              </div>

              <div className="order-form__field">
                <label htmlFor="male-number">फोन नंबर</label>
                <input
                  type="tel"
                  id="male-number"
                  className="order-input"
                  name="phonenumber"
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="सही 10 अंकों का मोबाइल नंबर दर्ज करें।"
                  placeholder="10 अंकों का मोबाइल नंबर"
                  inputMode="numeric"
                  autoComplete="tel-national"
                />
              </div>

              <div className="order-form__field">
                <label htmlFor="male-address">पूरा पता</label>
                <input
                  type="text"
                  id="male-address"
                  className="order-input"
                  name="address"
                  required
                  placeholder="मकान नंबर, गली, इलाका"
                  autoComplete="address-line1"
                />
              </div>

              <div className="order-form__row">
                <div className="order-form__field">
                  <label htmlFor="male-city">शहर</label>
                  <input
                    type="text"
                    id="male-city"
                    className="order-input"
                    name="city"
                    required
                    placeholder="अपना शहर लिखें"
                    autoComplete="address-level2"
                  />
                </div>

                <div className="order-form__field">
                  <label htmlFor="male-pincode">पिन कोड</label>
                  <input
                    type="text"
                    id="male-pincode"
                    className="order-input"
                    name="zip"
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    title="सही 6 अंकों का पिन कोड दर्ज करें।"
                    placeholder="6 अंकों का पिन कोड"
                    inputMode="numeric"
                    autoComplete="postal-code"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="submit-button order-form__submit btn btn--gold btn--lg btn--block"
              >
                <FiShoppingBag aria-hidden="true" />
                ऑर्डर करें — ₹{pack.price.toLocaleString('en-IN')}
              </button>

              <p className="order-form__note">
                <FiLock aria-hidden="true" />
                आपकी जानकारी पूरी तरह सुरक्षित और निजी है। सबमिट के बाद आपको धन्यवाद पेज मिलेगा।
              </p>
            </form>

            <aside className="order-form__side">
              <h3 className="order-form__side-title">क्यों Ansh Ayurveda For Men?</h3>

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
                  फ़ॉर्म भरने में दिक्कत हो रही है? तुरंत हमसे जुड़ें —
                </p>
                <div className="order-form__cta-row">
                  <a
                    href={telHref}
                    className="order-form__cta-btn order-form__cta-btn--call"
                    onClick={() => trackLead('phone')}
                  >
                    <FaPhoneAlt aria-hidden="true" />
                    कॉल करें
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
