import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import FeatureGrid from '../components/FeatureGrid';
import GallerySection from '../components/GallerySection';
import Hero from '../components/Hero';
import SignatureSection from '../components/SignatureSection';

export default function HomePage() {
  return (
    <main className="space-y-16">
      <Hero />
      <FeatureGrid />
      <SignatureSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
