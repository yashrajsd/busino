interface BetButtonProps {
    handler: () => void;
}

export const BetButton: React.FC<BetButtonProps> = ({ handler }) => {
    return (
        <div>
            <button
                className='w-[100%] mt-4 text-white p-[0.7rem] rounded-md shadow-md shadow-zinc-900 h-12 font-semibold bg-[#5875FF]'
                onClick={handler}>
                Bet
            </button>
        </div>
    )
}