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

    // matrix updating
    const [matrix, setMatrix] = useState<number[][]>([]);

    useEffect(() => {
        setMatrix(toMatrix(gridData));
    }, [gridData]);


    // hotkeys
    const [focused, setFocused] = useState<boolean>(false);
    
    useEffect(() => {
        console.log(focused);
        const handle = (e: KeyboardEvent) => {
            if(!focused)
                return;

            switch(e.key.toLowerCase()) {
                case 'arrowleft':
                    unshift();
                break;
                case 'arrowright':
                    shift();
                break;
                case 'r':
                    reverse();
                break;
            }
        }

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, [focused]);




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

    return {
        gridData,
        indexOf, row, column,
        shift, unshift, reverse, random,
        focused, setFocused
    };
}