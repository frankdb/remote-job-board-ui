import Hero from "@/components/marketing/Hero";
import Navbar from "@/components/shared/Navbar";
import Features from "@/components/marketing/Features";
import Footer from "@/components/marketing/Footer";
import CTA from "@/components/marketing/CTA";
import NewsletterSubscription from "@/components/marketing/NewsletterSubscription";

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
