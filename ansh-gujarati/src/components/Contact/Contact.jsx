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
      label: 'ફોન',
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
      label: 'ઈમેલ',
      value: contact.email,
      icon: <FiMail />,
      href: hasEmail ? `mailto:${contact.email}` : null,
    },
    {
      key: 'address',
      label: 'સરનામું',
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
          <p className="eyebrow">સંપર્ક કરો</p>
          <h2 className="section-title">અમારો સંપર્ક કરો</h2>
          <p className="section-subtitle">કોઈ પણ પ્રશ્ન કે માહિતી માટે અમારો સંપર્ક કરો.</p>
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
                    <em>માહિતી જલદી ઉપલબ્ધ થશે</em>
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
            સંપર્ક માહિતી જલદી ઉપલબ્ધ કરાવવામાં આવશે. કૃપા કરીને પછી ફરી જુઓ.
          </p>
        )}
      </div>
    </section>
  );
}
