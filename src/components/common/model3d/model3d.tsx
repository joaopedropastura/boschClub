'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

const Model = (props : any) => {
    const {scene} = useGLTF("./attmedia1.glb")


    return <primitive object={scene} scale={0.01} {...props} />
}

export default function Model3d() {

    return (
        <Canvas dpr={[1,2]} shadows camera={{fov: 60}} className='w-full h-full' >
            <color attach="background" args={['#fff']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <PresentationControls speed={1.5} global zoom={.9} polar={[-0.3, Math.PI / 4]}>
                <Stage environment={null}>
                    <Model scale={0.7} />
                </Stage>

            </PresentationControls>
        </Canvas>
    );
}

