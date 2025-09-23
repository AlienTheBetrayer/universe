import { Canvas } from '@react-three/fiber';
import './Contents.css';
import { Sphere } from './Sphere';

interface Props {
    title?: string;
    description?: string;
}

export const Contents = ({ title, description }: Props ) => {
    return (
        <div className='sphere-card-contents'>
            <div className='sphere-card-sphere'>
                <Canvas>
                    <Sphere/>
                </Canvas>
            </div>

            <div className='sphere-card-text'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}