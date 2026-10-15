import { useState } from 'react';
import {
  FiInfo,
  FiTag,
  FiList,
  FiDroplet,
  FiBookOpen,
  FiBox,
  FiAlertTriangle,
  FiStar,
  FiUserCheck,
  FiArrowRight,
} from 'react-icons/fi';
import products from '../../data/products.js';
import assets from '../../data/assets.js';
import './ProductDetails.css';

const PENDING = 'यह जानकारी सत्यापित होते ही उपलब्ध कराई जाएगी।';

const tabs = [
  { key: 'men', label: 'पुरुषों के लिए' },
  { key: 'women', label: 'महिलाओं के लिए' },
];

export default function ProductDetails() {
  const [active, setActive] = useState('men');
  const product = products[active];
  const image = active === 'men' ? assets.maleBottle : assets.femaleBottle;

  const rows = [
    { icon: <FiInfo />, label: 'उत्पाद परिचय', value: product.longDescription },
    { icon: <FiTag />, label: 'वेलनेस श्रेणी', value: product.category },
    {
      icon: <FiStar />,
      label: 'मुख्य फायदे',
      value: product.benefits && product.benefits.length > 0 ? product.benefits.join(' · ') : '',
    },
    {
      icon: <FiList />,
      label: 'सत्यापित सामग्री',
      value: product.ingredients.length > 0 ? product.ingredients.join(' · ') : '',
    },
    { icon: <FiDroplet />, label: 'संरचना', value: product.composition },
    { icon: <FiBookOpen />, label: 'उपयोग की विधि', value: product.directions },
    { icon: <FiBox />, label: 'भंडारण निर्देश', value: product.storage },
    {
      icon: <FiAlertTriangle />,
      label: 'सावधानियाँ',
      value: product.precautions.length > 0 ? product.precautions.join(' · ') : '',
    },
    { icon: <FiUserCheck />, label: 'चिकित्सकीय सलाह कब लें', value: product.seekAdvice },
  ];

  return (
    <section className="product-details section" id="product-details">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">उत्पाद की जानकारी</p>
          <h2 className="section-title">विस्तृत उत्पाद विवरण</h2>
          <p className="section-subtitle">
            पुरुषों और महिलाओं के उत्पाद की संपूर्ण जानकारी एक ही स्थान पर।
          </p>
        </div>

        <div className="product-details__tabs" role="tablist" aria-label="उत्पाद चुनें">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active === tab.key}
              className={`product-details__tab ${
                active === tab.key ? 'product-details__tab--active' : ''
              }`}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="product-details__panel" role="tabpanel">
          <div className="product-details__media">
            <img src={image} alt={product.name} loading="lazy" />
            <div className="product-details__media-caption">
              <strong>{product.name}</strong>
              <span>{product.category}</span>
            </div>
          </div>

          <dl className="product-details__rows">
            {rows.map((row) => (
              <div className="product-details__row" key={row.label}>
                <dt>
                  <span className="product-details__row-icon">{row.icon}</span>
                  {row.label}
                </dt>
                <dd>{row.value || PENDING}</dd>
              </div>
            ))}
          </dl>

          <div className="product-details__footer">
            <p className="product-details__note">
              यह जानकारी केवल सामान्य जानकारी के लिए है; यह चिकित्सीय सलाह नहीं है।
            </p>
            <a href="#order" className="btn btn--primary">
              ऑर्डर करें
              <FiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
