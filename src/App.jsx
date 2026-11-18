import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#101114] text-[#F2F0EB] min-h-screen selection:bg-[#D6AD63]/30 selection:text-[#E5BE75]">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProjectGallery />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
