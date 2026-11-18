import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from './useReducedMotion';

/** Desktop-only magnetic attraction with spring return and a 40px capture zone. */
export function useMagnetic(pull = 0.16) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.45 });

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const element = ref.current;
    if (reduced || !finePointer || !element) return undefined;

    const handleMove = (event) => {
      const rect = element.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const reach = Math.max(rect.width, rect.height) / 2 + 40;
      const distance = Math.hypot(dx, dy);
      if (distance > reach) return;
      const falloff = 1 - Math.min(1, Math.max(0, (distance - Math.min(rect.width, rect.height) / 2) / 40));
      rawX.set(dx * pull * falloff);
      rawY.set(dy * pull * falloff);
    };
    const reset = () => { rawX.set(0); rawY.set(0); };

    element.addEventListener('pointermove', handleMove, { passive: true });
    element.addEventListener('pointerleave', reset);
    return () => {
      element.removeEventListener('pointermove', handleMove);
      element.removeEventListener('pointerleave', reset);
    };
  }, [pull, rawX, rawY, reduced]);

  return { ref, style: { x: reduced ? 0 : x, y: reduced ? 0 : y } };
}
