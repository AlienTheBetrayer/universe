import { Canvas } from '@react-three/fiber';
import './Contents.css';
import { CardFigure } from './CardFigure';

import cursorImg from '../../../assets/cursor.svg';
import { useLocalStore } from '../../../zustand/localStore';

interface Props {
    title?: string;
    description?: string;
}

export const Contents = ({ title, description }: Props ) => {
    const { theme } = useLocalStore();

    return (
        <div className='sphere-card-contents'>
            <div className='sphere-card-canvas'>
                <Canvas>
                    <pointLight position={[0, 0, 3.5]} intensity={theme === 'dark' ? 12 : 24 }/>
                    <ambientLight/>
                    <CardFigure/>
                </Canvas>
            </div>

            <div className='sphere-card-text'>
                <h3>{title}</h3>
                <p dangerouslySetInnerHTML={{ __html: description ?? '' }}/>
            </div>

            <div className='sphere-card-hover'>
                <img src={cursorImg} alt='hover'/>
            </div>
        </div>
    )
}