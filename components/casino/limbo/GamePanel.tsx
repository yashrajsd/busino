import { useContext, useState } from "react";
import { BetButton } from "../BetButton"
import { BetInput } from "../BetInput"
import { BetMode } from "../BetMode";
import { ProfitEstimate } from "./ProfitEstimate";
import { limboContext } from "@/Context/limboContext";

export const GamePanel = () => {

    const [auto, setAuto] = useState(false);
    const [betAmount, setbetAmount] = useState(0.00);
    const { targetMultiplier } = useContext(limboContext);

    const SubmitBet = () => {
        console.log(JSON.stringify({
            targetMultiplier,
            betAmount
        }));
    }

    return (
        <div className="p-1 pr-3">
            <BetMode isAuto={auto} setisAuto={setAuto} />
            <BetInput BetAmount={betAmount} setBetAmount={setbetAmount} />
            <ProfitEstimate BetAmount={betAmount} Multiplier={targetMultiplier} />
            <BetButton handler={SubmitBet} />
        </div>
    )
}