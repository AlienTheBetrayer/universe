import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { type Points } from "three";

export const useSparks = (ref: React.RefObject<Points | null>, count: number) => { 
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);

        for(let i = 0; i < count * 3; ++i) {
            // every point starts at 0
            arr[i * 3] = 0;
            arr[i * 3 + 1] = 0;
            arr[i * 3 + 2] = 0;
        }

        return arr;
    }, [count]);

    const endPoint = useMemo(() => {
        const arr = new Float32Array(count * 3);
        const scale = 6;

        for(let i = 0; i < count * 3; ++i) {
            // random vector
            let x = (Math.random() - 0.5) * 2;
            let y = (Math.random() - 0.5) * 2;
            let z = (Math.random() - 0.5) * 2;

            // normalizing it
            const magnitude = Math.sqrt(x * x + y * y + z * z);
            x /= magnitude;
            y /= magnitude;
            z /= magnitude;

            // scaling it + setting it
            arr[i * 3] = x * scale;
            arr[i * 3 + 1] = y * scale;
            arr[i * 3 + 2] = z * scale;
        }

        return arr;
    }, [count]);

    const reached = useRef<boolean>(false);

    useFrame(state => {
        if(reached.current == true)
            return;

        const t = state.clock.getElapsedTime();
        
        if(ref.current) {
            const pos = ref.current.geometry.attributes.position.array;
            

            for(let i = 0; i < count; ++i) {
                const dx = endPoint[i * 3] - pos[i * 3];
                const dy = endPoint[i * 3 + 1] - pos[i * 3 + 1];
                const dz = endPoint[i * 3 + 2] - pos[i * 3 + 2];

                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const speed = 0.1;

                pos[i * 3] += dx / distance * speed;
                pos[i * 3 + 1] += dy / distance * speed;
                pos[i * 3 + 2] += dz / distance * speed;

                if(distance < 0.001)
                    reached.current = true;
            }
            
            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return { positions: positions };
}