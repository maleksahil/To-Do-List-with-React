import React from "react";

const Navbar = () =>{
   return(
    <>
     <nav className="flex justify-between bg-pink-300 text-white py-4">
     <div className="logo">
        <span className="font-bold text-xl mx-8 ">Task Manager</span>
     </div>
        <ul className="flex gap-8 px-5">
            <li className="cursor-pointer hover:font-bold transition-all duration-500">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all duration-500">Your Tasks</li>
        </ul>
     </nav>
    </>
   )
}

export default Navbar