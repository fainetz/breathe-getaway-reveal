
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

// Simple airplane component
const Airplane = ({ position, color, theme }: { position: [number, number, number], color: string, theme: 'light' | 'dark' }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth flying motion
      groupRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.2 + position[1]) * 0.5;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Airplane body */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.15, 1.2, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={theme === 'light' ? 0.6 : 0.4}
        />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.8, 0.1, 0.3]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={theme === 'light' ? 0.5 : 0.3}
        />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0.3, -0.4]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.4]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={theme === 'light' ? 0.5 : 0.3}
        />
      </mesh>
    </group>
  );
};

// Simple cloud component
const Cloud = ({ position, theme }: { position: [number, number, number], theme: 'light' | 'dark' }) => {
  const cloudRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.1 + position[0]) * 0.5;
      cloudRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const cloudColor = theme === 'light' ? '#ffffff' : '#f0f0f0';

  return (
    <group ref={cloudRef} position={position}>
      {/* Multiple spheres to create cloud shape */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshBasicMaterial
          color={cloudColor}
          transparent
          opacity={theme === 'light' ? 0.3 : 0.1}
        />
      </mesh>
      <mesh position={[0.3, 0.1, 0]}>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshBasicMaterial
          color={cloudColor}
          transparent
          opacity={theme === 'light' ? 0.25 : 0.08}
        />
      </mesh>
      <mesh position={[-0.3, 0.1, 0]}>
        <sphereGeometry args={[0.35, 8, 6]} />
        <meshBasicMaterial
          color={cloudColor}
          transparent
          opacity={theme === 'light' ? 0.25 : 0.08}
        />
      </mesh>
    </group>
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

  const airplanes = useMemo(() => [
    { position: [-6, 2, -4] as [number, number, number], color: theme === 'light' ? '#6366f1' : '#8b5cf6' },
    { position: [4, -1, -3] as [number, number, number], color: theme === 'light' ? '#d946ef' : '#ec4899' },
    { position: [-2, -3, -5] as [number, number, number], color: theme === 'light' ? '#3b82f6' : '#3b82f6' },
  ], [theme]);

  const clouds = useMemo(() => [
    { position: [-8, 3, -6] as [number, number, number] },
    { position: [6, 1, -7] as [number, number, number] },
    { position: [-3, -2, -8] as [number, number, number] },
    { position: [2, 4, -5] as [number, number, number] },
  ], []);

  // CSS fallback when WebGL is not available
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-br from-sky-100/60 via-transparent to-blue-100/60' : 'bg-gradient-to-br from-sky-900/20 via-transparent to-blue-900/20'}`}>
          <div className={`absolute top-1/4 left-1/4 w-8 h-4 ${theme === 'light' ? 'bg-blue-400/40' : 'bg-blue-500/30'} rounded-full blur-sm animate-pulse`}></div>
          <div className={`absolute top-3/4 right-1/4 w-6 h-3 ${theme === 'light' ? 'bg-purple-400/40' : 'bg-purple-500/30'} rounded-full blur-sm animate-pulse`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute top-1/2 left-3/4 w-7 h-3 ${theme === 'light' ? 'bg-pink-400/40' : 'bg-pink-500/30'} rounded-full blur-sm animate-pulse`} style={{ animationDelay: '2s' }}></div>
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
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.4} color={theme === 'light' ? "#87CEEB" : "#4682B4"} />
            
            {airplanes.map((airplane, index) => (
              <Airplane
                key={`airplane-${index}`}
                position={airplane.position}
                color={airplane.color}
                theme={theme}
              />
            ))}
            
            {clouds.map((cloud, index) => (
              <Cloud
                key={`cloud-${index}`}
                position={cloud.position}
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
