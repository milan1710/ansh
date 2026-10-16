// वेबसाइट का केंद्रीय विन्यास।
// फ़ोन नंबर, WhatsApp, ईमेल, पता और Facebook Pixel ID जैसी साझा जानकारी
// प्रोजेक्ट की जड़ में मौजूद `.env` फ़ाइल से आती है — यानी किसी भी जगह का
// नंबर बदलने के लिए सिर्फ़ .env बदलें और वह पूरी वेबसाइट में लागू हो जाएगा।

const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};

const siteConfig = {
  brand: {
    name: 'Ansh Ayurveda',
    tagline: 'Natural Wellness',
    hindiTagline: 'प्राकृतिक वेलनेस',
  },

  // ट्रैकिंग — .env में VITE_FB_PIXEL_ID भरने पर Facebook Pixel चालू हो जाता है।
  tracking: {
    fbPixelId: env.VITE_FB_PIXEL_ID || '',
  },

  // संपर्क जानकारी (.env: VITE_PHONE_NUMBER, VITE_WHATSAPP_NUMBER, VITE_EMAIL, VITE_ADDRESS)।
  contact: {
    phone: env.VITE_PHONE_NUMBER || '+917041305592',
    whatsapp: env.VITE_WHATSAPP_NUMBER || '+917041305592',
    email: env.VITE_EMAIL || 'anshayurveda@gmail.com',
    address:
      env.VITE_ADDRESS ||
      'शॉप नंबर 12, शिवम कॉम्प्लेक्स, न्यू राणपुर, अहमदाबाद, गुजरात – 380015',
    hours: '',
  },

  // डॉक्टर / आयुर्वेद विशेषज्ञ का परिचय (डॉक्टर परिचय अनुभाग में दिखता है)।
  doctor: {
    name: 'डॉ. राजेश शर्मा',
    englishName: 'Dr. Rajesh Sharma',
    role: 'आयुर्वेद विशेषज्ञ | Ansh Ayurveda',
    experience: '22 वर्ष',
    qualification: 'BAMS (मान्य आयुर्वेदिक डिग्री)',
    specialty: 'पुरुष एवं महिला प्रजनन स्वास्थ्य और आयुर्वेदिक परामर्श',
    headline: 'बेहतर स्वास्थ्य की दिशा में सही मार्गदर्शन',
  },

  // रेटिंग केवल तभी दिखाएँ जब वास्तविक, सत्यापित समीक्षा डेटा उपलब्ध हो।
  rating: {
    enabled: false,
    average: null, // उदाहरण: 4.5
    count: null,   // उदाहरण: 120 (सत्यापित समीक्षाओं की संख्या)
  },

  // उत्पाद की उपलब्धता की जानकारी।
  availability: {
    men: '',
    women: '',
  },

  // सोशल / अतिरिक्त लिंक (उपलब्ध होने पर)।
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },
};

export default siteConfig;
