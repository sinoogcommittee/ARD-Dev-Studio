import { useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'motion/react';
import { useReducedMotion } from './useReducedMotion';

/** Spring-based pointer tilt and spotlight, with no sensor permission prompts. */
export function useMouseTilt(maxTilt = 7, { deviceOrientation = false } = {}) {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 190, damping: 24, mass: 0.7 });
  const rotateY = useSpring(rawY, { stiffness: 190, damping: 24, mass: 0.7 });
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const rawOpacity = useMotionValue(0);
  const opacity = useSpring(rawOpacity, { stiffness: 240, damping: 28 });

  useEffect(() => {
    if (reduced || !deviceOrientation || !window.matchMedia('(pointer: coarse)').matches) return undefined;
    if (!('DeviceOrientationEvent' in window)) return undefined;

    const onOrientation = (event) => {
      if (event.beta == null || event.gamma == null) return;
      const clamp = (value) => Math.max(-maxTilt, Math.min(maxTilt, value));
      rawX.set(clamp((event.beta - 45) * 0.12));
      rawY.set(clamp(event.gamma * 0.16));
    };
    window.addEventListener('deviceorientation', onOrientation, { passive: true });
    return () => window.removeEventListener('deviceorientation', onOrientation);
  }, [deviceOrientation, maxTilt, rawX, rawY, reduced]);

  const tiltStyle = {
    rotateX: reduced ? 0 : rotateX,
    rotateY: reduced ? 0 : rotateY,
    transformPerspective: 900,
    '--spot-x': useTransform(pointerX, (value) => `${value}%`),
    '--spot-y': useTransform(pointerY, (value) => `${value}%`),
    '--spot-opacity': reduced ? 0 : opacity,
  };

  const onPointerMove = (event) => {
    if (reduced || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    rawX.set((0.5 - y) * maxTilt);
    rawY.set((x - 0.5) * maxTilt);
    pointerX.set(x * 100);
    pointerY.set(y * 100);
    rawOpacity.set(1);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
    rawOpacity.set(0);
  };

  return {
    tiltStyle,
    spotlightPos: { x: pointerX, y: pointerY, opacity },
    pointerHandlers: { onPointerMove, onPointerLeave },
  };
}
