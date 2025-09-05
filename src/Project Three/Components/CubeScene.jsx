import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const CubeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // === Scene Setup ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    // === Camera Setup ===
    const camera = new THREE.PerspectiveCamera(
      25,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.9,
      1000
    );
    camera.position.set(6, 5, 5);

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

    // === Floor ===
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: "black" });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;
    scene.add(floor);

    // === Controls ===
    const controls = new OrbitControls(camera, renderer.domElement);

    // === Load GLTF Model ===
    const loader = new GLTFLoader();
    loader.load(
      "/models/car2.glb", 
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        model.position.set(0, 0, 0); 
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // === Animation Loop ===
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // === Handle Resize ===
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // === Cleanup ===
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "absolute", top: 0, left: 0, zIndex: 0 }}
    />
  );
};

export default CubeScene;
