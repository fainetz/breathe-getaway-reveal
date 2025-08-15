
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
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  // Check mobile and WebGL support
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

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

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shapes = useMemo(() => {
    // Mobile-optimized positions - closer and fewer shapes
    if (isMobile) {
      return [
        { position: [-2, 1, -2] as [number, number, number], color: theme === 'light' ? '#1e40af' : '#3b82f6', type: 'sphere' as const },
        { position: [2, -1, -3] as [number, number, number], color: theme === 'light' ? '#059669' : '#10b981', type: 'octahedron' as const },
        { position: [-1, -2, -2] as [number, number, number], color: theme === 'light' ? '#ec4899' : '#f472b6', type: 'torus' as const },
        { position: [1, 2, -4] as [number, number, number], color: theme === 'light' ? '#374151' : '#6b7280', type: 'tetrahedron' as const },
        { position: [-2, 0, -3] as [number, number, number], color: theme === 'light' ? '#0f766e' : '#14b8a6', type: 'sphere' as const },
      ];
    }
    
    // Desktop positions - more spread out
    return [
      { position: [-4, 1, -3] as [number, number, number], color: theme === 'light' ? '#1e40af' : '#3b82f6', type: 'sphere' as const },
      { position: [3, -1, -2] as [number, number, number], color: theme === 'light' ? '#059669' : '#10b981', type: 'octahedron' as const },
      { position: [-2, -2, -4] as [number, number, number], color: theme === 'light' ? '#ec4899' : '#f472b6', type: 'torus' as const },
      { position: [5, 2, -5] as [number, number, number], color: theme === 'light' ? '#374151' : '#6b7280', type: 'tetrahedron' as const },
      { position: [-3, 3, -2] as [number, number, number], color: theme === 'light' ? '#1e3a8a' : '#2563eb', type: 'sphere' as const },
      { position: [2, -3, -6] as [number, number, number], color: theme === 'light' ? '#065f46' : '#047857', type: 'octahedron' as const },
      { position: [-5, -1, -1] as [number, number, number], color: theme === 'light' ? '#1f2937' : '#4b5563', type: 'sphere' as const },
      { position: [1, 4, -4] as [number, number, number], color: theme === 'light' ? '#0f766e' : '#14b8a6', type: 'torus' as const },
      { position: [4, 0, -7] as [number, number, number], color: theme === 'light' ? '#111827' : '#1f2937', type: 'sphere' as const },
      { position: [-1, -4, -3] as [number, number, number], color: theme === 'light' ? '#1d4ed8' : '#3b82f6', type: 'tetrahedron' as const },
      { position: [6, -2, -3] as [number, number, number], color: theme === 'light' ? '#047857' : '#059669', type: 'octahedron' as const },
      { position: [-6, 2, -5] as [number, number, number], color: theme === 'light' ? '#1e40af' : '#2563eb', type: 'torus' as const },
    ];
  }, [theme, isMobile]);

  // Mobile-first CSS fallback
  if (!hasWebGL || isMobile) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-br from-gray-50/30 via-transparent to-gray-100/20' : 'bg-gradient-to-br from-gray-900/20 via-transparent to-gray-950/15'}`}>
          {/* Mobile-optimized decorative elements */}
          <div className={`absolute top-1/4 left-[10%] w-16 h-16 md:w-32 md:h-32 ${theme === 'light' ? 'bg-gray-400/15' : 'bg-gray-600/10'} rounded-full blur-xl animate-pulse`}></div>
          <div className={`absolute top-2/3 right-[15%] w-12 h-12 md:w-24 md:h-24 ${theme === 'light' ? 'bg-gray-400/15' : 'bg-gray-600/10'} rounded-full blur-xl animate-pulse`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute top-1/2 left-3/4 w-14 h-14 md:w-28 md:h-28 ${theme === 'light' ? 'bg-gray-400/15' : 'bg-gray-600/10'} rounded-full blur-xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
          {/* Additional mobile elements */}
          <div className={`absolute top-[15%] right-[25%] w-8 h-8 md:w-20 md:h-20 ${theme === 'light' ? 'bg-gray-400/10' : 'bg-gray-600/8'} rounded-full blur-lg animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
          <div className={`absolute bottom-1/4 left-[20%] w-10 h-10 md:w-24 md:h-24 ${theme === 'light' ? 'bg-gray-400/12' : 'bg-gray-600/8'} rounded-full blur-lg animate-pulse`} style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ 
          position: [0, 0, isMobile ? 6 : 8], 
          fov: isMobile ? 70 : 60 
        }}
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
            <ambientLight intensity={isMobile ? 0.15 : 0.2} />
            <pointLight 
              position={[5, 5, 5]} 
              intensity={isMobile ? 0.15 : 0.2} 
              color={theme === 'light' ? "#6b7280" : "#374151"} 
            />
            
            {shapes.map((shape, index) => (
              <FloatingShape
                key={index}
                position={shape.position}
                color={shape.color}
                theme={theme}
                type={shape.type}
              />
            ))}
            
            {!isMobile && <FloatingParticles theme={theme} />}
          </>
        )}
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
