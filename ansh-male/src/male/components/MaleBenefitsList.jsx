import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { maleBenefits, maleProduct } from '../maleConfig.js';

// पुरुषों के लिए उत्पाद के सभी फायदे एक जगह — साफ़ और पढ़ने में आसान।
export default function MaleBenefitsList() {
  return (
    <section className="m-benefits section" id="benefits">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">पूरे फायदे</p>
          <h2 className="section-title">{maleProduct.name} से क्या मिलता है?</h2>
          <p className="section-subtitle">
            {maleProduct.herbs} आयुर्वेदिक जड़ी-बूटियों का शुद्ध मिश्रण — पुरुषों की इन समस्याओं में
            सहायक माना जाता है।
          </p>
        </div>

        <ul className="m-benefits__list">
          {maleBenefits.map((benefit, index) => (
            <li key={benefit} data-reveal data-reveal-delay={(index % 2) * 80}>
              <FiCheckCircle aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="m-benefits__cta" data-reveal>
          <a href="#order" className="btn btn--primary btn--lg">
            अभी ऑर्डर करें — ₹{maleProduct.price.toLocaleString('en-IN')}
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
