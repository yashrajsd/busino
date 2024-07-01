import { Dispatch, SetStateAction } from "react"

interface BetModeProps {
    isAuto: boolean,
    setisAuto: Dispatch<SetStateAction<boolean>>;
}

export const BetMode = ({ isAuto, setisAuto }: BetModeProps) => {
    return (
        <div className='bg-[#313D4C] text-[0.9rem] font-semibold flex w-full p-[0.4rem] text-white rounded-full'>
            <span className={`cursor-pointer flex-1 rounded-full p-[0.5rem] ${!isAuto && ('bg-[#5875FF]')}`} onClick={() => { setisAuto(false) }}>
                <p className='text-center'>Manual</p>
            </span>
            <span className={`cursor-pointer flex-1 rounded-full p-[0.5rem] ${isAuto && ('bg-[#5875FF]')}`} onClick={() => { setisAuto(true) }}>
                <p className='text-center'>Auto</p>
            </span>
        </div>
    )
}