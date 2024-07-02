import { createContext } from "react";

interface limboContextInterface {
    // betAmount: number,
    targetMultiplier: number,
    setMultiplier: React.Dispatch<React.SetStateAction<number>>
}

export const limboContext = createContext<limboContextInterface>({
    targetMultiplier: 2,
    setMultiplier: () => {}
});