
import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  targetX: number;
  targetY: number;
}

const MouseTracker = () => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const animationRef = useRef<number>();
  const mouseInfluence = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize floating shapes
    const initialShapes = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 200 + Math.random() * 400,
      color: ['rgba(147, 51, 234, 0.08)', 'rgba(219, 39, 119, 0.06)', 'rgba(59, 130, 246, 0.05)'][i],
      opacity: 0.3 + Math.random() * 0.4,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
    }));
    setShapes(initialShapes);

    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setMousePos(newPos);
      
      // Slowly update mouse influence with dampening
      mouseInfluence.current.x += (newPos.x - mouseInfluence.current.x) * 0.02;
      mouseInfluence.current.y += (newPos.y - mouseInfluence.current.y) * 0.02;
    };

    const animateShapes = () => {
      setShapes(prev => 
        prev.map(shape => {
          // Calculate attraction to mouse (very subtle)
          const mouseAttraction = {
            x: (mouseInfluence.current.x - shape.x) * 0.0001,
            y: (mouseInfluence.current.y - shape.y) * 0.0001,
          };

          // Update velocity with mouse influence and natural drift
          const newVx = shape.vx + mouseAttraction.x + (Math.random() - 0.5) * 0.001;
          const newVy = shape.vy + mouseAttraction.y + (Math.random() - 0.5) * 0.001;

          // Apply velocity dampening
          const dampedVx = newVx * 0.995;
          const dampedVy = newVy * 0.995;

          // Update position
          let newX = shape.x + dampedVx;
          let newY = shape.y + dampedVy;

          // Bounce off edges gently
          if (newX < -shape.size / 2 || newX > window.innerWidth + shape.size / 2) {
            newX = shape.x - dampedVx;
          }
          if (newY < -shape.size / 2 || newY > window.innerHeight + shape.size / 2) {
            newY = shape.y - dampedVy;
          }

          return {
            ...shape,
            x: newX,
            y: newY,
            vx: dampedVx,
            vy: dampedVy,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animateShapes);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animateShapes);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Subtle mouse glow - slower and more diffused */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(147, 51, 234, 0.03), rgba(219, 39, 119, 0.02) 60%, transparent 80%)`,
        }}
      />

      {/* Floating background shapes */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {shapes.map(shape => (
          <div
            key={shape.id}
            className="absolute rounded-full blur-3xl transition-all duration-2000 ease-out"
            style={{
              left: shape.x - shape.size / 2,
              top: shape.y - shape.size / 2,
              width: shape.size,
              height: shape.size,
              background: shape.color,
              opacity: shape.opacity,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default MouseTracker;
