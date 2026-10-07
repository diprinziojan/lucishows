import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BrandCarousel } from '@/components/BrandCarousel';
import { Intro } from '@/components/Intro';
import { Results } from '@/components/Results';
import { ViralReels } from '@/components/ViralReels';
import { Pricing } from '@/components/Pricing';
import { ContactForms } from '@/components/ContactForms';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BrandCarousel />
        <Intro />
        <Results />
        <ViralReels />
        <Pricing />
        <ContactForms />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
