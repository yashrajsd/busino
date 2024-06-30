import React from "react"
import { GameFooter } from "./GameFooter"

export const GameWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="pt-10 mx-5 xl:mx-28">
            <div className="bg-[#22272E] rounded-md overflow-hidden">
                <div className="p-2">
                    {children}
                </div>
                <GameFooter />
            </div>
        </div>
    )
}   