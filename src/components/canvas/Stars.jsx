import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props) => {
  const ref = useRef();
  // Length must be a multiple of 3 (x, y, z); 5000 left a NaN coordinate.
  // Memoised so the buffer isn't rebuilt on every render.
  const sphere = useMemo(() => random.inSphere(new Float32Array(4998), { radius: 1.2 }), [])

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0,0,Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarsCanvas = () => {
  return (
    <div
      className="w-full h-auto absolute inset-0 z-[-1]"
    >
      <Canvas camera={{position: [0,0,1]}}>
        <Suspense fallback={null}>
          <Stars/>
        </Suspense>
        <Preload all/>
      </Canvas>
    </div>
  )
}

export default StarsCanvas