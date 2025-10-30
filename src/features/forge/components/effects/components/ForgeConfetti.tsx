import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export const ForgeConfetti = () => {
    useEffect(() => {
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                shapes: [confetti.shapeFromText({ text: '🌀', scalar: 2 })],
                scalar: 2,
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                shapes: [confetti.shapeFromText({ text: '🌀', scalar: 2 })],
                scalar: 2,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }, []);

    return null;
};
