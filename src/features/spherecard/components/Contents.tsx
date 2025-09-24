import { Canvas } from '@react-three/fiber';
import './Contents.css';
import { CardFigure } from './CardFigure';

interface Props {
    title?: string;
    description?: string;
}

export const Contents = ({ title, description }: Props ) => {
    return (
        <div className='sphere-card-contents'>
            <div className='sphere-card-sphere'>
                <Canvas>
                    <pointLight position={[0, 0, 3]} intensity={30}/>
                    <ambientLight/>
                    <CardFigure/>
                </Canvas>
            </div>

            <div className='sphere-card-text'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}