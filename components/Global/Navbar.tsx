

export default function Navbar(){
  return (
    <div className="flex w-[100%] justify-between">
      <input placeholder="Search" className="p-[0.7rem] w-[30%] rounded-[2px] border-[1px] text-white font-semibold focus:outline-none border-[#3d3d3d] bg-transparent"/>
      <span className="flex gap-[1rem]">
        <button className="p-[0.7rem] text-white">Sign In</button>
        <button className="bg-[#5875FF] text-white py-[0.7rem] px-[1rem] rounded-[3px]">Register</button>
      </span>
    </div>
  )
}

