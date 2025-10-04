import { useState } from "react"

export const useCircleGrid = () => {
    const [gridData, setGridData] = useState<number[][]>([[]]);

    // actual calculation
    


    // rotation functions
    const shift = (amount: number) => {

    }

    const unshift = (amount: number) => {

    }

    const rotate90 = () => {

    }

    const rotate180 = () => {

    }

    const reverse = () => {

    }

    return { gridData, shift, unshift, rotate90, rotate180, reverse };
}