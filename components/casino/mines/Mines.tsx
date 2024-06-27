import { useEffect, useState } from 'react';
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



export default function Mines() {
    const [clicked, setClicked] = useState(Array(generatedMine.length).fill(false));
    const [game,setGame] = useState(generatedMine)

    useEffect(()=>{
        fetch(`http://localhost:3000/api/casino/mines?bombs=${7}`)
        .then(response => response.json())
        .then(data => setGame(data.array))
        .catch(error => console.error('Error:', error));
    },[])

    const handleClick = (index: number) => {
        setClicked(prevState => {
            const newClicked = [...prevState];
            if (!newClicked[index] && generatedMine[index] === 1) {
                
            }
            newClicked[index] = true;
            return newClicked;
        });
    };


    return (
        <div className="h-[42vw] w-[42vw] bg-gray-900 grid grid-cols-5 grid-rows-5 gap-1 p-1">
            {game.map((item, index) => (
                <div
                    key={index}
                    className={`w-full h-full flex items-center justify-center border border-gray-700 
                                ${clicked[index] ? 'bg-gray-800' : 'bg-gray-600 hover:bg-gray-500 cursor-pointer'}
                                transition-all duration-300 ease-in-out`}
                    onClick={() => handleClick(index)}
                >
                    {clicked[index] ? (
                        <Image
                            src={item === 1 ? purpleGem : bomb}
                            alt='item'
                            className='w-3/4 h-3/4'
                        />
                    ) : (
                        <div className="w-3/4 h-3/4 bg-gray-600"></div> 
                    )}
                </div>
            ))}
        </div>
    );
}
