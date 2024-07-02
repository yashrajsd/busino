import React, { createContext } from "react";

interface limboContextInterface {
    // betAmount: number,
    targetMultiplier: number,
    setMultiplier: React.Dispatch<React.SetStateAction<number>>,
    result: number,
    setResult: React.Dispatch<React.SetStateAction<number>>
    toAnimate: boolean,
    setToAnimate: React.Dispatch<React.SetStateAction<boolean>>
}

export const limboContext = createContext<limboContextInterface>({
    targetMultiplier: 2,
    setMultiplier: () => {},
    result: 1,
    setResult: () => {},
    toAnimate: false,
    setToAnimate: () => {}
});