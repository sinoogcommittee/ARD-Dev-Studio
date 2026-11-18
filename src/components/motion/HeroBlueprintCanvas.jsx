import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const GOLD = '214, 173, 99';

export default function HeroBlueprintCanvas() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let lastDraw = 0;
    const pointer = { x: -9999, y: -9999 };
    const particles = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(34, Math.max(12, Math.floor((width * height) / 36000)));
      particles.length = 0;
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 1.3 + 0.5,
        });
      }
    };

    const draw = (now = 0) => {
      context.clearRect(0, 0, width, height);
      const gap = 46;
      context.lineWidth = 0.6;
      context.strokeStyle = `rgba(${GOLD}, 0.09)`;
      context.beginPath();
      for (let x = 0; x <= width; x += gap) { context.moveTo(x, 0); context.lineTo(x, height); }
      for (let y = 0; y <= height; y += gap) { context.moveTo(0, y); context.lineTo(width, y); }
      context.stroke();

      const seconds = now / 1000;
      const pulseX = ((seconds * 66) % (width + gap)) - gap;
      const pulseY = ((seconds * 43) % (height + gap)) - gap;
      const drawPulse = (x, y) => {
        const gradient = context.createRadialGradient(x, y, 0, x, y, 18);
        gradient.addColorStop(0, `rgba(${GOLD}, 0.5)`);
        gradient.addColorStop(1, `rgba(${GOLD}, 0)`);
        context.fillStyle = gradient;
        context.fillRect(x - 18, y - 18, 36, 36);
        context.fillStyle = `rgba(${GOLD}, 0.8)`;
        context.beginPath(); context.arc(x, y, 1.5, 0, Math.PI * 2); context.fill();
      };
      if (!reduced) {
        drawPulse(pulseX, Math.round(pulseY / gap) * gap);
        drawPulse(Math.round(pulseX / gap) * gap, pulseY);
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        if (!reduced) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 130 && distance > 0) {
            const force = (1 - distance / 130) * 0.002;
            particle.vx += dx * force;
            particle.vy += dy * force;
          }
          particle.vx *= 0.99;
          particle.vy *= 0.99;
          particle.x = (particle.x + particle.vx + width) % width;
          particle.y = (particle.y + particle.vy + height) % height;
        }

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance < 92) {
            context.strokeStyle = `rgba(${GOLD}, ${(1 - distance / 92) * 0.15})`;
            context.lineWidth = 0.65;
            context.beginPath(); context.moveTo(particle.x, particle.y); context.lineTo(other.x, other.y); context.stroke();
          }
        }

        const pointerDistance = Math.hypot(pointer.x - particle.x, pointer.y - particle.y);
        if (!reduced && pointerDistance < 150) {
          context.strokeStyle = `rgba(${GOLD}, ${(1 - pointerDistance / 150) * 0.17})`;
          context.lineWidth = 0.7;
          context.beginPath(); context.moveTo(pointer.x, pointer.y); context.lineTo(particle.x, particle.y); context.stroke();
        }
        context.fillStyle = `rgba(${GOLD}, ${reduced ? 0.2 : 0.4})`;
        context.beginPath(); context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2); context.fill();
      }
    };

    const render = (now) => {
      if (document.hidden) return;
      if (now - lastDraw >= 32) {
        lastDraw = now;
        draw(now);
      }
      frame = window.requestAnimationFrame(render);
    };
    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => { pointer.x = -9999; pointer.y = -9999; };
    const onVisibilityChange = () => {
      window.cancelAnimationFrame(frame);
      if (document.hidden) return;
      if (reduced) draw();
      else frame = window.requestAnimationFrame(render);
    };

    resize();
    if (reduced) draw();
    else frame = window.requestAnimationFrame(render);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="hero-blueprint-canvas" aria-hidden="true" />;
}
