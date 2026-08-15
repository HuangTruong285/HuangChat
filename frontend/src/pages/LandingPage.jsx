import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeatureSection from "../components/landing/FeatureSection";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary min-h-screen font-sans">
      <Navbar />

      <main className="overflow-hidden">
        <HeroSection />
        <FeatureSection />
      </main>

      <Footer />
    </div>
  );
}
