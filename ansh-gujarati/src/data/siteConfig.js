// वेबसाइट का केंद्रीय विन्यास।
// फ़ोन नंबर, WhatsApp, ईमेल, पता और Facebook Pixel ID जैसी साझा जानकारी
// प्रोजेक्ट की जड़ में मौजूद `.env` फ़ाइल से आती है — यानी किसी भी जगह का
// नंबर बदलने के लिए सिर्फ़ .env बदलें और वह पूरी वेबसाइट में लागू हो जाएगा।

const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};

const siteConfig = {
  brand: {
    name: 'Ansh Ayurveda',
    tagline: 'Natural Wellness',
    hindiTagline: 'કુદરતી વેલનેસ',
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
    // ગુજરાતી સાઇટ માટે સરનામું સીધું ગુજરાતીમાં રાખેલું છે
    // (કારણ કે `.env` માં એક જ સરનામું બધી ભાષાની સાઇટ માટે હોય છે).
    address: 'શોપ નંબર 12, શિવમ કોમ્પ્લેક્સ, ન્યુ રાણપુર, અમદાવાદ, ગુજરાત – 380015',
    hours: '',
  },

  // डॉक्टर / आयुर्वेद विशेषज्ञ का परिचय (डॉक्टर परिचय अनुभाग में दिखता है)।
  doctor: {
    name: 'ડૉ. રાજેશ શર્મા',
    englishName: 'Dr. Rajesh Sharma',
    role: 'આયુર્વેદ નિષ્ણાત | Ansh Ayurveda',
    experience: '22 વર્ષ',
    qualification: 'BAMS (માન્ય આયુર્વેદિક ડિગ્રી)',
    specialty: 'પુરુષ અને મહિલા પ્રજનન આરોગ્ય તથા આયુર્વેદિક પરામર્શ',
    headline: 'સારા આરોગ્ય તરફ યોગ્ય માર્ગદર્શન',
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
