import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CubeScene = () => {
  const mountRef = useRef(null); 
  useEffect(() => {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(30,mountRef.current.clientWidth / mountRef.current.clientHeight,0.1,1000);
	camera.position.z = 10;

	// 3. Renderer
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(
	  mountRef.current.clientWidth,
	  mountRef.current.clientHeight
	);
	mountRef.current.appendChild(renderer.domElement);

	// 4. Create a Cube
	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // green
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// 5. Animate the cube
	const animate = () => {
	  cube.rotation.x += 0.04;
	  cube.rotation.y += 0.04;
	  renderer.render(scene, camera);
	  requestAnimationFrame(animate);
	};
	animate();


  }, []);

  return (
	<div 
	  style={{ width: "100%", height: "100vh"}}
	  ref={mountRef}
	/>
  );
};

export default CubeScene;
