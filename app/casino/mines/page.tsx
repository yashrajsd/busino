"use client"
import TuneIcon from '@mui/icons-material/Tune';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { useCallback, useEffect, useState } from 'react';
import Mines from '@/components/casino/mines/Mines';

const subOptions = [
  TuneIcon,
  QueryStatsIcon,
  StarOutlineOutlinedIcon
];

const generatedMine = [
  1, 1, 0, 1, 0,
  0, 1, 1, 0, 0,
  1, 0, 1, 1, 1,
  0, 1, 0, 1, 1,
  1, 0, 0, 1, 1
];

const minesOpt = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
];

export default function Home() {
  const [betAmt, setBetAmt] = useState(0.0);
  const [mines, setMines] = useState(0);
  const [auto, setAuto] = useState(false);
  const [bets, setBets] = useState(0);
  const [wReset, setWReset] = useState(true);
  const [lReset, setLReset] = useState(true);
  const [perW, setPerW] = useState(0);
  const [perL, setPerL] = useState(0);
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(Array(generatedMine.length).fill(false));
  const [gameSession, setGameSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profit,setProfit] = useState(0)
  const [ended, setEnded] = useState(false);

  const fetchGameState = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/casino/mines?userId=1&gameId=1`);
      const data = await response.json();
      setActive(data.active);
      if (data.active) {
        setClickedCallback(data.clickedMine);
        setGameSession(data.id);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const setClickedCallback = useCallback((clickedMines: any) => {
    setClicked(clickedMines);
  }, []);

  useEffect(() => {
    fetchGameState();
  }, [setClickedCallback]);

  const handleCashout = async () => {
    if (active) {
      try {
        const response = await fetch("http://localhost:3000/api/casino/mines/cashout", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ gameSession, userId: 1 }),
        });
        if (response.status !== 200) {
          alert("Error occurred");
          return;
        }
        setActive(false);
        setClicked(Array(generatedMine.length).fill(false));
        setGameSession(null); // Clear the game session
      } catch (error) {
        alert("Error occurred");
        console.error(error);
      }
    } else {
      if(ended)
        setEnded(!ended)
      setProfit(0.00)
      if (mines === 0 || mines > 25) {
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/api/casino/mines", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bombs: mines, userId: 1, betAmount: betAmt }),
        });
        if (response.status !== 200) {
          alert("Something went wrong");
          return;
        }
        fetchGameState();
      } catch (error) {
        alert("Error occurred");
        console.error(error);
      }
    }
  };

  const handleBettingAmount = () => {
    
  };

  const handleLPer = (e: any) => {
    if (!lReset) {
      setPerL(e.target.value);
    }
  };

  const handleWPer = (e: any) => {
    if (!wReset) {
      setPerW(e.target.value);
    }
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center py-[2rem]">
        <section className="w-[95%] bg-[#22272E] flex flex-col overflow-hidden lg:h-[89vh] rounded-md">
          <div className="lg:h-[93%] w-[100%] flex">
            <div className="lg:w-[25%] lg:h-[100%] border-r-[1px] py-[1rem] border-[#343C47] flex flex-col gap-[1rem] items-center">
              <div className='bg-[#313D4C] text-[0.9rem] font-semibold flex w-[90%] p-[0.4rem] text-white rounded-full'>
                <span className={`cursor-pointer flex-1 rounded-full p-[0.5rem] ${!auto && ('bg-[#5875FF]')}`} onClick={()=>{setAuto(false)}}>
                  <p className='text-center'>Manual</p>
                </span>
                <span className={`cursor-pointer flex-1 rounded-full p-[0.5rem] ${auto && ('bg-[#5875FF]')}`} onClick={()=>{setAuto(true)}}>
                  <p className='text-center'>Auto</p>
                </span>
              </div>
              <div className="flex-1 w-[90%] ">
                <div className='w-[100%] flex flex-col gap-[1rem]'>
                    <div className='w-[100%] '>
                    <p className='font-semibold text-white text-[0.9rem] mb-[0.5rem]'>Betting amount</p>
                    <div className='w-[100%] flex border-[4px] border-[#343C47] rounded-lg  overflow-hidden'>
                    <input type="number" disabled={active} step={'0.01'} value={betAmt} onChange={(e)=>{setBetAmt(parseFloat(e.target.value))}} className='bg-[#343A42] w-16 flex-auto font-semibold text-white focus:outline-none   p-[0.4rem]'/>
                    <span  className='bg-[#3759F9] cursor-pointer flex justify-center items-center px-[0.5rem] text-white flex-none w-16' onClick={()=>{setBetAmt(betAmt/2)}}>1/2</span>
                    <span  className='bg-[#3759F9] cursor-pointer flex justify-center items-center px-[0.5rem] text-white  border-l-[2px] w-16 border-[#6781FF] flex-none' onClick={()=>{setBetAmt(betAmt*2)}}>2</span>
                    </div>
                    </div>
                    <div className='w-[100%]'>
                    <div className='w-[100%]'>
                    <p className='font-semibold text-white text-[0.9rem] mb-[0.5rem]'>No. of mines</p>
                    <select disabled={active} className='w-[100%] bg-[#343A42] text-white font-semibold p-[0.4rem] focus:outline-none rounded-md' value={mines} onChange={(e)=>{setMines(parseInt(e.target.value))}}>
                      <option selected hidden disabled value={0}>0</option>
                      {minesOpt.map((num,index)=>{
                        return(
                          <option key={index} value={num}>{num}</option>
                        )
                      })}
                    </select>
                    </div>
                    </div>
                    {active && (
                      <div className='w-[100%] '>
                      <p className='font-semibold text-white text-[0.9rem] mb-[0.5rem]'>Profit ({profit})</p>
                      <input type="number" step={'1'}  value={bets} placeholder='infinite' disabled={true} onChange={(e)=>{setBets(parseFloat(e.target.value))}} className='bg-[#343A42] w-[100%] font-semibold text-white focus:outline-none rounded-md p-[0.4rem]'/>
                      </div>
                    )}
                    <div className='flex flex-col gap-[1rem]'>
                      {auto && (
                        <>
                        <div className='w-[100%] '>
                        <p className='font-semibold text-white text-[0.9rem] mb-[0.5rem]'>No. of bets</p>
                        <input type="number" step={'1'}  value={bets} placeholder='infinite' disabled={active} onChange={(e)=>{setBets(parseFloat(e.target.value))}} className='bg-[#343A42] w-[100%] font-semibold text-white focus:outline-none rounded-md p-[0.4rem]'/>
                        </div>
                        <div className='w-[100%]'>
                        <p className='font-semibold text-white text-[0.9rem] mb-[0.5rem]'>On Win</p>
                        <div className='w-[100%] flex'>
                        <span className={`bg-[#343A42] ${wReset && ('bg-[#3759F9]')} cursor-pointer flex justify-center items-center px-[0.5rem] text-white rounded-l-md flex-none w-16`} onClick={()=>{setWReset(true)}}>Reset</span>
                        <span className={`bg-[#343A42] ${!wReset && ('bg-[#3759F9]')} border-r-[2px] border-r-[#22272E]   cursor-pointer flex justify-center items-center px-[0.5rem] text-white  border-l-[2px] w-32 border-[#6781FF] flex-none`} onClick={()=>{setWReset(false)}}>Increase %</span>
                        <input disabled={active} type="number" step={'0.01'} value={perW} onChange={handleWPer} className='bg-[#343A42] w-16 flex-auto font-semibold text-white focus:outline-none rounded-r-md p-[0.4rem]'/>
                        </div>
                        </div>
                        <div className='w-[100%]'>
                        <p className='font-semibold text-white text-[0.9rem] mb-[0.5rem]'>On loss</p>
                        <div className='w-[100%] flex'>
                        <span className={`bg-[#343A42] ${lReset && ('bg-[#3759F9]')} cursor-pointer flex justify-center items-center px-[0.5rem] text-white rounded-l-md flex-none w-16`} onClick={()=>{setLReset(true)}}>Reset</span>
                        <span className={`bg-[#343A42] ${!lReset && ('bg-[#3759F9]')} border-r-[2px] border-r-[#22272E]   cursor-pointer flex justify-center items-center px-[0.5rem] text-white  border-l-[2px] w-32 border-[#6781FF] flex-none`} onClick={()=>{setLReset(false)}}>Increase %</span>
                        <input disabled={active} type="number" step={'0.01'} value={perL} onChange={handleLPer} className='bg-[#343A42] w-16 flex-auto font-semibold text-white focus:outline-none rounded-r-md p-[0.4rem]'/>
                        </div>
                        </div>
                        </>
                      )}
                    </div>
                </div>
                <button className='w-[100%] mt-[2rem] text-white p-[0.7rem] rounded-md font-semibold bg-[#5875FF]' onClick={handleCashout}>{loading ? ('Loading...'):(<>{!active ? ('Bet'):('Cashout')}</>)}</button>
              
            </div>
            </div>
            <div className='flex-1 flex justify-center items-center'>
              <Mines setEnded={setEnded} ended={ended} setProfit={setProfit} setClicked={setClicked} setActive={setActive} clicked={clicked} gameSession={gameSession} active={active}/>
            </div>
          </div>
          <div className="flex-1 bg-[#5875FF]">
            <ul className='flex text-white h-[100%] items-center gap-[1rem] px-[1rem]'>
              {subOptions.map((Item,index)=>{
                return(
                  <li key={index} className='p-[0.4rem] duration-300 hover:bg-[#859BFF] cursor-pointer rounded-md'>
                    <Item className='lg:text-[1.2rem]'/>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
    </div>
  );
}
