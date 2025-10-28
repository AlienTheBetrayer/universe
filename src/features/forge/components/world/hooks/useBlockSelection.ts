import type { EdgesRef } from '@react-three/drei';
import { useRef } from 'react';
import { Vector3 } from 'three';
import type { BlockData } from '../../../context/types/world/block';

export const useBlockSelection = () => {
    const edgesRef = useRef<EdgesRef>(null);

    const start = (data: BlockData) => {
        if (edgesRef.current) {
            edgesRef.current.visible = true;

            edgesRef.current?.position.copy(new Vector3(...data.position));
        }
    };

    const end = () => {
        if (edgesRef.current) {
            edgesRef.current.visible = false;
        }
    };

    return {
        ref: edgesRef,
        start,
        end,
    };
};
