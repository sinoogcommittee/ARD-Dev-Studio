import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MobileFloatingNav from './components/MobileFloatingNav';
import InstallAppPrompt from './components/InstallAppPrompt';
import { useSiteSettings } from './hooks/useSiteSettings';

const AdminPortal = lazy(() => import('./components/AdminPortal'));

export default function App() {
  const { currentStatus, updateStatus } = useSiteSettings();
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    // Open portal via URL hash (#admin)
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);

    // Keyboard shortcut: Ctrl+Shift+A / Cmd+Shift+A
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleCloseAdmin = () => {
    setAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="bg-[#101114] text-[#F2F0EB] min-h-screen selection:bg-[#D6AD63]/30 selection:text-[#E5BE75]">
      <Header currentStatus={currentStatus} />
      <main id="main-content" tabIndex={-1}>
        <Hero currentStatus={currentStatus} />
        <ProjectGallery />
        <AboutSection />
        <ContactSection currentStatus={currentStatus} />
      </main>
      <Footer currentStatus={currentStatus} onOpenAdmin={() => setAdminOpen(true)} />

      {/* Floating Bottom Navigation for Mobile & Tablet Portrait */}
      <MobileFloatingNav />

      {/* PWA App Install Banner for Mobile & Desktop */}
      <InstallAppPrompt />

      {adminOpen && (
        <Suspense fallback={null}>
          <AdminPortal
            isOpen={adminOpen}
            onClose={handleCloseAdmin}
            currentStatus={currentStatus}
            onStatusUpdated={updateStatus}
          />
        </Suspense>
      )}
    </div>
  );
}
