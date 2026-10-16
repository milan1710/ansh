import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaPhoneAlt } from 'react-icons/fa';
import assets from '../../data/assets.js';
import siteConfig from '../../data/siteConfig.js';
import './Header.css';

const telHref = `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}`;

const navItems = [
  { label: 'હોમ', href: '#home' },
  { label: 'પુરુષો માટે', href: '#men' },
  { label: 'મહિલાઓ માટે', href: '#women' },
  { label: 'ગ્રાહક સમીક્ષાઓ', href: '#reviews' },
  { label: 'ખુશ ગ્રાહકો', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'સંપર્ક કરો', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);

      // पेज में कितना स्क्रॉल हुआ — ऊपर पतली प्रगति पट्टी के लिए।
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <a href="#home" className="header__brand" onClick={close}>
          <img src={assets.logo} alt="Ansh Ayurveda Natural Wellness લોગો" />
          <span className="header__brand-text">
            <strong>Ansh Ayurveda</strong>
            <em>કુદરતી વેલનેસ</em>
          </span>
        </a>

        <nav
          id="primary-nav"
          className={`header__nav ${open ? 'header__nav--open' : ''}`}
          aria-label="મુખ્ય મેનૂ"
        >
          <ul className="header__menu">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={telHref} className="header__call" onClick={close}>
            <FaPhoneAlt aria-hidden="true" />
            <span>{siteConfig.contact.phone}</span>
          </a>

          <a href="#order" className="btn btn--gold btn--sm header__cta" onClick={close}>
            ઓર્ડર કરો
          </a>
        </nav>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'મેનૂ બંધ કરો' : 'મેનૂ ખોલો'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      <span
        className="header__progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </header>
  );
}
