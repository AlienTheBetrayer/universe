import {
    Bloom,
    BrightnessContrast,
    ChromaticAberration,
    DepthOfField,
    Glitch,
    HueSaturation,
    Noise,
} from '@react-three/postprocessing';
import { type JSX } from 'react';
import { Vector2 } from 'three';
import { useForgeContext } from '../../../../context/ForgeContext';
import type { ForgeCardType } from '../../../../context/types/forge/cards';
import { ForgeWorldEffects } from '../../../../context/types/forge/effects';

export const WorldEffectComposer = () => {
    const [forgeState] = useForgeContext();

    const elements: JSX.Element[] = [];
    const occupiedSlots = new Map<
        ForgeCardType,
        { current: number | undefined; min: number; enabled: boolean }
    >();

    forgeState.effectSlots.forEach((slot) => {
        occupiedSlots.set(slot.card.type, {
            current: slot.strength,
            min: ForgeWorldEffects[slot.card.type].strength.min,
            enabled: slot.enabled,
        });
    });

    if (occupiedSlots.has('css')) {
        const slot = occupiedSlots.get('css');

        if (slot?.enabled === true) {
            elements.push(
                <ChromaticAberration
                    offset={[
                        slot?.current ?? slot?.min,
                        slot?.current ?? slot?.min,
                    ]}
                />
            );
        }
    }

    const slot = occupiedSlots.get('html');
    elements.push(
        <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            intensity={
                slot?.enabled === true
                    ? slot?.current ?? ForgeWorldEffects['html'].strength.min
                    : ForgeWorldEffects['html'].strength.min
            }
        />
    );

    if (occupiedSlots.has('javascript')) {
        const slot = occupiedSlots.get('javascript');

        if (slot?.enabled === true) {
            elements.push(
                <Glitch
                    delay={
                        new Vector2(
                            ForgeWorldEffects.javascript.strength.max -
                                (slot?.current ?? slot?.min ?? 0),
                            ForgeWorldEffects.javascript.strength.max -
                                (slot?.current ?? slot?.min ?? 0)
                        )
                    }
                />
            );
        }
    }

    if (occupiedSlots.has('nextjs')) {
        const slot = occupiedSlots.get('nextjs');

        if (slot?.enabled === true) {
            elements.push(<Noise opacity={slot?.current ?? slot?.min} />);
        }
    }

    if (occupiedSlots.has('react')) {
        const slot = occupiedSlots.get('react');
        if (slot?.enabled === true) {
            elements.push(
                <DepthOfField
                    focusDistance={0.001}
                    focalLength={0.04}
                    bokehScale={slot?.current ?? slot?.min}
                />
            );
        }
    }

    if (occupiedSlots.has('redux')) {
        const slot = occupiedSlots.get('redux');
        if (slot?.enabled === true) {
            elements.push(
                <BrightnessContrast contrast={slot?.current ?? slot?.min} />
            );
        }
    }

    if (occupiedSlots.has('tailwind')) {
        const slot = occupiedSlots.get('tailwind');
        if (slot?.enabled === true) {
            elements.push(
                <HueSaturation
                    hue={slot?.current ?? slot?.min}
                    saturation={slot?.current ?? slot?.min}
                />
            );
        }
    }

    return <>{...elements}</>;
};
