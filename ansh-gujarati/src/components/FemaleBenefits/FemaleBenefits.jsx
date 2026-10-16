import { FiCalendar, FiActivity, FiShield, FiCheck, FiArrowRight } from 'react-icons/fi';
import products from '../../data/products.js';
import assets from '../../data/assets.js';
import './FemaleBenefits.css';

export default function FemaleBenefits() {
  const product = products.women;

  const features = [
    {
      icon: <FiCalendar />,
      title: 'પીરિયડ્સ સમયસર',
      text: 'પીરિયડ્સ સાચા સમયે લાવે છે.',
    },
    {
      icon: <FiActivity />,
      title: 'PCOD / PCOS',
      text: 'PCOD / PCOS સુધારે છે.',
    },
    {
      icon: <FiShield />,
      title: 'બીજો કોઈ ફેરફાર નહીં',
      text: 'શરીરમાં બીજો કોઈ ફેરફાર કરતું નથી.',
    },
    
  ];

  return (
    <section className="female-benefits" id="women">
      <div className="container female-benefits__grid">
        <div className="female-benefits__content" data-reveal="left">
          <p className="eyebrow">મહિલાઓ માટે ઉત્પાદન પરિચય</p>
          <h2 className="female-benefits__title">{product.name}</h2>
          <p className="female-benefits__desc">{product.longDescription}</p>
          <ul className="female-benefits__features">
            {features.map((feature) => (
              <li key={feature.title}>
                <span className="female-benefits__icon">{feature.icon}</span>
                <span className="female-benefits__feature-text">
                  <strong>{feature.title}</strong>
                  <em>{feature.text}</em>
                </span>
              </li>
            ))}
          </ul>

          

          {product.highlights && product.highlights.length > 0 && (
            <ul className="female-benefits__highlights">
              {product.highlights.map((item) => (
                <li key={item}>
                  <FiCheck aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="female-benefits__actions">
            <a href="#order" className="btn btn--pink">
              હમણાં ઓર્ડર કરો
              <FiArrowRight />
            </a>
          </div>
        </div>

        <div className="female-benefits__photo" data-reveal="right">
          <img
            src={assets.femaleBottlePng}
            alt="Ansh Ayurveda For Women ની બોટલ"
            loading="lazy"
          />
          {Number.isFinite(product.price) && product.price > 0 && (
            <span className="female-benefits__price-badge">
              <strong>₹{product.price.toLocaleString('en-IN')}</strong>
              <em>{product.packSize}</em>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
