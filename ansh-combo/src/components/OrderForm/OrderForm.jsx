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
import products from '../../data/products.js';
import { trackEvent } from '../../lib/pixel.js';
import {
  createEventId,
  rememberLeadEvent,
  clearRememberedLeadEvent,
  sendLeadIntent,
} from '../../lib/metaLead.js';
import './OrderForm.css';

// ---- CRM फ़ॉर्म का विवरण ----
// ⚠️ `key` ठीक उसी फ़ॉर्म-की के बराबर होनी चाहिए जो CRM फ़ॉर्म URL में दिखती है, तभी लीड दर्ज होती है।
// पहले यहाँ गलत key थी (0a4560...), जिससे सबमिट होने पर भी CRM में कुछ दर्ज नहीं होता था।
const FORM_ACTION = 'https://crm.bhoomidhara.in/forms/wtl/7818ad781e72739e372c114f14f21a16';
const CSRF_TOKEN = '7818ad781e72739e372c114f14f21a16';
const FORM_KEY = '7818ad781e72739e372c114f14f21a16';

// सबमिट के बाद CRM इसी पते पर वापस भेजता है। CRM अलग डोमेन पर है, इसलिए यह पूरा (absolute)
// पता होना ज़रूरी है — वरना ब्राउज़र CRM के ही डोमेन पर thank-you पेज ढूँढेगा और Lead ट्रैक नहीं होगा।
const REDIRECT_PATH = '/ansh-combo/thankyou.html';

function absoluteRedirectUrl() {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return `${window.location.origin}${REDIRECT_PATH}`;
  }
  return REDIRECT_PATH;
}

// Thank-you पेज को सिर्फ़ एक non-sensitive event_id भेजा जाता है — कोई email,
// फ़ोन या token URL में नहीं जाता। बाकी पहचान (hashed) server पर रहती है।
function redirectUrlForEvent(eventId) {
  const base = absoluteRedirectUrl();
  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}eid=${encodeURIComponent(eventId)}`;
}

const combo = products.combo;

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
    title: 'सुरक्षित डिलीवरी',
    text: 'पूरे भारत में डिस्क्रीट पैकिंग',
  },
  {
    icon: <FiUserCheck aria-hidden="true" />,
    title: `${siteConfig.doctor.experience} का अनुभव`,
    text: 'आयुर्वेद विशेषज्ञ का मार्गदर्शन',
  },
];

export default function OrderForm() {
  const ipRef = useRef('');
  const ipInputRef = useRef(null);
  const deviceInputRef = useRef(null);
  const redirectInputRef = useRef(null);
  // हर फ़ॉर्म-लोड के लिए एक ही unique conversion event_id।
  const eventIdRef = useRef(null);
  if (!eventIdRef.current) {
    eventIdRef.current = createEventId();
  }

  // IP, शहर और डिवाइस की जानकारी भरें — मूल स्क्रिप्ट जैसा ही व्यवहार।
  useEffect(() => {
    let cancelled = false;

    // CRM को बताएँ कि सबमिट के बाद किस पते पर वापस भेजना है (पूरा URL)।
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
  // साथ ही Meta CAPI के लिए intent दर्ज करें — CRM सबमिशन पहले जैसा ही रहेगा।
  const handleSubmit = (event) => {
    const form = event.currentTarget;
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
        // यह असली नई लीड नहीं है — इसलिए कोई Meta event नहीं जाएगा।
        clearRememberedLeadEvent();
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

    // ---- Meta conversion intent (CRM submission से पहले, non-blocking) ----
    const eventId = eventIdRef.current;
    let phone = '';
    try {
      const formData = new FormData(form);
      phone = String(formData.get('phonenumber') || '');
    } catch {
      phone = '';
    }

    // event_id session में याद रखें — thank-you पेज इसी से confirm करेगा।
    rememberLeadEvent(eventId);
    if (redirectInputRef.current) {
      redirectInputRef.current.value = redirectUrlForEvent(eventId);
    }

    event.preventDefault();
    sendLeadIntent({
      eventId,
      phone,
      eventSourceUrl: window.location.href,
    })
      .catch(() => false)
      .finally(() => {
        // असली CRM फ़ॉर्म सबमिशन — बिल्कुल पहले जैसा (native form POST)।
        HTMLFormElement.prototype.submit.call(form);
      });
  };

  const { contact } = siteConfig;
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`;
  const waMessage = encodeURIComponent(
    'नमस्ते अन्श आयुर्वेद, मुझे ऑर्डर के बारे में जानकारी चाहिए।'
  );
  const waHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${waMessage}`;

  // कॉल / WhatsApp क्लिक — ये Contact interaction हैं, नई Lead conversions नहीं।
  // (Lead केवल असली फ़ॉर्म सबमिशन पर, thank-you पेज से एक ही event_id के साथ जाता है।)
  const trackContact = (method) => {
    trackEvent('Contact', { method });
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
            करेगी।
          </p>
        </div>

        <div className="order-form__card" data-reveal="zoom">
          <div className="order-form__urgency">
            <span className="order-form__badge">
              <FiShoppingBag aria-hidden="true" />
              आज का ऑफ़र सक्रिय है
            </span>
            <Countdown label="ऑफ़र समाप्त होने में" />
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

              {/* CRM में यह साफ़ दिखे कि कौन-सा उत्पाद और कितनी कीमत की लीड है */}
              <input
                type="hidden"
                name="product"
                value={`${combo.name} — ${combo.packSize}`}
                readOnly
              />
              <input type="hidden" name="price" value={combo.price} readOnly />

              <div className="order-form__field">
                <label htmlFor="order-name">पूरा नाम</label>
                <input
                  type="text"
                  id="order-name"
                  className="order-input"
                  name="name"
                  required
                  placeholder="अपना पूरा नाम लिखें"
                  autoComplete="name"
                />
              </div>

              <div className="order-form__field">
                <label htmlFor="order-number">फोन नंबर</label>
                <input
                  type="tel"
                  id="order-number"
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
                <label htmlFor="order-address">पूरा पता</label>
                <input
                  type="text"
                  id="order-address"
                  className="order-input"
                  name="address"
                  required
                  placeholder="मकान, गली, इलाका, शहर, पिन कोड"
                  autoComplete="street-address"
                />
              </div>

              <button
                type="submit"
                className="submit-button order-form__submit btn btn--gold btn--lg btn--block"
              >
                <FiShoppingBag aria-hidden="true" />
                ऑर्डर करें
              </button>

              <p className="order-form__note">
                <FiLock aria-hidden="true" />
                आपकी जानकारी पूरी तरह सुरक्षित है। सबमिट के बाद आपको धन्यवाद पेज मिलेगा।
              </p>
            </form>

            <aside className="order-form__side">
              <h3 className="order-form__side-title">क्यों Ansh Ayurveda?</h3>

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
                    onClick={() => trackContact('phone')}
                  >
                    <FaPhoneAlt aria-hidden="true" />
                    कॉल करें
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="order-form__cta-btn order-form__cta-btn--wa"
                    onClick={() => trackContact('whatsapp')}
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

