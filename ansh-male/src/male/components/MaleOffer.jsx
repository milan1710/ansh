import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import {
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiShoppingBag,
  FiTruck,
  FiRefreshCw,
  FiShield,
} from 'react-icons/fi';
import assets from '../../data/assets.js';
import { maleProduct, maleBenefits } from '../maleConfig.js';

// उत्पाद की तस्वीरें — गैलरी और थंबनेल के लिए।
const gallery = [
  { src: assets.maleBottlePng, alt: 'Ansh Ayurveda For Men की बोतल' },
  { src: assets.malePoster, alt: 'पुरुषों की सम्पूर्ण ताकत — Ansh Ayurveda' },
  { src: assets.premiumBottles, alt: 'प्रीमियम आयुर्वेदिक बोतलें' },
  { src: assets.athlete, alt: 'ताकतवर और फुर्तीला पुरुष' },
];

// कोर्स के पैक — हर पैक में 1 बोतल = 1 महीना।
const packs = [
  { id: 1, label: '1 महीना', months: 1, price: 1499, mrp: 2499 },
  { id: 2, label: '2 महीने', months: 2, price: 2799, mrp: 4998 },
  { id: 3, label: '3 महीने', months: 3, price: 3999, mrp: 7497 },
];

const money = (value) => `₹${value.toLocaleString('en-IN')}`;

export default function MaleOffer() {
  const [activeImage, setActiveImage] = useState(0);
  const [packId, setPackId] = useState(1);
  const [qty, setQty] = useState(1);

  const pack = packs.find((item) => item.id === packId) ?? packs[0];
  const total = pack.price * qty;
  const savePercent = Math.round(((pack.mrp - pack.price) / pack.mrp) * 100);
  const perDay = Math.round(pack.price / (pack.months * 30));

  const step = (delta) => setQty((value) => Math.min(5, Math.max(1, value + delta)));

  return (
    <section className="offer section" id="home" aria-label="उत्पाद और ऑफ़र">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">आज का स्पेशल ऑफ़र</p>
          <h2 className="section-title">1 बोतल = 1 महीने का कोर्स, सिर्फ़ ₹1499</h2>
          <p className="section-subtitle">
            17 आयुर्वेदिक जड़ी-बूटियों का शुद्ध मिश्रण — शुक्राणु की कमी, शीघ्रपतन, सेक्स टाइमिंग और
            कमजोरी के लिए।
          </p>
        </div>

        <div className="offer__grid">
          {/* ---------- तस्वीरों की गैलरी ---------- */}
          <div className="offer__gallery" data-reveal="left">
            <figure className="offer__main">
              <span className="offer__flag">{savePercent}% बचत</span>
              <img src={gallery[activeImage].src} alt={gallery[activeImage].alt} />
            </figure>

            <div className="offer__thumbs" role="tablist" aria-label="उत्पाद की तस्वीरें">
              {gallery.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  role="tab"
                  aria-selected={index === activeImage}
                  aria-label={item.alt}
                  className={`offer__thumb ${
                    index === activeImage ? 'offer__thumb--active' : ''
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={item.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* ---------- उत्पाद की जानकारी (Shopify जैसा बाय-बॉक्स) ---------- */}
          <div className="offer__info" data-reveal="right">
            <div>
              <h3 className="offer__title">{maleProduct.name}</h3>
              <p className="offer__sub">{maleProduct.tagline}</p>
            </div>

            <div className="offer__rating">
              <span className="offer__stars" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar key={i} />
                ))}
              </span>
              <strong>5.0</strong>
              <span>· 3000+ पुरुषों का भरोसा</span>
            </div>

            {/* कीमत */}
            <div className="offer__price-box">
              <div className="offer__prices">
                <span className="offer__price">{money(total)}</span>
                <span className="offer__mrp">{money(pack.mrp * qty)}</span>
                <span className="offer__save">{savePercent}% बचत</span>
              </div>
              <p className="offer__perday">
                1 बोतल = 1 महीना · लगभग ₹{perDay} प्रतिदिन · {pack.label} का कोर्स
                {qty > 1 ? ` × ${qty} बोतल` : ''}
              </p>
            </div>

            {/* पैक चुनें */}
            <div className="offer__pack">
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
                    <em>{money(item.price)}</em>
                  </button>
                ))}
              </div>
            </div>

            {/* मात्रा */}
            <div className="offer__qty">
              <span className="offer__qty-label">बोतल की संख्या</span>
              <div className="offer__qty-control">
                <button type="button" onClick={() => step(-1)} disabled={qty <= 1} aria-label="कम करें">
                  <FiChevronLeft aria-hidden="true" />
                </button>
                <span aria-live="polite">{qty}</span>
                <button type="button" onClick={() => step(1)} disabled={qty >= 5} aria-label="बढ़ाएँ">
                  <FiChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>

            <ul className="offer__benefits">
              {maleBenefits.slice(0, 4).map((benefit) => (
                <li key={benefit}>
                  <FiCheckCircle aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="offer__actions">
              <a href="#order" className="btn btn--gold btn--lg">
                <FiShoppingBag aria-hidden="true" />
                अभी ऑर्डर करें — {money(total)}
              </a>
              <a href="#faq" className="btn btn--outline btn--lg">
                सामान्य प्रश्न
              </a>
            </div>

            <ul className="offer__trust">
              <li>
                <FiTruck aria-hidden="true" />
                डिस्क्रीट डिलीवरी
              </li>
              <li>
                <FiRefreshCw aria-hidden="true" />
                मनी बैक गारंटी
              </li>
              <li>
                <FiShield aria-hidden="true" />
                100% आयुर्वेदिक
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
