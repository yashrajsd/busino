import TuneIcon from '@mui/icons-material/Tune';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

export const GameFooter = () => {
    //todo make a seperate component of each suboption and implement the feature

    const subOptions = [
        TuneIcon,
        QueryStatsIcon,
        StarOutlineOutlinedIcon
    ]

    return (
        <div className="w-full bg-[#5875FF] h-14">
            <ul className='flex text-white h-[100%] items-center gap-[1rem] px-[1rem]'>
                {subOptions.map((Item, index) => {
                    return (
                        <li key={index} className='p-[0.4rem] duration-300 hover:bg-[#859BFF] cursor-pointer rounded-md'>
                            <Item className='lg:text-[1.2rem]' />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
