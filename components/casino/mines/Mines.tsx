import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import purpleGem from '../../../utils/images/mines/purplegem.png';
import bomb from '../../../utils/images/mines/bomb.png';

const generatedMine = [
    1, 1, 0, 1, 0,
    0, 1, 1, 0, 0,
    1, 0, 1, 1, 1,
    0, 1, 0, 1, 1,
    1, 0, 0, 1, 1
];

interface MinesProps {
    clicked: boolean[];
    gameSession: number | null;
    active: boolean;
    setClicked: React.Dispatch<React.SetStateAction<boolean[]>>;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    setProfit: React.Dispatch<React.SetStateAction<number>>;
    setEnded: React.Dispatch<React.SetStateAction<boolean>>;
    ended:boolean
}

const Mines: React.FC<MinesProps> = ({ setClicked, setEnded , clicked,setProfit, ended, gameSession, active, setActive }) => {
    const [game, setGame] = useState<number[]>(generatedMine);
    

    useEffect(() => {
        setClicked(new Array(game.length).fill(false));
    }, [game]);

    const handleClick = async (index: number) => {
        if (!active || ended) return;

        try {
            if (gameSession === null) {
                throw new Error('No active game session');
            }

            const response = await fetch("http://localhost:3000/api/casino/mines/click", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gameSession, index }),
            });

            const data = await response.json();
            if (data.status == 400) {
                setClicked(prevClicked => {
                    const newClicked = [...prevClicked];
                    newClicked[index] = true;
                    return newClicked;
                });
                setEnded(true);
                setActive(false);
                return;
            }


            setClicked(prevClicked => {
                const newClicked = [...prevClicked];
                newClicked[index] = true;
                return newClicked;
            });

            setProfit(data.profit)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="h-[42vw] w-[42vw] bg-gray-900 grid grid-cols-5 grid-rows-5 gap-1 p-1">
            {game.map((item, index) => (
                <div
                    key={index}
                    className={`w-full h-full flex items-center justify-center border border-gray-700 
                                ${clicked[index] ? 'bg-gray-800' : 'bg-gray-600 hover:bg-gray-500 cursor-pointer hover:scale-110 hover:shadow-indigo-500/50'}
                                transition-all duration-300 ease-in-out rounded-md shadow-2xl `}
                    onClick={() => handleClick(index)}
                >
                    {clicked[index] ? (
                        <Image
                            src={item === 1 ? purpleGem : bomb}
                            alt='item'
                            className={`w-3/4 h-3/4 ${ended && ('opacity-10')}`}
                        />
                    ) : (
                        <div className="w-3/4 h-3/4 bg-gray-600"></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Mines;
