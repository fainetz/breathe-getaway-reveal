
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// Floating particles component
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const positions = new Float32Array(100 * 3); // Reduced particle count
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
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
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
        size={0.15}
        color="#8b5cf6"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

// Animated geometric shapes
const FloatingShape = ({ position, color, type }: { position: [number, number, number], color: string, type: 'sphere' | 'box' | 'torus' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });

  const renderShape = () => {
    switch (type) {
      case 'sphere':
        return <Sphere args={[0.4, 12, 12]} />;
      case 'box':
        return <Box args={[0.6, 0.6, 0.6]} />;
      case 'torus':
        return <Torus args={[0.3, 0.15, 6, 12]} />;
      default:
        return <Sphere args={[0.4, 12, 12]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderShape()}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
};

// Fallback component for when 3D fails
const Fallback = () => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-purple-500/10 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        />
      ))}
    </div>
  </div>
);

const Scene = () => {
  const shapes = useMemo(() => [
    { position: [-6, 1, -4] as [number, number, number], color: '#8b5cf6', type: 'sphere' as const },
    { position: [4, -1, -3] as [number, number, number], color: '#ec4899', type: 'box' as const },
    { position: [-2, -2, -5] as [number, number, number], color: '#3b82f6', type: 'torus' as const },
    { position: [3, 3, -4] as [number, number, number], color: '#8b5cf6', type: 'sphere' as const },
  ], []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={0.4} color="#8b5cf6" />
      <pointLight position={[-8, -8, -8]} intensity={0.2} color="#ec4899" />
      
      {/* Animated shapes */}
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          color={shape.color}
          type={shape.type}
        />
      ))}
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Subtle camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.1}
      />
    </>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: false, 
            alpha: true,
            powerPreference: "default"
          }}
          onCreated={({ gl }) => {
            console.log('Three.js canvas created successfully');
            gl.setClearColor(0x000000, 0);
          }}
          onError={(error) => {
            console.error('Three.js error:', error);
          }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ThreeBackground;
