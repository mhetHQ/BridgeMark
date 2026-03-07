"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleSphere() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const count = 3000;

  const { positions, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute on sphere surface with some depth variation
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + (Math.random() - 0.5) * 0.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      rand[i] = Math.random();
    }

    return { positions: pos, randoms: rand };
  }, []);

  const vertexShader = `
    attribute float aRandom;
    uniform float uTime;
    varying float vAlpha;
    varying float vRandom;
    
    void main() {
      vRandom = aRandom;
      vec3 pos = position;
      
      // Subtle organic movement
      float displacement = sin(pos.x * 2.0 + uTime * 0.5) * 0.1 
                         + cos(pos.y * 2.0 + uTime * 0.3) * 0.1
                         + sin(pos.z * 2.0 + uTime * 0.4) * 0.1;
      
      pos += normalize(position) * displacement * aRandom;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Size attenuation
      gl_PointSize = (2.0 + aRandom * 3.0) * (300.0 / -mvPosition.z);
      
      // Distance-based alpha
      vAlpha = smoothstep(8.0, 2.0, -mvPosition.z) * (0.3 + aRandom * 0.7);
    }
  `;

  const fragmentShader = `
    varying float vAlpha;
    varying float vRandom;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    
    void main() {
      // Circular point shape
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
      
      // Blend between two colors based on particle random
      vec3 color = mix(uColor1, uColor2, vRandom);
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color("#00F0FF") },
          uColor2: { value: new THREE.Color("#BD00FF") },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    ref.current.rotation.z = state.clock.elapsedTime * 0.08;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusGeometry args={[3.2, 0.015, 16, 100]} />
      <meshBasicMaterial color="#00F0FF" transparent opacity={0.15} />
    </mesh>
  );
}

function SecondRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 3 + Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusGeometry args={[3.6, 0.01, 16, 100]} />
      <meshBasicMaterial color="#BD00FF" transparent opacity={0.1} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ParticleSphere />
        <FloatingRing />
        <SecondRing />
      </Canvas>
    </div>
  );
}
