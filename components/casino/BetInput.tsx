import { Dispatch, SetStateAction } from "react"

interface BetInputProps {
    BetAmount: number,
    setBetAmount: Dispatch<SetStateAction<number>>;
}

export const BetInput = ({ BetAmount, setBetAmount }: BetInputProps) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setBetAmount(parseFloat(value.toFixed(2)));
        console.log("Bet value changed", value);
    }

    return (
        <div className="mt-4">
            <label htmlFor="betinput" className="font-medium text-zinc-300 text-sm">Bet Amount</label>
            <div className="bg-[#343A42] rounded-lg shadow-md shadow-zinc-900">
                <div className='w-[100%] flex border-[4px] border-[#343C47] rounded-lg overflow-hidden'>
                    <input
                        id="betinput"
                        type="number"
                        step={'0.01'}
                        value={BetAmount}
                        onChange={handleInputChange}
                        className='bg-[#23272c] w-16 flex-auto font-semibold text-white focus:outline-none p-[0.4rem] mr-1 rounded-r-[4px]' />
                    <div className="flex rounded-[4px] overflow-hidden">
                        <button className='bg-[#3759F9] cursor-pointer flex justify-center items-center px-[0.5rem] text-white flex-none w-16' onClick={() => { setBetAmount(BetAmount / 2) }}>1/2</button>
                        <button className='bg-[#3759F9] cursor-pointer flex justify-center items-center px-[0.5rem] text-white  border-l-[2px] w-16 border-[#6781FF] flex-none' onClick={() => { setBetAmount(BetAmount * 2) }}>2</button>
                    </div>
                </div>
            </div>
        </div>

    )
}