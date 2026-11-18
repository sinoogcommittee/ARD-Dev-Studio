import { useState } from 'react';
import { profile } from '../data/profile';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { RevealDiv } from '../hooks/useScrollReveal';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please include a message or inquiry details.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!isSupabaseConfigured) {
      // Graceful fallback: launch default mail client
      window.location.href = `mailto:${profile.contact.email}?subject=Project%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage(
        'Unable to send message via database. Please email directly at rieldiango24@gmail.com'
      );
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-spacing bg-[#101114] relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-[#D6AD63]/5 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <RevealDiv className="mb-14 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD63]" />
            <span className="mono-caps text-[#D6AD63]">Get in Touch</span>
          </div>
          <h2
            id="contact-heading"
            className="font-display text-3xl sm:text-5xl font-bold text-[#F2F0EB] tracking-tight mb-4"
          >
            Start a Conversation
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            Interested in building a custom web application, school management portal, or sports tabulation engine?
            Let’s discuss your operational goals and technical requirements.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ─── Left Column: Direct Contact Methods & Availability ─── */}
          <div className="lg:col-span-5 space-y-6">
            <RevealDiv className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#A1A1AA] font-bold">
                Direct Channels
              </h3>

              {/* Email Card */}
              <a
                href={`mailto:${profile.contact.email}`}
                className="p-5 rounded-lg bg-[#17191E] border border-[#292C32] hover:border-[#D6AD63] transition-all flex items-start gap-4 group block"
              >
                <div className="w-10 h-10 rounded-md bg-[#1E2127] border border-[#292C32] flex items-center justify-center text-[#D6AD63] group-hover:scale-105 transition-transform shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#F2F0EB] group-hover:text-[#D6AD63] transition-colors break-all">
                    {profile.contact.email}
                  </span>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    Typically responds within 24 hours
                  </p>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${profile.contact.phone.replace(/\s+/g, '')}`}
                className="p-5 rounded-lg bg-[#17191E] border border-[#292C32] hover:border-[#D6AD63] transition-all flex items-start gap-4 group block"
              >
                <div className="w-10 h-10 rounded-md bg-[#1E2127] border border-[#292C32] flex items-center justify-center text-[#D6AD63] group-hover:scale-105 transition-transform shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider block">
                    Phone / SMS
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#F2F0EB] group-hover:text-[#D6AD63] transition-colors">
                    {profile.contact.phone}
                  </span>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    Call or send an SMS inquiry directly
                  </p>
                </div>
              </a>

              {/* Facebook Card */}
              <a
                href={profile.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-lg bg-[#17191E] border border-[#292C32] hover:border-[#D6AD63] transition-all flex items-start gap-4 group block"
              >
                <div className="w-10 h-10 rounded-md bg-[#1E2127] border border-[#292C32] flex items-center justify-center text-[#D6AD63] group-hover:scale-105 transition-transform shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider block">
                    Facebook Profile
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#F2F0EB] group-hover:text-[#D6AD63] transition-colors">
                    facebook.com/realnariel
                  </span>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    Connect or message via Messenger
                  </p>
                </div>
              </a>
            </RevealDiv>

            {/* Availability Box */}
            <RevealDiv delay={60} className="p-6 rounded-lg bg-gradient-to-br from-[#17191E] to-[#1E2127] border border-[#292C32]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Current Status
                </span>
              </div>
              <p className="text-sm font-semibold text-[#F2F0EB] mb-1">
                {profile.identity.availability}
              </p>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Based in Guinacot, Guindulman, Bohol, Philippines. Ready to collaborate across global timezones.
              </p>
            </RevealDiv>
          </div>

          {/* ─── Right Column: Interactive Form / Fallback ─────────── */}
          <div className="lg:col-span-7">
            <RevealDiv delay={90} className="p-8 rounded-xl bg-[#17191E] border border-[#292C32] relative">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#292C32]">
                <h3 className="font-display text-xl font-bold text-[#F2F0EB]">
                  Send a Direct Message
                </h3>
                <span className="font-mono text-xs text-[#A1A1AA]">
                  {isSupabaseConfigured ? 'Direct API Form' : 'Graceful Mail Fallback'}
                </span>
              </div>

              {!isSupabaseConfigured && (
                <div className="mb-6 p-4 rounded-lg bg-[#D6AD63]/10 border border-[#D6AD63]/30 text-xs text-[#F2F0EB] flex items-start gap-3">
                  <span className="text-[#D6AD63] text-base font-bold">ℹ</span>
                  <p className="leading-relaxed">
                    The contact form is in direct-client mode. Submitting this form will automatically prepare an email to{' '}
                    <strong className="text-[#D6AD63]">{profile.contact.email}</strong> with your provided details.
                  </p>
                </div>
              )}

              {status === 'success' ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-xl">
                    ✓
                  </div>
                  <h4 className="font-display font-bold text-xl text-[#F2F0EB] mb-2">
                    Message Sent Successfully
                  </h4>
                  <p className="text-sm text-[#A1A1AA] max-w-md mx-auto mb-6">
                    Thank you for reaching out. Your inquiry has been received and Anthony Riel C. Diango will be in touch shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-gold-primary text-xs py-2 px-5"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block font-mono text-xs uppercase tracking-wider text-[#A1A1AA] mb-2 font-medium"
                    >
                      Your Name <span className="text-[#D6AD63]">*</span>
                    </label>
                    <input
                      id="form-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Maria Santos"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`input-dark ${errors.name ? 'border-red-500/80 focus:border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="text-xs text-red-400 mt-1.5 font-mono">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="form-email"
                      className="block font-mono text-xs uppercase tracking-wider text-[#A1A1AA] mb-2 font-medium"
                    >
                      Email Address <span className="text-[#D6AD63]">*</span>
                    </label>
                    <input
                      id="form-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="maria@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`input-dark ${errors.email ? 'border-red-500/80 focus:border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="text-xs text-red-400 mt-1.5 font-mono">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="form-message"
                      className="block font-mono text-xs uppercase tracking-wider text-[#A1A1AA] mb-2 font-medium"
                    >
                      Project Requirements &amp; Message <span className="text-[#D6AD63]">*</span>
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe the website, operational portal, or role you want to discuss..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`input-dark resize-y ${errors.message ? 'border-red-500/80 focus:border-red-500' : ''}`}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="text-xs text-red-400 mt-1.5 font-mono">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submission Error Banner */}
                  {status === 'error' && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 leading-relaxed"
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-gold-primary py-3 px-7 text-sm font-semibold tracking-wide disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <span>Submitting...</span>
                      ) : (
                        <span>
                          {isSupabaseConfigured ? 'Transmit Message' : 'Send via Direct Email'}
                        </span>
                      )}
                    </button>

                    <span className="font-mono text-[11px] text-[#71717A]">
                      Direct &amp; confidential
                    </span>
                  </div>
                </form>
              )}
            </RevealDiv>
          </div>

        </div>
      </div>
    </section>
  );
}
