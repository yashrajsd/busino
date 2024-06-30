import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Image from "next/image";
import logo from '../../utils/images/landing/logo.png'
import SkateboardingIcon from '@mui/icons-material/Skateboarding';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StyleIcon from '@mui/icons-material/Style';
import ForumIcon from '@mui/icons-material/Forum';
import CasinoIcon from '@mui/icons-material/Casino';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
interface SidebarProps {
    slide: boolean;
    setSlide: React.Dispatch<React.SetStateAction<boolean>>;
}

const navgames = [
    {
        icon: CasinoIcon,
        title: 'Casino'
    },
    {
        icon: SportsBasketballIcon,
        title: 'Sports'
    },
    {
        icon: ThumbsUpDownIcon,
        title: 'Elections'
    }
]

const navbtns = [
    {
        icon: SkateboardingIcon,
        title: "Leaderboard"
    },
    {
        icon: AutoAwesomeIcon,
        title: "Vip Club"
    },
    {
        icon: StyleIcon,
        title: "Blogs"
    },
    {
        icon: ForumIcon,
        title: "Forum"
    }
]

const Sidebar: React.FC<SidebarProps> = ({ slide, setSlide }) => {
    return (
        <div className={`sidebar ${slide ? 'w-[15%]' : 'w-[6%]'} fixed bg-[#22272E] h-[100vh]`}>
            {/* <button onClick={()=>{setSlide(!slide)}}>Click me</button> */}
            <div className="p-[1rem] w-[100%] flex justify-center items-center">
                <h1 className={`text-white ${slide && 'w-[100%]'} flex items-center justify-between gap-[0.5rem] font-bold`}>{slide && <Image src={logo} alt="logo of basino" className="w-[4rem]" />} <span className="p-[0.7rem] px-[1rem] bg-[#131313] rounded-md" onClick={() => { setSlide(!slide) }}><KeyboardArrowRightIcon className="text-[1rem]" /></span></h1>
            </div>
            <div className="w-[100%] p-[1rem] ">
                <div className="w-[100%] flex flex-col gap-[1rem]">
                    <div className=" rounded-md ">
                        <h1 className={`font-bold text-white mb-[1rem] text-[0.85rem] ${slide ? ('block') : ('hidden')}`}>Games</h1>
                        <div className="flex flex-col gap-[1.2rem]">
                            {navgames.map((game, index) => {
                                return (
                                    <div className="w-[100%]" key={index}>
                                        <span className={`duration-300 hover:translate-y-[-0.2rem] rounded-md hover:bg-[#374151]  flex gap-[0.8em] items-center ${!slide && ('justify-center')}  text-white text-[0.9rem] font-semibold cursor-pointer`}>
                                            <span className="bg-[#374151]g p-[0.4rem] px-[0.6rem] rounded-md">
                                                <game.icon className={`${slide ? ('text-[0.9rem]') : ('text-[1.2rem]')}`} />
                                            </span>
                                            <h5 className={`${slide ? ('block') : ('hidden')}`}>
                                                {game.title}
                                            </h5>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className=" rounded-md ">
                        <h1 className={`font-bold text-white mb-[1rem] text-[0.85rem] ${slide ? ('block') : ('hidden')}`}>Other Options</h1>
                        <div className="flex flex-col gap-[1.2rem]">
                            {navbtns.map((game, index) => {
                                return (
                                    <div className="w-[100%]" key={index}>
                                        <span className={`duration-300 hover:translate-y-[-0.2rem] rounded-md hover:bg-[#374151]  flex gap-[0.8em] ${!slide && ('justify-center')} items-center jusitfy-center text-white text-[0.9rem] font-semibold cursor-pointer`}>
                                            <span className=" p-[0.4rem] px-[0.6rem] flex rounded-md">
                                                <game.icon className={`${slide ? ('text-[0.9rem]') : ('text-[1.2rem]')}`} />
                                            </span>
                                            <h5 className={`${slide ? ('block') : ('hidden')}`}>
                                                {game.title}
                                            </h5>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
