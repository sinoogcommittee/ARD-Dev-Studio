import { useState, useRef, useEffect } from 'react';

/**
 * Hook for 3D card perspective tilt and cursor spotlight tracking.
 * Automatically disabled if user has prefers-reduced-motion set.
 */
export function useMouseTilt(maxTilt = 8) {
  const ref = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -maxTilt;
      const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(6px)`,
        transition: 'transform 80ms ease-out',
      });

      setSpotlightPos({
        x: percentX.toFixed(1),
        y: percentY.toFixed(1),
        opacity: 1,
      });
    };

    const handleMouseLeave = () => {
      setTiltStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      });
      setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return { ref, tiltStyle, spotlightPos };
}
