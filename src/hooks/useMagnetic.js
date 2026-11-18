import { useState, useRef, useEffect } from 'react';

/**
 * Hook for subtle magnetic button physics.
 * Pulls button slightly toward the cursor on hover.
 */
export function useMagnetic(pull = 0.28) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * pull;
      const deltaY = (e.clientY - centerY) * pull;

      setStyle({
        transform: `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`,
        transition: 'transform 100ms ease-out',
      });
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: 'translate3d(0, 0, 0)',
        transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pull]);

  return { ref, style };
}
