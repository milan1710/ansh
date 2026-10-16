// पुरुषों के लिए बनाई गई वेबसाइट (/ansh-male) की सारी केंद्रीय जानकारी।
// कीमत, कोर्स, उत्पाद और समस्याओं से जुड़ा सारा कंटेंट यहीं से आता है,
// ताकि कहीं भी बदलाव करना हो तो सिर्फ़ इस फ़ाइल में करना पड़े।
//
// ⚠️ नोट: यहाँ कोई भी दावा (claim) वही रखा गया है जो पुरुषों के लिए
// मौजूदा वेबसाइट पर पहले से दिखाया जा रहा है — कोई नया या काल्पनिक
// दावा जोड़ा नहीं गया है।

export const maleProduct = {
  name: 'Ansh Ayurveda For Men',
  hindiName: 'पुरुषों की ताकत का आयुर्वेदिक कोर्स',
  tagline: '17 जड़ी-बूटियों का शुद्ध आयुर्वेदिक मिश्रण',
  packSize: '1 महीने का कोर्स',
  bottle: '1 बोतल = 1 महीने का कोर्स',
  price: 1499,
  mrp: 2499,
  currency: '₹',
  times: ['रोज़ सुबह 1 टैबलेट', 'खाने के बाद सादे पानी के साथ'],
  herbs: 17,
};

// पुरुषों की मुख्य समस्याएँ — इसी पर पूरी वेबसाइट केंद्रित है।
export const maleProblems = [
  {
    id: 'sperm',
    icon: 'TrendingUp',
    label: 'शुक्राणु की कमी',
    english: 'Low Sperm Count',
    text: 'शुक्राणु की संख्या और गुणवत्ता बढ़ाने में सहायक — प्राकृतिक तरीके से।',
  },
  {
    id: 'timing',
    icon: 'Clock',
    label: 'शीघ्रपतन / जल्दी झड़ना',
    english: 'Premature Ejaculation',
    text: 'जल्दी झड़ने की समस्या में मदद और सेक्स टाइमिंग को सुधारने में सहायक।',
  },
  {
    id: 'stamina',
    icon: 'Activity',
    label: 'कम स्टैमिना और ताकत',
    english: 'Low Stamina',
    text: 'शरीर की कमजोरी और ढीलापन दूर करके ऊर्जा व ताकत बढ़ाने में मदद करता है।',
  },
  {
    id: 'weakness',
    icon: 'Heart',
    label: 'मर्दाना कमजोरी',
    english: 'Male Weakness',
    text: 'मर्दाना कमजोरी और थकान को दूर करने में सहायक आयुर्वेदिक कोर्स।',
  },
  {
    id: 'hormone',
    icon: 'Target',
    label: 'हार्मोनल असंतुलन',
    english: 'Hormonal Imbalance',
    text: 'पुरुष हार्मोन के संतुलन को सही दिशा में बनाए रखने में सहायक।',
  },
  {
    id: 'confidence',
    icon: 'Users',
    label: 'आत्मविश्वास की कमी',
    english: 'Low Confidence',
    text: 'शरीर में ताकत आने पर आत्मविश्वास अपने आप बढ़ता है।',
  },
];

// उत्पाद के फायदे (पुरुषों के लिए)।
export const maleBenefits = [
  'शुक्राणु (स्पर्म) की संख्या बढ़ाने में सहायक',
  'शीघ्रपतन जैसी सेक्स टाइमिंग की समस्या सुधारने में मदद',
  'शरीर की कमजोरी और ढीलापन दूर करने में सहायक',
  'स्टैमिना और ताकत बढ़ाने में मदद',
  'पुरुष हार्मोन के संतुलन में सहायक',
  'शरीर में कोई और अनचाहा बदलाव नहीं करता',
];

// तुलना तालिका — यह सिर्फ़ सेवा-विशेषताओं की समझ है, कोई चिकित्सीय दावा नहीं।
export const maleComparison = [
  { feature: 'शुक्राणु की संख्या पर ध्यान', ours: 'हाँ — पुरुषों के लिए खास फ़ॉर्मूला', theirs: 'सामान्य सप्लीमेंट' },
  { feature: 'सेक्स टाइमिंग व स्टैमिना', ours: 'टाइमिंग और ताकत पर पूरा ध्यान', theirs: 'आमतौर पर नहीं' },
  { feature: 'पूरा 1 महीने का कोर्स', ours: 'पूरी बोतल — 1 महीने का कोर्स', theirs: 'सिर्फ़ ट्रायल पैक' },
  { feature: 'पैसे वापस की गारंटी', ours: 'हाँ — तय नियमों के अनुसार', theirs: 'सामान्यतः उपलब्ध नहीं' },
  { feature: 'निजी डिलीवरी', ours: 'डिस्क्रीट पैकिंग — पूरे भारत में', theirs: 'पैकिंग स्पष्ट नहीं' },
  { feature: 'सहायता टीम से सीधी बात', ours: 'फ़ोन व WhatsApp पर उपलब्ध', theirs: 'सीमित सहायता' },
];

// सीधे मौजूदा CRM फ़ॉर्म से जुड़ा हुआ ऑर्डर फ़ॉर्म।
export const maleForm = {
  action: 'https://crm.bhoomidhara.in/forms/wtl/88b0b1b10b8eb6466fab31e0b54a0c5b',
  csrfToken: '88b0b1b10b8eb6466fab31e0b54a0c5b',
  // ⚠️ `formKey` ठीक उसी key के बराबर होनी चाहिए जो CRM फ़ॉर्म URL में दिखती है।
  formKey: '88b0b1b10b8eb6466fab31e0b54a0c5b',
  redirectUrl: '/ansh-combo/thankyou.html',
};

export default {
  product: maleProduct,
  problems: maleProblems,
  benefits: maleBenefits,
  comparison: maleComparison,
  form: maleForm,
};
