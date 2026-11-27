import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

// Shared loader for the frog (hero + pet), with its original textures.
// Optimised from 20.9 MB to ~630 KB (meshopt geometry, WebP textures).
export const TOAD_URL = `${import.meta.env.BASE_URL}toad/frog.glb`;

// Returns a group with the frog standing on y = 0, centred in x/z, `height` tall.
export const useToadModel = (height = 1) => {
  const { scene } = useGLTF(TOAD_URL);
  return useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const c = box.getCenter(new THREE.Vector3());
    root.position.set(-c.x, -box.min.y, -c.z);
    const group = new THREE.Group();
    group.add(root);
    group.scale.setScalar(height / size.y);
    return group;
  }, [scene, height]);
};

useGLTF.preload(TOAD_URL);
