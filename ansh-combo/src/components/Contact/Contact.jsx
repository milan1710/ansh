import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiMapPin } from 'react-icons/fi';
import siteConfig from '../../data/siteConfig.js';
import { trackEvent } from '../../lib/pixel.js';
import './Contact.css';

export default function Contact() {
  const { contact } = siteConfig;

  // कॉल / WhatsApp क्लिक भी Lead के रूप में गिना जाए।
  const trackLead = (method) => {
    trackEvent('Contact', { method });
    trackEvent('Lead', { method });
  };

  const hasPhone = Boolean(contact.phone);
  const hasWhatsapp = Boolean(contact.whatsapp);
  const hasEmail = Boolean(contact.email);
  const hasAddress = Boolean(contact.address);

  const items = [
    {
      key: 'phone',
      label: 'फ़ोन',
      value: contact.phone,
      icon: <FaPhoneAlt />,
      href: hasPhone ? `tel:${contact.phone.replace(/[^+\d]/g, '')}` : null,
      onClick: () => trackLead('phone'),
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      value: contact.whatsapp,
      icon: <FaWhatsapp />,
      href: hasWhatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` : null,
      external: true,
      onClick: () => trackLead('whatsapp'),
    },
    {
      key: 'email',
      label: 'ईमेल',
      value: contact.email,
      icon: <FiMail />,
      href: hasEmail ? `mailto:${contact.email}` : null,
    },
    {
      key: 'address',
      label: 'पता',
      value: contact.address,
      icon: <FiMapPin />,
      href: null,
    },
  ];

  const hasAny = hasPhone || hasWhatsapp || hasEmail || hasAddress;

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">संपर्क करें</p>
          <h2 className="section-title">हमसे संपर्क करें</h2>
          <p className="section-subtitle">किसी भी प्रश्न या जानकारी के लिए हमसे संपर्क करें।</p>
        </div>

        <div className="contact__grid" data-reveal="zoom">
          {items.map((item) => {
            const content = (
              <>
                <span className="contact__icon">{item.icon}</span>
                <span className="contact__body">
                  <strong>{item.label}</strong>
                  {item.value ? (
                    <span className="contact__value">{item.value}</span>
                  ) : (
                    <em>जानकारी शीघ्र उपलब्ध होगी</em>
                  )}
                </span>
              </>
            );

            if (item.href) {
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className="contact__card"
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  onClick={item.onClick}
                >
                  {content}
                </a>
              );
            }
            return (
              <div key={item.key} className="contact__card">
                {content}
              </div>
            );
          })}
        </div>

        {!hasAny && (
          <p className="contact__placeholder">
            संपर्क जानकारी जल्द ही उपलब्ध कराई जाएगी। कृपया बाद में पुनः देखें।
          </p>
        )}
      </div>
    </section>
  );
}
