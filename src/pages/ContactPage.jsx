import ContactSection from '../components/ContactSection';

export default function ContactPage({ currentStatus }) {
  return (
    <main id="main-content" tabIndex={-1}>
      <ContactSection currentStatus={currentStatus} />
    </main>
  );
}
