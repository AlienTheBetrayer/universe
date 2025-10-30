import { ChromaticAberration, Glitch } from '@react-three/postprocessing';
import type { JSX } from 'react';
import { Vector2 } from 'three';
import { useForgeContext } from '../../../../context/ForgeContext';
import type { ForgeCardType } from '../../../../context/types/forge/cards';
import { ForgeWorldEffects } from '../../../../context/types/forge/effects';

export const WorldEffectComposer = () => {
    const [forgeState] = useForgeContext();

    const elements: JSX.Element[] = [];
    const occupiedSlots = new Map<
        ForgeCardType,
        { current: number | undefined; min: number }
    >();

    forgeState.effectSlots.forEach((slot) => {
        occupiedSlots.set(slot.card.type, {
            current: slot.strength,
            min: ForgeWorldEffects[slot.card.type].strength.min,
        });
    });

    if (occupiedSlots.has('css')) {
        const slot = occupiedSlots.get('css')!;
        elements.push(
            <ChromaticAberration
                offset={[
                    (slot?.current ?? slot?.min) / 30,
                    (slot?.current ?? slot?.min) / 30,
                ]}
            />
        );
    }

    if (occupiedSlots.has('html')) {
        elements.push(<Glitch duration={new Vector2(1, 1)} />);
    }

    return <>{...elements}</>;
};
