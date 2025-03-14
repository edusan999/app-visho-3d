'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Link from 'next/link'
import * as THREE from 'three'

function Cube(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4CAF50" wireframe />
    </mesh>
  )
}

export default function CuboPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-8">
        <h1 className="text-2xl font-bold mb-4">Ejemplo: Cubo 3D</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          ← Volver al inicio
        </Link>
      </div>

      <div className="relative w-full h-[70vh] border border-gray-300 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          <Cube />
          
          <OrbitControls enableZoom={true} enablePan={true} />
          <gridHelper args={[10, 10]} />
        </Canvas>
      </div>

      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-4">Interacción</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Arrastra para rotar la vista</li>
          <li>Rueda del ratón para hacer zoom</li>
          <li>Clic derecho + arrastrar para mover la cámara</li>
        </ul>
      </div>
    </main>
  )
}