/* eslint-disable react-hooks/immutability */
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform sampler2D uTextureTop;
  uniform sampler2D uTextureReveal;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.,0.));
    float c = random(i + vec2(0.,1.));
    float d = random(i + vec2(1.,1.));
    vec2 u = f*f*(3. - 2.*f);
    return mix(a, b, u.x) + (c - a)*u.y*(1. - u.x) + (d - b)*u.x*u.y;
  }

  void main() {
    float n = noise(vUv * 3. + uTime * .5);
    float mask = smoothstep(.15, .05, distance(vUv, uMouse) - (n * .2));
    gl_FragColor = mix(texture2D(uTextureTop, vUv), texture2D(uTextureReveal, vUv), mask);
  }
`;

const Scene = ({ topImage, revealImage }) => {
  const mesh = useRef();
  const { size, viewport } = useThree();
  const [texTop, texReveal] = useTexture([topImage, revealImage]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uTextureTop: { value: texTop },
    uTextureReveal: { value: texReveal }
  }), [texTop, texReveal, size]);

  useFrame(({ clock, pointer }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uMouse.value.set((pointer.x + 1) / 2, (pointer.y + 1) / 2);
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1,1]} />
      <shaderMaterial uniforms={uniforms} fragmentShader={fragmentShader} vertexShader={vertexShader}/>
    </mesh>
  );
};

export default function LiquidReveal({ topImage, revealImage }) {
  return (
    <div style={{position:"absolute", inset:0, zIndex:0}}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene topImage={topImage} revealImage={revealImage}/>
      </Canvas>
    </div>
  );
}
