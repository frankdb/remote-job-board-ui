import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import NewsletterSubscription from "@/components/NewsletterSubscription";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CTA />
      <Features />
      <NewsletterSubscription />
      <Footer />
    </>
  );
}
