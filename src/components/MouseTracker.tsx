
import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const MouseTracker = () => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setMousePos(newPos);

      // Create particles when mouse moves fast enough
      const speed = Math.sqrt(
        Math.pow(newPos.x - lastMousePos.current.x, 2) + 
        Math.pow(newPos.y - lastMousePos.current.y, 2)
      );

      if (speed > 5) {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: newPos.x,
          y: newPos.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 100,
          maxLife: 100,
        };

        setParticles(prev => [...prev.slice(-15), newParticle]);
      }

      lastMousePos.current = newPos;
    };

    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98,
        })).filter(particle => particle.life > 0)
      );

      animationRef.current = requestAnimationFrame(animateParticles);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Mouse spotlight effect */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(147, 51, 234, 0.15), rgba(219, 39, 119, 0.1) 40%, transparent 80%)`,
        }}
      />

      {/* Particle system */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.life / particle.maxLife,
              transform: `scale(${particle.life / particle.maxLife})`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default MouseTracker;
