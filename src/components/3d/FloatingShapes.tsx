import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Wireframe Torus
function Torus({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = rotation[2] + state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1.5, 0.4, 16, 50]} />
      <meshBasicMaterial 
        color="#7000ff" 
        wireframe 
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Wireframe Cube
function Cube({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] - state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = rotation[2] + state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial 
        color="#7000ff" 
        wireframe 
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Wireframe Icosahedron (Pyramid-like)
function Icosahedron({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = rotation[1] - state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.z = rotation[2] + state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1.3, 0]} />
      <meshBasicMaterial 
        color="#7000ff" 
        wireframe 
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

// Floating Particles using Points
function Particles({ count = 50 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color('#7000ff');
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Glow Effect
function GlowSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial
        color="#7000ff"
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

// Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#7000ff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.5} />
      
      <Torus position={[-4, 2, -2]} rotation={[0.5, 0.3, 0]} />
      <Cube position={[4, -1, -3]} rotation={[0.2, 0.5, 0]} />
      <Icosahedron position={[0, 3, -4]} rotation={[0.3, 0.2, 0.1]} />
      <Torus position={[5, 2, -5]} rotation={[0.1, 0.4, 0.2]} />
      <Cube position={[-3, -2, -3]} rotation={[0.4, 0.1, 0.3]} />
      <Icosahedron position={[3, -3, -2]} rotation={[0.2, 0.3, 0.1]} />
      
      <GlowSphere position={[-2, 1, -1]} />
      <GlowSphere position={[2, -1, -2]} />
      <GlowSphere position={[0, 2, -3]} />
      
      <Particles count={80} />
      <Stars radius={50} depth={50} count={100} factor={4} saturation={0} fade speed={1} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
