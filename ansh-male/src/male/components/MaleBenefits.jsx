import { FiClock, FiHeart, FiShield, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import assets from '../../data/assets.js';
import { maleProduct } from '../maleConfig.js';
import '../../components/MaleBenefits/MaleBenefits.css';

export default function MaleBenefits() {
  const features = [
    {
      icon: <FiTrendingUp aria-hidden="true" />,
      title: 'शुक्राणु की संख्या',
      text: 'शुक्राणु (स्पर्म) की संख्या बढ़ाने में सहायक।',
    },
    {
      icon: <FiClock aria-hidden="true" />,
      title: 'सेक्स टाइमिंग',
      text: 'शीघ्रपतन और सेक्स टाइमिंग सुधारने में मदद करता है।',
    },
    {
      icon: <FiHeart aria-hidden="true" />,
      title: 'ताकत और स्टैमिना',
      text: 'कमजोरी और ढीलापन दूर करके ताकत बढ़ाता है।',
    },
    {
      icon: <FiShield aria-hidden="true" />,
      title: 'कोई और चेंज नहीं',
      text: 'शरीर में कोई और अनचाहा बदलाव नहीं करता।',
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
          <span className="male-benefits__price-badge">
            <strong>₹{maleProduct.price.toLocaleString('en-IN')}</strong>
            <em>{maleProduct.packSize}</em>
          </span>
        </div>

        <div className="male-benefits__content" data-reveal="right">
          <p className="eyebrow">पुरुषों के लिए उत्पाद परिचय</p>
          <h2 className="male-benefits__title">{maleProduct.name}</h2>
          <p className="male-benefits__desc">
            Ansh Ayurveda For Men — {maleProduct.herbs} तरह की आयुर्वेदिक जड़ी-बूटियों को मिलाकर
            बनाया गया शुद्ध मिश्रण। यह पूरी तरह पुरुषों की ज़रूरतों को ध्यान में रखकर तैयार किया गया
            कोर्स है, जो शुक्राणु की कमी, शीघ्रपतन, सेक्स टाइमिंग और शरीर की कमजोरी में सहायक माना
            जाता है।
          </p>

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
              अभी ऑर्डर करें — ₹{maleProduct.price.toLocaleString('en-IN')}
              <FiArrowRight />
            </a>
            <a href="#benefits" className="btn btn--outline">
              पूरे फायदे देखें
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
