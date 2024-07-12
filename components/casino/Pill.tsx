import clsx from "clsx"

export const Pill = ({ display, isWinner }: { display: number, isWinner: boolean }) => {
    return (
        <div className={clsx("flex justify-center items-center text-white rounded-full bg-gray-600 w-[64px] h-[32px] shadow-md shadow-zinc-900", {
            "bg-green-500 text-black" : isWinner
        })}>
            <span className="font-semibold text-sm text-[13px]">{display.toFixed(2)}×</span>
        </div>
    )
}