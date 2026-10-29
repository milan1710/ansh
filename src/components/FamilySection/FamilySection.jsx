import { FiCheck } from 'react-icons/fi';
import assets from '../../data/assets.js';
import './FamilySection.css';

const points = [
  'स्पष्ट और पारदर्शी उत्पाद जानकारी',
  'अपनी आवश्यकता के अनुसार सही विकल्प',
  'आपके सवालों के भरोसेमंद उत्तर',
  'प्राकृतिक वेलनेस की दिशा में एक कदम',
];

export default function FamilySection() {
  return (
    <section className="family-section">
      <div className="container family-section__grid">
        <div className="family-section__media">
          <div className="family-section__image">
            <img
              src={assets.family}
              alt="वेलनेस उत्पादों के साथ खुशहाल भारतीय परिवार"
              loading="lazy"
            />
          </div>
          <div className="family-section__image family-section__image--secondary">
            <img
              src={assets.familyAlt}
              alt="आयुर्वेदिक सप्लीमेंट्स के साथ परिवार की वेलनेस"
              loading="lazy"
            />
          </div>
        </div>

        <div className="family-section__copy">
          <p className="eyebrow">परिवार की वेलनेस यात्रा</p>
          <h2 className="family-section__title">
            आपकी वेलनेस यात्रा में सही जानकारी का साथ
          </h2>
          <p className="family-section__lead">
            नमस्कार, दोस्तो मेरा नाम Anu शर्मा है और मेरा यह ब्लॉग लिखने का सिर्फ इतना ही मकसद है के बांझपन की समस्या की वजह से, जिस दुख और दर्द से, मै और मेरे Husband गुजरे है उससे कोई और Couple ना गुजरे। Ansh Ayurveda का टोटल कोर्स 2 महीने का था और हमे दवा लेते हुवे 1 महिना बीत गया थे लेकिन हमे अभी भी किसी भी तरह का कोई रिज़ल्ट नहीं मिला था। मुझे अब लगने लगा था के शायद आयुर्वेद मे भी इस समस्या का कोई उपचार नहीं है। लेकिन अभी 2 महीने का कोर्स ओर बाकी था ओर मेरे हसबेंड को पूरी उम्मीद थी के इस बार हमे जरूर रिज़ल्ट मिलेगा। गर्भसाथी का कोर्स खतम हुवा। कोर्स खतम होने के 1 महीने बाद हमारे साथ वोह हुवा जिसकी हमने कभी कल्पना भी नहीं की थी। मेरी pregnancy test Report positive आयी।
          </p>

          <ul className="family-section__points">
            {points.map((point) => (
              <li key={point}>
                <FiCheck />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <a href="#order" className="btn btn--primary">
            अधिक जानकारी प्राप्त करें
          </a>
        </div>
      </div>

    
    </section>
  );
}
