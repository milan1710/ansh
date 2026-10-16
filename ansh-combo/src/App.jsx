import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar.jsx';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import TrustBar from './components/TrustBar/TrustBar.jsx';
import StatsStrip from './components/StatsStrip/StatsStrip.jsx';
import ProblemSelector from './components/ProblemSelector/ProblemSelector.jsx';
import MaleBenefits from './components/MaleBenefits/MaleBenefits.jsx';
import FemaleBenefits from './components/FemaleBenefits/FemaleBenefits.jsx';
import FertilityBenefits from './components/FertilityBenefits/FertilityBenefits.jsx';
import ProductShowcase from './components/ProductShowcase/ProductShowcase.jsx';
import ComboPack from './components/ComboPack/ComboPack.jsx';
import RatingSection from './components/RatingSection/RatingSection.jsx';
import FamilyWellnessOffer from './components/FamilyWellnessOffer/FamilyWellnessOffer.jsx';
import ServiceHighlights from './components/ServiceHighlights/ServiceHighlights.jsx';
import FamilySection from './components/FamilySection/FamilySection.jsx';
import Comparison from './components/Comparison/Comparison.jsx';
import DoctorProfile from './components/DoctorProfile/DoctorProfile.jsx';
import TrustPillars from './components/TrustPillars/TrustPillars.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
import CustomerGallery from './components/CustomerGallery/CustomerGallery.jsx';
import HowItWorks from './components/HowItWorks/HowItWorks.jsx';
import OrderForm from './components/OrderForm/OrderForm.jsx';
import FAQ from './components/FAQ/FAQ.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import FloatingActions from './components/FloatingActions/FloatingActions.jsx';
import useScrollReveal from './hooks/useScrollReveal.js';
import './App.css';

export default function App() {
  // पूरी वेबसाइट में `data-reveal` वाले एलिमेंट स्क्रॉल पर दिखते हैं।
  useScrollReveal();

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        {/* 1. ध्यान खींचना — hook, भरोसा और आँकड़े */}
        <Hero />
        <TrustBar />
        <StatsStrip />

        {/* 2. अपनी ज़रूरत पहचानें — सही उत्पाद की ओर मार्गदर्शन */}
        <ProblemSelector />

        {/* 3. उत्पाद को समझें — पुरुष, महिला और कोर्स की झलक */}
        <MaleBenefits />
        <FemaleBenefits />
        <FertilityBenefits />
        <ProductShowcase />

        {/* 4. ऑफ़र और भरोसा एक साथ */}
        <ComboPack />
        <RatingSection />

        {/* 5. उत्पाद विस्तार से — दोनों के लिए क्या हल मिलता है */}
        <FamilyWellnessOffer />

        {/* 6. नतीजे और सच्ची कहानी — सबसे मजबूत proof */}
        <ServiceHighlights />
        <FamilySection />

        {/* 7. आपत्तियाँ दूर करें — तुलना, विशेषज्ञ, भरोसे की वजहें */}
        <Comparison />
        <DoctorProfile />
        <TrustPillars />

        {/* 8. ग्राहकों की आवाज़ और तस्वीरें */}
        <Reviews />
        <CustomerGallery />

        {/* 9. ऑर्डर — सीधा CRM फ़ॉर्म, urgency और countdown के साथ */}
        <HowItWorks />
        <OrderForm />

        {/* 10. आख़िरी सवाल और संपर्क */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

