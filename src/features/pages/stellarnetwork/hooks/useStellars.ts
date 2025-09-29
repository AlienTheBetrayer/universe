import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react"



export const useStellars = (count: number = 30) => {
    const { viewport } = useThree();
    const [stellars, setStellars] = useState<Stellar[]>([]);
    
    useEffect(() => {
        const arr: Stellar[] = [];
        for(let i = 0; i < count; ++i)
            arr.push({ x: (Math.random() - 0.5) * viewport.width, y: (Math.random() - 0.5) * viewport.width });
        setStellars(arr);
    }, [count]);
    

    return stellars;
}