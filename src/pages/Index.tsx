import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Products limit={6} showHeader={true} showCTA={true} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
