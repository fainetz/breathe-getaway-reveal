
import { useState, useEffect } from 'react';
import { Plane, Map, Luggage, Route, Tent, Ship } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface FloatingElement {
  id: number;
  icon: React.ReactNode;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  scale: number;
  rotation: number;
  rotationSpeed: number;
}

const FloatingTravelElements = () => {
  const { theme } = useTheme();
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const icons = [
      <Plane className="w-4 h-4" />,
      <Map className="w-4 h-4" />,
      <Luggage className="w-4 h-4" />,
      <Route className="w-4 h-4" />,
      <Tent className="w-4 h-4" />,
      <Ship className="w-4 h-4" />
    ];

    const initialElements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      opacity: 0.1 + Math.random() * 0.15,
      scale: 0.8 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
    }));

    setElements(initialElements);

    const animateElements = () => {
      setElements(prev => 
        prev.map(element => {
          let newX = element.x + element.vx;
          let newY = element.y + element.vy;
          let newVx = element.vx;
          let newVy = element.vy;

          // Bounce off edges
          if (newX < -50 || newX > window.innerWidth + 50) {
            newVx = -element.vx;
            newX = element.x + newVx;
          }
          if (newY < -50 || newY > window.innerHeight + 50) {
            newVy = -element.vy;
            newY = element.y + newVy;
          }

          return {
            ...element,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: element.rotation + element.rotationSpeed,
          };
        })
      );
    };

    const interval = setInterval(animateElements, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {elements.map(element => (
        <div
          key={element.id}
          className={`absolute transition-all duration-1000 ${
            theme === 'light' ? 'text-purple-400' : 'text-purple-300'
          }`}
          style={{
            left: element.x,
            top: element.y,
            opacity: element.opacity,
            transform: `scale(${element.scale}) rotate(${element.rotation}deg)`,
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingTravelElements;
