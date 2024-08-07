'use client'

import { GameContent } from "@/components/casino/limbo/GameContent";
import { GamePanel } from "@/components/casino/limbo/GamePanel";
import { GameWrapper } from "@/components/casino/GameWrapper"
import { useState } from "react";
import { limboContext } from "@/Context/limboContext";

const Limbo = () => {

    const [targetMultiplier, setMultiplier] = useState(2.00);
    const [result, setResult] = useState(1);
    const [toAnimate, setToAnimate] = useState(false);

    return (
        <limboContext.Provider value={{targetMultiplier, setMultiplier, result, setResult, toAnimate, setToAnimate}}>
            <GameWrapper>
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <GamePanel />
                    </div>
                    <div className="col-span-9">
                        <GameContent />
                    </div>
                </div>
            </GameWrapper>
        </limboContext.Provider>
    )
}

export default Limbo;