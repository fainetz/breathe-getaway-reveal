
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

// Simplified floating particles component
const FloatingParticles = ({ theme }: { theme: 'light' | 'dark' }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const positions = new Float32Array(100 * 3); // Reduced from 200 to 100
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={particlesGeometry}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={theme === 'light' ? "#6366f1" : "#8b5cf6"}
        transparent
        opacity={theme === 'light' ? 0.6 : 0.4}
      />
    </points>
  );
};

// Simplified floating shape component
const FloatingShape = ({ position, color, theme }: { position: [number, number, number], color: string, theme: 'light' | 'dark' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={theme === 'light' ? 0.4 : 0.3}
        wireframe
      />
    </mesh>
  );
};

const ThreeBackground = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      console.log('WebGL not supported:', e);
      setHasWebGL(false);
    }
  }, []);

  const shapes = useMemo(() => [
    { position: [-4, 1, -3] as [number, number, number], color: theme === 'light' ? '#6366f1' : '#8b5cf6' },
    { position: [3, -1, -2] as [number, number, number], color: theme === 'light' ? '#d946ef' : '#ec4899' },
    { position: [-2, -2, -4] as [number, number, number], color: theme === 'light' ? '#3b82f6' : '#3b82f6' },
  ], [theme]);

  // CSS fallback when WebGL is not available
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-br from-purple-100/60 via-transparent to-pink-100/60' : 'bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20'}`}>
          <div className={`absolute top-1/4 left-1/4 w-32 h-32 ${theme === 'light' ? 'bg-purple-400/30' : 'bg-purple-500/20'} rounded-full blur-xl animate-pulse`}></div>
          <div className={`absolute top-3/4 right-1/4 w-24 h-24 ${theme === 'light' ? 'bg-pink-400/30' : 'bg-pink-500/20'} rounded-full blur-xl animate-pulse`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute top-1/2 left-3/4 w-28 h-28 ${theme === 'light' ? 'bg-blue-400/30' : 'bg-blue-500/20'} rounded-full blur-xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        onCreated={() => setIsLoaded(true)}
        onError={(error) => {
          console.log('Three.js error:', error);
          setHasWebGL(false);
        }}
      >
        {isLoaded && (
          <>
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={0.3} color={theme === 'light' ? "#6366f1" : "#8b5cf6"} />
            
            {shapes.map((shape, index) => (
              <FloatingShape
                key={index}
                position={shape.position}
                color={shape.color}
                theme={theme}
              />
            ))}
            
            <FloatingParticles theme={theme} />
          </>
        )}
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
