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
            <div className='sphere-card-canvas'>
                <Canvas>
                    <pointLight position={[0, 0, 3.5]} intensity={10}/>
                    <ambientLight/>
                    <CardFigure/>
                </Canvas>
            </div>

            <div className='sphere-card-text'>
                <h3>{title}</h3>
                <p dangerouslySetInnerHTML={{ __html: description ?? '' }}/>
            </div>
        </div>
    )
}