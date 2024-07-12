import { useContext, useEffect, useState } from "react"
import { Pill } from "./Pill";
import { limboContext } from "@/Context/limboContext";

interface historyProps {
    result: number,
    isWinner: boolean
}

export const ResultHistory = () => {
    const { result, targetMultiplier, toAnimate } = useContext(limboContext);
    const [history, setHistory] = useState<historyProps[]>([]);

    useEffect(() => {
        const prev = history;

        if(history.length == 5) history.shift();

        toAnimate && setHistory([...prev, {
            result,
            isWinner: result >= targetMultiplier
        }])
        console.log("history: ", history);
    }, [result])

    return <>
        {toAnimate && (
            <div className="flex gap-1">
                {history.map((value, index) => (
                    <Pill
                        key={index}
                        display={value.result}
                        isWinner={value.isWinner}
                    />
                ))}
            </div>
        )}
    </>
}