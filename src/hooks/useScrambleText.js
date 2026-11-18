import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789_//';

function randomIndex(max) {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const value = new Uint32Array(1);
    crypto.getRandomValues(value);
    return value[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export function useScrambleText(text, { duration = 300, step = 30 } = {}) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return undefined;
    }

    let elapsed = 0;
    const timer = window.setInterval(() => {
      elapsed += step;
      if (elapsed >= duration) {
        setDisplay(text);
        window.clearInterval(timer);
        return;
      }

      const settled = Math.floor((elapsed / duration) * text.length);
      setDisplay(Array.from(text, (character, index) => {
        if (character === ' ' || character === '·' || index < settled) return character;
        return GLYPHS[randomIndex(GLYPHS.length)];
      }).join(''));
    }, step);

    return () => window.clearInterval(timer);
  }, [duration, reduced, step, text]);

  return display;
}
