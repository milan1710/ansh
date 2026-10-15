import { FiHeart, FiClock, FiShield, FiArrowRight } from 'react-icons/fi';
import products from '../../data/products.js';
import assets from '../../data/assets.js';
import './MaleBenefits.css';

export default function MaleBenefits() {
  const product = products.men;

  const features = [
    {
      icon: <FiHeart />,
      title: 'शुक्राणु की संख्या',
      text: 'सुक्राणु की संख्या बढ़ाता है।',
    },
    {
      icon: <FiClock />,
      title: 'सेक्स टाइमिंग',
      text: 'सेक्स टाइमिंग इम्प्रूव करता है।',
    },
    
    {
      icon: <FiShield />,
      title: 'कोई और चेंज नहीं',
      text: 'शरीर में कोई और चेंज नहीं करता है।',
    },
  ];

  return (
    <section className="male-benefits" id="men">
      <div className="container male-benefits__grid">
        <div className="male-benefits__photo" data-reveal="left">
          <img
            src={assets.maleBottlePng}
            alt="Ansh Ayurveda For Men की बोतल"
            loading="lazy"
          />
          {Number.isFinite(product.price) && product.price > 0 && (
            <span className="male-benefits__price-badge">
              <strong>₹{product.price.toLocaleString('en-IN')}</strong>
              <em>{product.packSize}</em>
            </span>
          )}
        </div>

        <div className="male-benefits__content" data-reveal="right">
          <p className="eyebrow">पुरुषों के लिए उत्पाद परिचय</p>
          <h2 className="male-benefits__title">{product.name}</h2>
          <p className="male-benefits__desc">{product.longDescription}</p>

          <ul className="male-benefits__features">
            {features.map((feature) => (
              <li key={feature.title}>
                <span className="male-benefits__icon">{feature.icon}</span>
                <span className="male-benefits__feature-text">
                  <strong>{feature.title}</strong>
                  <em>{feature.text}</em>
                </span>
              </li>
            ))}
          </ul>

          <div className="male-benefits__actions">
            <a href="#order" className="btn btn--primary">
              अभी ऑर्डर करें
              <FiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
