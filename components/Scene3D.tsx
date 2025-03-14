'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Componente para el cubo rotativo
function Box(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.2
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#2196f3' : '#e91e63'} />
    </mesh>
  )
}

// Componente para la escena principal
export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        
        <OrbitControls enableZoom={true} enablePan={true} />
        
        <axesHelper args={[5]} />
        <gridHelper args={[10, 10]} />
      </Canvas>
    </div>
  )
}