import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import './carViewer.css'

function CarModel() {
  const { scene } = useGLTF('../public/models/car2.glb');
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);
  return <primitive object={scene} scale={0.5} />;
}

export default function CarViewer() {
  return (
    <div className='car-viewer-container' style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [3, 0.5, 4], fov: 20 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <CarModel  /> 
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}