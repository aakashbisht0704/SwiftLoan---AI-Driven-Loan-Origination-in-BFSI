import Image from "next/image";
import Hero from "./components/hero";
import Features from "./components/features";
import Pricing from "./components/pricing";
import Testimonials from "./components/testimonials";
import FAQSection from "./components/faqSection";

export default function Home() {
  return (
    <>
    <Hero></Hero>
    <Features></Features>
    <Pricing></Pricing>
    <Testimonials></Testimonials>
    <FAQSection></FAQSection>
    </>
  );
}
