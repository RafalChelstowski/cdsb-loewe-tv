import React from 'react';
import { Canvas } from 'react-three-fiber';
import {
  OrbitControls,
  useGLTF,
  useMatcapTexture,
  PerspectiveCamera
} from '@react-three/drei';
import './styles.css';

function Loewe() {
  const { nodes } = useGLTF('loewe.glb', true);
  const [black] = useMatcapTexture('2A2A2A_DBDBDB_6A6A6A_949494');
  const [screen] = useMatcapTexture(21, 1024);

  return (
    <group>
      <mesh castShadow geometry={nodes.Plane.geometry}>
        <meshMatcapMaterial matcap={screen} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Cube.geometry}>
        <meshMatcapMaterial matcap={black} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Cube001.geometry}>
        <meshMatcapMaterial matcap={black} />
      </mesh>
    </group>
  );
}

export default function App() {
  return (
    <Canvas shadowMap concurrent colorManagement>
      <spotLight
        penumbra={1}
        castShadow
        position={[0, 4, 1]}
        intensity={3}
        decay={2}
      />
      <React.Suspense fallback={null}>
        <Loewe />
      </React.Suspense>
      <mesh receiveShadow position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <OrbitControls
        enableDamping={false}
        enableZoom={false}
        enablePan={false}
        enableKeys={false}
        maxPolarAngle={Math.PI / 2}
      />
      <PerspectiveCamera position={[3, 4, 13]} makeDefault />
    </Canvas>
  );
}
