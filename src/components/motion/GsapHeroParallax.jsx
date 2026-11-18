import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GsapHeroParallax({ heroRef, centerpieceRef }) {
  useGSAP(() => {
    if (!heroRef.current || !centerpieceRef.current) return undefined;
    const context = gsap.context(() => {
      gsap.to(centerpieceRef.current, {
        scale: 0.82,
        opacity: 0.28,
        y: -34,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.55,
        },
      });
    }, heroRef);
    return () => context.revert();
  }, { dependencies: [heroRef, centerpieceRef], revertOnUpdate: true });

  return null;
}
