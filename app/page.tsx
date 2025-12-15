import HeaderNav from "./sections/HeaderNav";
import Hero from "./sections/Hero";
import FeatureChips from "./sections/FeatureChips";
import StorySection from "./sections/Story";
import ProductGrid from "./sections/ProductGrid";
import StatBand from "./sections/Banner";
import Stats from "./sections/Stats";
import Testimonials from "./sections/Testimonials";
import NewsKnowledge from "./sections/CustomFurniture";
import ContactMap from "./sections/ContactMap";
import Footer from "./sections/Footer";

export default function Page() {
  return (
    <main>
      <HeaderNav />
      <Hero />
      <StorySection />
      <FeatureChips />
      <ProductGrid />
      <StatBand />
      <Stats />
      <Testimonials />
      <NewsKnowledge />
      <ContactMap />
      <Footer />
    </main>
  );
}
