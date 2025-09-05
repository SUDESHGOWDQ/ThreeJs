import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CubeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // === Scene Setup ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    // === Camera Setup ===
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 10);

    // === Renderer Setup ===
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // === Lights ===
    const ambientLight = new THREE.AmbientLight("white", 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("white", 0.8);
    directionalLight.position.set(5, 5, 5.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // === Cube ===
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // === Floor ===
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: "orange" });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;
    scene.add(floor);

    // === Controls ===
    const controls = new OrbitControls(camera, renderer.domElement);

	
    // === Handle Resize ===
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // // === Animation Loop ===
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100vh", overflow: "hidden" }}
    />
  );
};

export default CubeScene;
