import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

// Shared loader for the toad (hero + pet). The copy we have has geometry only
// (the upload was incomplete), so normals are rebuilt and a material applied.
export const TOAD_URL = `${import.meta.env.BASE_URL}toad/toad.glb`;

// Returns a group with the toad standing on y = 0, centred in x/z, `height` tall.
export const useToadModel = (height = 1, color = "#5E7A3A") => {
  const { scene } = useGLTF(TOAD_URL);
  return useMemo(() => {
    const root = scene.clone(true);
    root.traverse((o) => {
      if (!o.isMesh) return;
      o.geometry = o.geometry.clone();
      o.geometry.computeVertexNormals();
      o.material = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.05 });
    });
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const c = box.getCenter(new THREE.Vector3());
    root.position.set(-c.x, -box.min.y, -c.z);
    const group = new THREE.Group();
    group.add(root);
    group.scale.setScalar(height / size.y);
    return group;
  }, [scene, height, color]);
};

useGLTF.preload(TOAD_URL);
