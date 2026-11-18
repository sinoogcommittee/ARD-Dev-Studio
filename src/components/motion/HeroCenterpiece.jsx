import { motion } from 'motion/react';
import { Activity, Code2, MapPin } from 'lucide-react';
import { useMouseTilt } from '../../hooks/useMouseTilt';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function HeroCenterpiece() {
  const reduced = useReducedMotion();
  const { tiltStyle, pointerHandlers } = useMouseTilt(6, { deviceOrientation: true });

  return (
    <motion.div
      className="hero-centerpiece"
      style={tiltStyle}
      {...pointerHandlers}
      role="group"
      aria-label="ARD Dev Studio geometric monogram with portfolio facts"
    >
      <div className="centerpiece-glow" aria-hidden="true" />
      <div className="orbital-ring orbital-ring-one" aria-hidden="true"><span /></div>
      <div className="orbital-ring orbital-ring-two" aria-hidden="true"><span /></div>

      <div className="telemetry-badge badge-live">
        <Activity size={13} strokeWidth={1.8} aria-hidden="true" />
        <span><strong>16+</strong><small>LIVE SYSTEMS</small></span>
      </div>
      <div className="telemetry-badge badge-stack">
        <Code2 size={14} strokeWidth={1.8} aria-hidden="true" />
        <span><small>REACT · SUPABASE · .NET</small></span>
      </div>
      <div className="telemetry-badge badge-location">
        <MapPin size={13} strokeWidth={1.8} aria-hidden="true" />
        <span><small>BOHOL, PH</small><small className="badge-status">// ACTIVE</small></span>
      </div>

      <svg className="ard-monogram" viewBox="0 0 520 260" role="img" aria-labelledby="ard-monogram-title">
        <title id="ard-monogram-title">ARD geometric monogram</title>
        <defs>
          <linearGradient id="ard-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFF0C7" />
            <stop offset="0.38" stopColor="#D6AD63" />
            <stop offset="0.7" stopColor="#9D7134" />
            <stop offset="1" stopColor="#F3DEAB" />
          </linearGradient>
          <filter id="ard-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path className="monogram-shadow" d="M28 224 112 30l84 194M62 148h100M207 224V30h88c49 0 76 22 76 61s-27 61-76 61h-88m79 0 91 72M356 30h47c72 0 103 36 103 97s-31 97-103 97h-47z" />
        <path className="monogram-outline" d="M28 224 112 30l84 194M62 148h100M207 224V30h88c49 0 76 22 76 61s-27 61-76 61h-88m79 0 91 72M356 30h47c72 0 103 36 103 97s-31 97-103 97h-47z" />
        <path id="trace-ard-a" className="circuit-trace" d="M28 224 112 30l84 194M62 148h100" />
        <path id="trace-ard-r" className="circuit-trace trace-delay" d="M207 224V30h88c49 0 76 22 76 61s-27 61-76 61h-88m79 0 91 72" />
        <path id="trace-ard-d" className="circuit-trace trace-delay-two" d="M356 30h47c72 0 103 36 103 97s-31 97-103 97h-47z" />
        {!reduced && (
          <>
            <circle r="4" className="energy-pulse"><animateMotion dur="4.6s" repeatCount="indefinite"><mpath href="#trace-ard-a" /></animateMotion></circle>
            <circle r="4" className="energy-pulse"><animateMotion dur="4.2s" begin="1.3s" repeatCount="indefinite"><mpath href="#trace-ard-r" /></animateMotion></circle>
            <circle r="4" className="energy-pulse"><animateMotion dur="4.8s" begin="2.1s" repeatCount="indefinite"><mpath href="#trace-ard-d" /></animateMotion></circle>
          </>
        )}
      </svg>
      <div className="centerpiece-wordmark" aria-hidden="true">ARD DEV STUDIO <span>·</span> FULL-STACK WEB DEVELOPMENT</div>
    </motion.div>
  );
}
