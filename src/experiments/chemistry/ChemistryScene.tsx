import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Solution } from './ChemistryLogic';

interface ChemistrySceneProps {
  scene: THREE.Scene;
  solution: Solution | null;
}

export const ChemistryScene: React.FC<ChemistrySceneProps> = ({ scene, solution }) => {
  const liquidRef = useRef<THREE.Mesh>();
  const beakerRef = useRef<THREE.Group>();

  useEffect(() => {
    // Laboratory Floor
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    scene.add(floor);

    // Workbench
    const tableGeo = new THREE.BoxGeometry(5, 0.2, 3);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.y = 0;
    scene.add(table);

    // Beaker Group
    const beakerGroup = new THREE.Group();
    beakerRef.current = beakerGroup;

    // Beaker Glass - simplified material
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      metalness: 0.1,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    beakerGroup.add(glass);

    // Beaker Bottom
    const bottomGeo = new THREE.CircleGeometry(0.5, 32);
    const bottom = new THREE.Mesh(bottomGeo, glassMat);
    bottom.rotation.x = -Math.PI / 2;
    bottom.position.y = -0.6;
    beakerGroup.add(bottom);

    // Liquid Mesh
    const liquidGeo = new THREE.CylinderGeometry(0.48, 0.48, 1, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = -0.1;
    liquid.name = 'liquid';
    liquidRef.current = liquid;
    beakerGroup.add(liquid);

    beakerGroup.position.y = 0.6;
    scene.add(beakerGroup);

    return () => {
      // Clean up meshes when unmounting
      scene.remove(floor);
      scene.remove(table);
      scene.remove(beakerGroup);
    };
  }, [scene]);

  useEffect(() => {
    if (liquidRef.current && solution) {
      // Update liquid color and volume (height)
      liquidRef.current.material.color = new THREE.Color(solution.color);
      liquidRef.current.material.opacity = 0.8;
      
      const height = Math.min(solution.volume / 500, 1); // 500mL is max height
      liquidRef.current.scale.y = height;
      liquidRef.current.position.y = -0.6 + (height * 0.5);
    } else if (liquidRef.current && !solution) {
      liquidRef.current.material.opacity = 0.0;
    }
  }, [solution]);

  return null;
};
