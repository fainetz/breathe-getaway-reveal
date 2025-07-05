
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

// Wave component that creates animated wave geometry
const Waves = ({ theme }: { theme: 'light' | 'dark' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Create wave geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 6, 100, 20);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  // Shader material for wave effect
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(theme === 'light' ? '#6366f1' : '#8b5cf6') },
        opacity: { value: theme === 'light' ? 0.4 : 0.3 }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          vec3 pos = position;
          
          // Create wave motion
          float wave1 = sin(pos.x * 0.3 + time * 2.0) * 0.5;
          float wave2 = sin(pos.x * 0.1 + time * 1.5) * 0.3;
          float wave3 = sin(pos.z * 0.2 + time * 1.8) * 0.2;
          
          pos.y += wave1 + wave2 + wave3;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying vec3 vPosition;
        
        void main() {
          float alpha = opacity * (1.0 - abs(vPosition.z) / 3.0);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, [theme]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.color.value.setHex(
        theme === 'light' ? 0x6366f1 : 0x8b5cf6
      );
      materialRef.current.uniforms.opacity.value = theme === 'light' ? 0.4 : 0.3;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={shaderMaterial}
      position={[0, -4, 2]}
    >
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
};

// Simple wave particles for added effect
const WaveParticles = ({ theme }: { theme: 'light' | 'dark' }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = -3 + Math.random() * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 50; i++) {
        const y = i * 3 + 1;
        positions[y] = -3 + Math.sin(state.clock.elapsedTime + positions[i * 3]) * 0.5;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={50}
          array={particlesGeometry}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={theme === 'light' ? "#3b82f6" : "#60a5fa"}
        transparent
        opacity={theme === 'light' ? 0.6 : 0.4}
      />
    </points>
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

  // CSS fallback when WebGL is not available
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-t from-blue-100/60 via-transparent to-transparent' : 'bg-gradient-to-t from-blue-900/20 via-transparent to-transparent'}`}>
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
            <div className={`absolute bottom-0 left-0 right-0 h-16 ${theme === 'light' ? 'bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-blue-400/30' : 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20'} animate-pulse`}></div>
            <div className={`absolute bottom-2 left-0 right-0 h-12 ${theme === 'light' ? 'bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-purple-400/20' : 'bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-purple-500/15'} animate-pulse`} style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
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
            
            <Waves theme={theme} />
            <WaveParticles theme={theme} />
          </>
        )}
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
