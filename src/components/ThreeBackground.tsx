
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
        color={theme === 'light' ? "#6b7280" : "#4b5563"}
        transparent
        opacity={theme === 'light' ? 0.4 : 0.25}
      />
    </points>
  );
};

// Enhanced floating shape component with different geometries
const FloatingShape = ({ 
  position, 
  color, 
  theme, 
  type = 'sphere' 
}: { 
  position: [number, number, number], 
  color: string, 
  theme: 'light' | 'dark',
  type?: 'sphere' | 'torus' | 'octahedron' | 'tetrahedron'
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const speed = type === 'torus' ? 0.15 : 0.2;
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * (speed * 0.5);
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 'torus':
        return <torusGeometry args={[0.4, 0.15, 8, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.4]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[0.5]} />;
      default:
        return <sphereGeometry args={[0.3, 8, 8]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {getGeometry()}
      <meshBasicMaterial
        color={color}
        transparent
        opacity={theme === 'light' ? 0.3 : 0.18}
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
    // More brand blues with varied shades
    { position: [-4, 1, -3] as [number, number, number], color: theme === 'light' ? '#38bdf8' : '#0ea5e9', type: 'sphere' as const }, // Sky blue
    { position: [3, -1, -2] as [number, number, number], color: theme === 'light' ? '#3b82f6' : '#2563eb', type: 'octahedron' as const }, // Blue
    { position: [-2, -2, -4] as [number, number, number], color: theme === 'light' ? '#1d4ed8' : '#1e40af', type: 'torus' as const }, // Dark blue
    { position: [5, 2, -5] as [number, number, number], color: theme === 'light' ? '#06b6d4' : '#0891b2', type: 'tetrahedron' as const }, // Cyan blue
    { position: [-3, 3, -2] as [number, number, number], color: theme === 'light' ? '#0284c7' : '#0369a1', type: 'sphere' as const }, // Light blue
    { position: [2, -3, -6] as [number, number, number], color: theme === 'light' ? '#2dd4bf' : '#14b8a6', type: 'octahedron' as const }, // Teal blue
    { position: [-5, -1, -1] as [number, number, number], color: theme === 'light' ? '#60a5fa' : '#3b82f6', type: 'sphere' as const }, // Medium blue
    { position: [1, 4, -4] as [number, number, number], color: theme === 'light' ? '#1e3a8a' : '#1e40af', type: 'torus' as const }, // Navy blue
    
    // Complementary colors for balance
    { position: [4, 0, -7] as [number, number, number], color: theme === 'light' ? '#8b5cf6' : '#7c3aed', type: 'sphere' as const }, // Purple accent
    { position: [-1, -4, -3] as [number, number, number], color: theme === 'light' ? '#0891b2' : '#0e7490', type: 'tetrahedron' as const }, // Deep cyan
    
    // Additional blue variations
    { position: [6, -2, -3] as [number, number, number], color: theme === 'light' ? '#1e40af' : '#1d4ed8', type: 'octahedron' as const }, // Royal blue
    { position: [-6, 2, -5] as [number, number, number], color: theme === 'light' ? '#075985' : '#0c4a6e', type: 'torus' as const }, // Deep blue
  ], [theme]);

  // CSS fallback when WebGL is not available
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-br from-gray-100/40 via-transparent to-slate-100/40' : 'bg-gradient-to-br from-gray-900/30 via-transparent to-slate-900/30'}`}>
          <div className={`absolute top-1/4 left-1/4 w-32 h-32 ${theme === 'light' ? 'bg-gray-400/20' : 'bg-gray-700/15'} rounded-full blur-xl animate-pulse`}></div>
          <div className={`absolute top-3/4 right-1/4 w-24 h-24 ${theme === 'light' ? 'bg-slate-400/20' : 'bg-slate-700/15'} rounded-full blur-xl animate-pulse`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute top-1/2 left-3/4 w-28 h-28 ${theme === 'light' ? 'bg-gray-400/20' : 'bg-gray-700/15'} rounded-full blur-xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
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
            <pointLight position={[5, 5, 5]} intensity={0.2} color={theme === 'light' ? "#6b7280" : "#374151"} />
            
            {shapes.map((shape, index) => (
              <FloatingShape
                key={index}
                position={shape.position}
                color={shape.color}
                theme={theme}
                type={shape.type}
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
