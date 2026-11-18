import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver-based scroll reveal.
 * Adds "visible" class to observed elements when they enter the viewport.
 * No-ops gracefully when IntersectionObserver is unavailable.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // Respect prefers-reduced-motion — make everything visible immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -48px 0px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/**
 * Convenience wrapper: returns props to spread onto a div.
 * className receives "reveal" always, "reveal visible" when in view.
 */
export function RevealDiv({ children, className = '', delay = 0, style = {}, ...rest }) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
