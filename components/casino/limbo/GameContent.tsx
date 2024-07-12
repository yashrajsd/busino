import { useContext, useState } from "react";
import { limboContext } from "@/Context/limboContext";
import { AnimatedCounter } from "./AnimatedCounter";
import { ResultHistory } from "../ResultHistory";


export const GameContent = () => {
    //todo implement a api call to get the multiplier
    const { result, toAnimate } = useContext(limboContext);
    console.log("result from gameContext: ", result);
    const [winChance, setWinChance] = useState(49.5);
    const { targetMultiplier, setMultiplier } = useContext(limboContext);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setMultiplier(parseFloat(value.toFixed(2)));
        const chance = (99 / value);
        setWinChance(chance);
        console.log("multiplier updated: ", parseFloat(value.toFixed(2)));
    }

    const updateWinchance = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setWinChance(value);
        const newMultiplier = (99 / value);
        setMultiplier(newMultiplier);
    }

    return (
        <div className="h-full bg-[#16191f] p-4">
            <div className="flex justify-end">
                <ResultHistory />
            </div>
            <div className="flex justify-center items-center h-[500px]">
                {!toAnimate ?
                    <div>
                        <span className="text-white font-semibold text-9xl">1.00</span>
                        <div className="icons8-close mt-4"></div>
                    </div>
                    :
                    <AnimatedCounter initial={1.00} final={result} isWinner={result >= targetMultiplier} />
                }
            </div>
            <div className="grid grid-cols-2 p-4 bg-[#22272E] gap-3 rounded-md">
                <div className="col-span-1">
                    <label htmlFor="targetmulti" className="font-semibold text-zinc-300 text-sm">Target Multiplier</label>
                    <div id="targetmulti" className="bg-[#343A42] rounded-lg mt-0.5 shadow-md shadow-zinc-900">
                        <div className='w-[100%] flex border-[4px] border-[#343C47] rounded-lg overflow-hidden'>
                            <input
                                type="number"
                                step={'0.01'}
                                value={targetMultiplier}
                                //todo: figure out why latest value is not updating
                                onChange={handleInputChange}
                                className='bg-[#23272c] w-16 flex-auto font-semibold text-white focus:outline-none p-[0.3rem]' />
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <label htmlFor="winchance" className="font-semibold text-zinc-300 text-sm">Win Chance</label>
                    <div id="winchance" className="bg-[#343A42] rounded-lg mt-0.5 shadow-md shadow-zinc-900 ">
                        <div className='w-[100%] flex border-[4px] border-[#343C47] rounded-lg overflow-hidden'>
                            <input
                                type="number"
                                value={winChance}
                                onChange={updateWinchance}
                                className='bg-[#23272c] w-16 flex-auto font-semibold text-white focus:outline-none p-[0.3rem]' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}