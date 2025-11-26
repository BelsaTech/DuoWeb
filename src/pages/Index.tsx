import { Hero } from "@/components/Hero";
import { Screenshots } from "@/components/Screenshots";
import { Features } from "@/components/Features";
import { PreRegistration } from "@/components/PreRegistration";
import { Footer } from "@/components/Footer";

const Index = () => {
  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Hero onCTAClick={scrollToRegistration} />
      <Screenshots />
      <Features />
      <PreRegistration />
      <Footer />
    </div>
  );
};

export default Index;
