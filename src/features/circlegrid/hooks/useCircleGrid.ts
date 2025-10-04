import { useEffect, useState } from "react"

const toMatrix = (arr: number[]): number[][] => {
    let matrix: number[][] = [[], [], []];
    matrix[0] = arr.slice(0, 3);
    matrix[1][2] = arr[3];
    matrix[1][0] = arr[arr.length - 1];
    matrix[2] = arr.slice(-4, -1).reverse();

    return matrix;
}

export const useCircleGrid = () => {
    // underlying raw data array
    const [gridData, setGridData] = useState<number[]>(
        [1, 2, 3, 4, 5, 6, 7, 8]
    );

    // matrix
    const [matrix, setMatrix] = useState<number[][]>([]);
    
    // matrix updating
    useEffect(() => {
        setMatrix(toMatrix(gridData));
    }, [gridData]);

    // color
    const [coloredIdx, setColoredIdx] = useState<number>(-1);

    // index functions
    const indexOf = (value: number) => {
        for (let i = 0; i < matrix.length; ++i) { // row
            for (let j = 0; j < matrix[i].length; ++j) { // column
                if (matrix[i][j] == value) {
                    return { row: i + 1, column: j + 1 };
                }
            }
        }

        return { row: -1, column: -1 };
    }

    const row = (value: number) => {
        return indexOf(value).row;
    }

    const column = (value: number) => {
        return indexOf(value).column;
    }


    // rotation functions
    const shift = (amount: number = 1) => {
        for(let i = 0; i < amount; ++i)
            setGridData(prev => [prev.at(-1)!, ...prev.slice(0, -1)]);
    }

    const unshift = (amount: number = 1) => {
        for(let i = 0; i < amount; ++i)
            setGridData(prev => [...prev.slice(1), prev[0]])
    }

    const reverse = () => {
        setGridData(prev => [...prev].reverse());
    }

    const random = () => {
        setGridData(prev => [...prev].sort(() => Math.random() - 0.5));
    }

    const swap = (idx0: number, idx1: number) => {
        setGridData(prev => {
            let arr = [...prev];
            const i = idx0 < 0 ? arr.length + idx0 : idx0;
            const j = idx1 < 0 ? arr.length + idx1 : idx1;

            if(i >= 0 && j >= 0 && i < arr.length && j < arr.length)
                [arr[i], arr[j]] = [arr[j], arr[i]];

            return arr;
        });
    }

    return {
        gridData,
        coloredIdx, setColoredIdx,
        indexOf, row, column,
        shift, unshift, reverse, random, swap,
    };
}