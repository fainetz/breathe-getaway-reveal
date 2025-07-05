
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Floating particles component
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particlesGeometry}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8b5cf6"
        transparent
        opacity={0.6}
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
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const renderShape = () => {
    switch (type) {
      case 'sphere':
        return <Sphere args={[0.5, 16, 16]} />;
      case 'box':
        return <Box args={[0.8, 0.8, 0.8]} />;
      case 'torus':
        return <Torus args={[0.4, 0.2, 8, 16]} />;
      default:
        return <Sphere args={[0.5, 16, 16]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderShape()}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        wireframe
      />
    </mesh>
  );
};

const ThreeBackground = () => {
  const shapes = useMemo(() => [
    { position: [-8, 2, -5] as [number, number, number], color: '#8b5cf6', type: 'sphere' as const },
    { position: [6, -1, -3] as [number, number, number], color: '#ec4899', type: 'box' as const },
    { position: [-3, -3, -8] as [number, number, number], color: '#3b82f6', type: 'torus' as const },
    { position: [4, 4, -6] as [number, number, number], color: '#8b5cf6', type: 'sphere' as const },
    { position: [-6, -2, -4] as [number, number, number], color: '#ec4899', type: 'torus' as const },
  ], []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ec4899" />
        
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
        
        {/* Subtle camera controls (disabled interaction) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
