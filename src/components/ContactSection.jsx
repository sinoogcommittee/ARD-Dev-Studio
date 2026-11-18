import { useState } from 'react';
import { profile } from '../data/profile';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { RevealDiv } from '../hooks/useScrollReveal';

const CONTACT_METHODS = [
  {
    label: 'Email',
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <polyline points="2,6 10,12 18,6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: profile.contact.phone,
    href: `tel:${profile.contact.phone.replace(/\s/g, '')}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 3h4l1.5 4-2 1.5c1 2 2.5 3.5 4.5 4.5L13.5 11 17 12.5v4a1 1 0 0 1-1 1C7 17.5 2.5 9 3 4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    value: 'realnariel',
    href: profile.contact.facebook,
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M17 10A7 7 0 1 1 3 10a7 7 0 0 1 14 0z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7h-1.5A1.5 1.5 0 0 0 9 8.5V10H7l.5 2H9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function ContactMethodCard({ label, value, href, icon, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={`Contact via ${label}: ${value}`}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1.25rem 1.375rem',
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: '3px',
        textDecoration: 'none',
        transition: 'border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease',
        color: 'var(--ink)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(184,115,51,0.14)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.1rem' }}>{icon}</span>
      <div>
        <span className="label-caps" style={{ display: 'block', marginBottom: '0.25rem' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--ink)', wordBreak: 'break-all' }}>
          {value}
        </span>
      </div>
    </a>
  );
}

function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = 'Name is required.';
    if (!fields.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Enter a valid email address.';
    if (!fields.message.trim()) e.message = 'Message is required.';
    else if (fields.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('sending');
    try {
      const { error } = await supabase.from('messages').insert([
        {
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.message.trim(),
        },
      ]);
      if (error) throw error;
      setStatus('success');
      setFields({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          padding: '2rem',
          background: 'rgba(90,158,111,0.08)',
          border: '1px solid rgba(90,158,111,0.35)',
          borderRadius: '3px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#2d6a4f', marginBottom: '0.5rem' }}>
          Message sent!
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
          Thank you for reaching out. I'll get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-outline"
          style={{ marginTop: '1.25rem' }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className="form-field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={handleChange}
            aria-describedby={errors.name ? 'err-name' : undefined}
            aria-invalid={!!errors.name}
            placeholder="Your full name"
          />
          {errors.name && <span id="err-name" className="field-error" role="alert">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            aria-describedby={errors.email ? 'err-email' : undefined}
            aria-invalid={!!errors.email}
            placeholder="your@email.com"
          />
          {errors.email && <span id="err-email" className="field-error" role="alert">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={fields.message}
            onChange={handleChange}
            aria-describedby={errors.message ? 'err-message' : undefined}
            aria-invalid={!!errors.message}
            placeholder="Tell me about your project, role, or idea…"
          />
          {errors.message && <span id="err-message" className="field-error" role="alert">{errors.message}</span>}
        </div>

        {status === 'error' && (
          <div
            role="alert"
            aria-live="assertive"
            style={{
              padding: '0.875rem 1rem',
              background: 'rgba(192,57,43,0.07)',
              border: '1px solid rgba(192,57,43,0.25)',
              borderRadius: '2px',
              fontSize: '0.875rem',
              color: '#c0392b',
            }}
          >
            Something went wrong. Please try emailing directly at{' '}
            <a href={`mailto:${profile.contact.email}`} style={{ fontWeight: 600, textDecoration: 'underline' }}>
              {profile.contact.email}
            </a>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
          style={{ alignSelf: 'flex-start' }}
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
          {status !== 'sending' && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad"
      style={{ background: 'var(--paper)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container">

        {/* Section header */}
        <RevealDiv style={{ marginBottom: '3rem' }}>
          <span className="label-caps">Get in Touch</span>
          <hr className="hairline" style={{ marginTop: '0.75rem', marginBottom: '1.25rem', maxWidth: '2.5rem', borderColor: 'var(--accent)', borderWidth: '2px' }} />
          <h2
            id="contact-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.15,
              marginBottom: '0.75rem',
            }}
          >
            Start a Conversation
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--muted)', maxWidth: '40rem', lineHeight: 1.65, marginBottom: '0.75rem' }}>
            Available for project-based, freelance, part-time, or full-time remote roles. Reach out through any of the channels below.
          </p>
        </RevealDiv>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 24rem), 1fr))',
            gap: '3.5rem',
          }}
        >
          {/* Direct contact channels */}
          <RevealDiv>
            <h3 className="label-caps" style={{ marginBottom: '1.25rem' }}>Direct Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
              {CONTACT_METHODS.map((method) => (
                <ContactMethodCard key={method.label} {...method} />
              ))}
            </div>

            <div
              style={{
                padding: '1rem 1.25rem',
                background: 'rgba(184,115,51,0.06)',
                border: '1px solid rgba(184,115,51,0.2)',
                borderRadius: '3px',
              }}
            >
              <span className="label-caps" style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.4rem' }}>Availability</span>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.6 }}>
                {profile.identity.availability}
              </p>
            </div>
          </RevealDiv>

          {/* Contact form or fallback */}
          <RevealDiv delay={100}>
            {isSupabaseConfigured ? (
              <>
                <h3 className="label-caps" style={{ marginBottom: '1.25rem' }}>Send a Message</h3>
                <ContactForm />
              </>
            ) : (
              <>
                <h3 className="label-caps" style={{ marginBottom: '1.25rem' }}>Send a Message</h3>
                <div
                  style={{
                    padding: '1.5rem',
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    borderRadius: '3px',
                  }}
                >
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    The contact form is not yet active. Please use the direct channels on the left to get in touch — email is the fastest way to reach me.
                  </p>
                  <a href={`mailto:${profile.contact.email}`} className="btn-primary">
                    Email Me Directly
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </>
            )}
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}
