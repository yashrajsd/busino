interface profitestimateProps {
    BetAmount: number,
    Multiplier: number
}

export const ProfitEstimate = ({BetAmount, Multiplier}: profitestimateProps) => {
    
    const EstimatedProfit = BetAmount*Multiplier;

    return (
        <div className="mt-4">
            <label htmlFor="profitestimate" className="font-medium text-zinc-300 text-sm">Profit on win</label>
            <div className="bg-[#343A42] rounded-lg shadow-md shadow-zinc-900">
                <div className='w-[100%] flex border-[4px] border-[#343C47] rounded-lg overflow-hidden'>
                    <input 
                    id="profitestimate" 
                    type="text" 
                    step={'0.01'} 
                    disabled={true} 
                    value={EstimatedProfit} 
                    className='bg-[#23272c] w-16 shadow-md shadow-zinc-900 flex-auto font-semibold text-white focus:outline-none p-[0.4rem]' />
                </div>
            </div>
        </div>
    )
}