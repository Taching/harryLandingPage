import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { useTransition, a } from 'react-spring/three';

import '../assets/sass/main.scss';

// import { Link } from 'gatsby';
// import Scroll from '../components/Scroll';

extend({ OrbitControls });
const Controls = props => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useFrame(() => {
    orbitRef.current.update();
  });
  return (
    <orbitControls ref={orbitRef} args={[camera, gl.domElement]} {...props} />
  );
};
const Earth = () => {
  const [model, setModel] = useState();
  useEffect(() => {
    new GLTFLoader().load('/scene.gltf', setModel);
  });
  return model ? <primitive object={model.scene} /> : null;
};

const Animation = () => (
  <React.Fragment>
    <Canvas
      className="canvas"
      camera={{ position: [10, 0, 0] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <ambientLight intensity={0.5} />
      <spotLight
        castShadow
        intensity={1.25}
        angle={Math.PI / 3}
        position={[25, 25, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Controls
        autoRotate
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.5}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 3}
        minPolarAngle={Math.PI / 3}
      />
      <Earth />
    </Canvas>
    {/* <div className="inner">
      <h1>Block</h1>
      <p>私たちは、ブロックチェーン技術により自由で豊かな世の中を創造します</p>
      <h1>Chain</h1>
      <p>そして親と愛情を持っていただけたら、</p>
      <h1>Technology</h1>
      <p>これほど幸せな事ありません。</p>
      <ul className="actions">
        <li>
          <Scroll type="id" element="one">
            <a href="#one" className="button">
              Learn more
            </a>
          </Scroll>
        </li>
      </ul>

    </div> */}
  </React.Fragment>
);
export default Animation;
