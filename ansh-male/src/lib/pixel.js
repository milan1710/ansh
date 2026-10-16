// Facebook Pixel से जुड़े इवेंट भेजने का छोटा हेल्पर।
// Pixel ID प्रोजेक्ट की .env फ़ाइल (VITE_FB_PIXEL_ID) से आता है और index.html में लोड होता है।
// अगर Pixel ID सेट नहीं है या Pixel लोड नहीं हुआ, तो ये function चुपचाप कुछ नहीं करते।

export function isPixelReady() {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

// मानक इवेंट भेजें, जैसे trackEvent('Lead') या trackEvent('Contact')
export function trackEvent(event, params) {
  if (!isPixelReady()) {
    return;
  }
  if (params) {
    window.fbq('track', event, params);
  } else {
    window.fbq('track', event);
  }
}

// कस्टम इवेंट भेजें, जैसे trackCustomEvent('DoctorCallClick')
export function trackCustomEvent(event, params) {
  if (!isPixelReady()) {
    return;
  }
  if (params) {
    window.fbq('trackCustom', event, params);
  } else {
    window.fbq('trackCustom', event);
  }
}
