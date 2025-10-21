import { useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import type { Points } from 'three';
import { useSmoothCursor } from '../../../hooks/useSmoothCursor';
import { useQuestionContext } from '../context/QuestionContext';

export const useQuestionParticles = (
    ref: React.RefObject<Points | null>,
    count: number = 1000,
) => {
    const { size, viewport, gl } = useThree();
    const pointer = useSmoothCursor({ x: size.width / 2, y: size.height / 2 });
    const rect = gl.domElement.getBoundingClientRect();
    const [questionContextData] = useQuestionContext();

    const data = useMemo(() => {
        const positions = new Float32Array(count * 2);
        const velocities = new Float32Array(count * 2);
        const accumulated = new Float32Array(count * 2);
        const random = new Float32Array(count * 2);

        for (let i = 0; i < count; ++i) {
            velocities[i * 2] = Math.random() - 0.5;
            velocities[i * 2 + 1] = Math.random() - 0.5;

            random[i * 2] = Math.random() - 0.5;
            random[i * 2 + 1] = Math.random() - 0.5;

            const far = Math.random() > 0.7;

            if (far) {
                random[i * 2] *= 10;
                random[i * 2 + 1] *= 10;
            }
        }

        return {
            positions: positions,
            velocities: velocities,
            accumulated: accumulated,
            random: random,
        };
    }, [count]);

    useFrame(() => {
        if (ref.current) {
            const pos = ref.current.geometry.attributes.position.array;
            const vel = data.velocities;
            const acc = data.accumulated;
            const rand = data.random;

            const cursorX =
                (pointer.x / rect.width) * viewport.width - viewport.width / 2;
            const cursorY =
                -((pointer.y - rect.top) / rect.height) * viewport.height +
                viewport.height / 2;

            for (let i = 0; i < count; ++i) {
                acc[i * 2] += vel[i * 2] * 0.1;
                acc[i * 2 + 1] += vel[i * 2 + 1] * 0.1;

                if (questionContextData.revealed) {
                    acc[i * 2] *= 1.1;
                    acc[i * 2 + 1] *= 1.1;
                }

                pos[i * 2] = acc[i * 2] + cursorX;
                pos[i * 2 + 1] = acc[i * 2 + 1] + cursorY;

                const dx = pos[i * 2] - cursorX;
                const dy = pos[i * 2 + 1] - cursorY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (
                    dist >
                    (questionContextData.revealed
                        ? 100
                        : 2 + rand[i * 2] * rand[i * 2 + 1])
                ) {
                    acc[i * 2] = 0;
                    acc[i * 2 + 1] = 0;
                    pos[i * 2] = cursorX;
                    pos[i * 2 + 1] = cursorY;
                    vel[i * 2] = Math.random() - 0.5;
                    vel[i * 2 + 1] = Math.random() - 0.5;
                }
            }

            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return { positions: data.positions };
};
