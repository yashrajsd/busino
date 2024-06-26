import TuneIcon from '@mui/icons-material/Tune';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';

const subOptions=[
  TuneIcon,
  QueryStatsIcon,
  StarOutlineOutlinedIcon
]

export default function Home() {
  return (
    <div className="w-[100%] flex flex-col justify-center items-center py-[2rem]">
        <section className="w-[95%] bg-[#22272E] flex flex-col overflow-hidden lg:h-[89vh] rounded-md">
          <div className="lg:h-[93%] w-[100%]">
            <div className="lg:w-[25%] lg:h-[100%] border-r-[1px] border-[#343C47]">
              
            </div>
            <div className="flex-1">

            </div>
          </div>
          <div className="flex-1 bg-[#5875FF]">
            <ul className='flex text-white h-[100%] items-center gap-[1rem] px-[1rem]'>
              {subOptions.map((Item)=>{
                return(
                  <li className='p-[0.4rem] duration-300 hover:bg-[#859BFF] cursor-pointer rounded-md'>
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
