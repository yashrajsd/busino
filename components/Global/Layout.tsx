'use client'
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slide, setSlide] = useState(true);

  return (
    <div className="flex">
      <Sidebar slide={slide} setSlide={setSlide}/>
      <div className={`sidebar ${slide ? 'w-[15%]' : 'w-[6%]'} bg-[#22272E] h-[100vh]`}/>
      <div className={`main-content relative flex  flex-wrap flex-col transition-all flex-1 duration-300 ${slide ? 'w-[82%]' : 'w-[92%]'} py-[1rem] px-[1rem]`}>
        <Navbar/>
        {children}
      </div>
    </div>
  );
};

export default Layout;
