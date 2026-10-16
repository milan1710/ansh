import MaleAnnouncementBar from './components/MaleAnnouncementBar.jsx';
import MaleHeader from './components/MaleHeader.jsx';
import TrustBar from '../components/TrustBar/TrustBar.jsx';
import MaleStats from './components/MaleStats.jsx';
import MaleProblems from './components/MaleProblems.jsx';
import MaleBenefits from './components/MaleBenefits.jsx';
import MaleBenefitsList from './components/MaleBenefitsList.jsx';
import MaleOffer from './components/MaleOffer.jsx';
import MaleHowItWorks from './components/MaleHowItWorks.jsx';
import MaleComparison from './components/MaleComparison.jsx';
import MaleDoctor from './components/MaleDoctor.jsx';
import MaleTrustPillars from './components/MaleTrustPillars.jsx';
import MaleReviews from './components/MaleReviews.jsx';
import MaleGallery from './components/MaleGallery.jsx';
import MaleOrderForm from './components/MaleOrderForm.jsx';
import MaleFaq from './components/MaleFaq.jsx';
import Contact from '../components/Contact/Contact.jsx';
import MaleFooter from './components/MaleFooter.jsx';
import MaleFloatingActions from './components/MaleFloatingActions.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import './male.css';

// पुरुषों के लिए बनी पूरी वेबसाइट (/ansh-male)।
// संरचना और डिज़ाइन मुख्य वेबसाइट की तरह ही है, सिर्फ़ कंटेंट पुरुषों
// की समस्याओं पर केंद्रित है — शुक्राणु की कमी, शीघ्रपतन, सेक्स टाइमिंग,
// स्टैमिना और मर्दाना कमजोरी।
export default function MaleApp() {
  // पूरी वेबसाइट में `data-reveal` वाले एलिमेंट स्क्रॉल पर दिखते हैं।
  useScrollReveal();

  return (
    <>
      <MaleAnnouncementBar />
      <MaleHeader />
      <main>
        {/* 1. सबसे ऊपर — उत्पाद (Shopify जैसा product बाय-बॉक्स) */}
        <MaleOffer />

        {/* 2. भरोसा और आँकड़े */}
        <TrustBar />
        <MaleStats />

        {/* 3. अपनी समस्या पहचानें */}
        <MaleProblems />

        {/* 4. उत्पाद के पूरे फायदे */}
        <MaleBenefits />
        <MaleBenefitsList />

        {/* 5. कैसे काम करता है + तुलना */}
        <MaleHowItWorks />
        <MaleComparison />

        {/* 6. विशेषज्ञ और भरोसे की वजहें */}
        <MaleDoctor />
        <MaleTrustPillars />

        {/* 7. ग्राहकों की आवाज़ और तस्वीरें */}
        <MaleReviews />
        <MaleGallery />

        {/* 8. ऑर्डर — सीधा CRM फ़ॉर्म */}
        <MaleOrderForm />

        {/* 9. आख़िरी सवाल और संपर्क */}
        <MaleFaq />
        <Contact />
      </main>
      <MaleFooter />
      <MaleFloatingActions />
    </>
  );
}
