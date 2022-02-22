
import {SearchIcon, XIcon} from "@heroicons/react/outline"
const SkyPackSearchBar = ({closeSearchBar}) => {
  return (
    <div className="ml-9 bg-[#2D323C] flex flex-col  p-1  ">
         <div className="flex w-full justify-end">
        <div className=" rounded-full m-[0.1rem] hover:bg-red-500 hover:cursor-pointer" onClick={closeSearchBar} >
                  <XIcon className="text-black w-[0.8rem] h-[0.8rem] md:w-[1rem] md:h-[1rem]"></XIcon>
        </div>
        </div>
        <div className="ml-9">
        <h1 className="text-white  "><span className="font-bold text-[#ABADB1]">JavaScript:</span> Add dependency</h1>
        <p className="text-sm text-[#C8C8C9] ">An import statement will be added to the top of the JavaScript editor for the package.</p>
        </div>
        
        <div className="flex  w-[80%] bg-[#2F363D] ml-9 mt-2 border border-black rounded-sm">
             <SearchIcon width={"2rem"} height={"1.5rem"} className="mt-1 text-[#52565A]" ></SearchIcon> 
        <input className=" text-left   w-full h-8 bg-[#2F363D] text-[#C8C8C9] placeholder:text-[#52565A] outline-none" type="text" placeholder="Search and add a package" />

        </div>

        </div>
  )
}

export default SkyPackSearchBar