import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useStellarContext } from '../context/StellarContext';
import { useStellarContextMenu } from '../hooks/useStellarContextMenu';
import { StellarLighting } from './StellarLighting';
import { StellarParticles } from './StellarParticles';
import { Stellars } from './Stellars';

export const StellarCanvas = () => {
    const [state, dispatch] = useStellarContext();
    const contextMenu = useStellarContextMenu();

    const showMenu = () => {
        contextMenu.popup.setShown(false);
        setTimeout(() => contextMenu.popup.setShown(true), 10);
    };

    return (
        <>
            <Canvas
                style={{ width: '100%', height: '100%', touchAction: 'none' }}
                camera={{ near: 0.001 }}
                onTouchStart={(e) => {
                    if (e.touches.length >= 2) showMenu();
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    showMenu();
                }}
                onPointerDown={(e) => {
                    if (e.button === 1) e.preventDefault();
                }}
                onClick={() => {
                    contextMenu.popup.setShown(false);
                    if (state.isMoveWaiting)
                        dispatch({ type: 'STELLAR_SET_MOVING', idx: false });
                }}
            >
                <StellarLighting />
                <StellarParticles />
                <Stellars />

                <EffectComposer>
                    <Bloom intensity={20} luminanceThreshold={0} />
                </EffectComposer>
            </Canvas>

            {contextMenu.popup.render()}
        </>
    );
};
