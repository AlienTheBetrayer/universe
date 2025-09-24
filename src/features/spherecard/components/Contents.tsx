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
            <Canvas>
                <pointLight position={[0, 0, 3]} intensity={10}/>
                <ambientLight/>
                <CardFigure/>
            </Canvas>

            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}