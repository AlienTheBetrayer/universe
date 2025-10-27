import React, { useEffect } from 'react';
import type { BlockType } from '../types/world/block';
import type { WorldData } from '../types/world/data';

export const useWorldField = (
    setState: React.Dispatch<React.SetStateAction<WorldData>>,
    width: number,
    depth: number
) => {
    useEffect(() => {
        setState((prev) => {
            const newBlocks: BlockType[] = [];

            for (let z = 0; z < depth; ++z) {
                for (let x = 0; x < width; ++x) {
                    newBlocks.push({
                        position: [x * 0.5, 1, z * 0.5],
                    });
                }
            }

            return { ...prev, fieldBlocks: newBlocks };
        });
    }, [width, depth, setState]);
};
