import {
  HomeIcon,
  AdjustmentsIcon,
  CollectionIcon,
  LogoutIcon,
  SaveAsIcon,
} from "@heroicons/react/outline";
const NavBar = () => {
  return (
    <nav className="group z-10 w-[4rem] h-screen fixed bg-[#2D323C] hover:w-64 transition: duration-200 ease-in">
      <ul className="list-none p-0 m-0 flex flex-col items-center h-full">
        <li className="w-full">
          <a className="flex items-center h-[5rem] " href="">
            <HomeIcon color="#4F525B" width={"5rem"} height={"3rem"} className="m-4 btn-1" ></HomeIcon>
             <span className="hidden ml-1 group-hover:block 
             transition: delay-200 duration-200 ease-in-out text-[#C8C8C9]">Playground</span>
          </a>
        </li>
        <li className="w-full">
          <a className="flex items-center " href="">
            <CollectionIcon color="#4F525B" className="m-4" width={"5rem"} height={"3rem"}></CollectionIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">My Playgrounds</span>

          </a>
        </li>
        <li className="w-full">
          <a className="flex items-center " href="">
            <SaveAsIcon color="#4F525B" className="m-4" width={"5rem"} height={"3rem"}></SaveAsIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">Save Playground</span>

          </a>
        </li>
        <li className="w-full">
          <a className="flex items-center" href="">
            <AdjustmentsIcon color="#4F525B" className="m-4" width={"5rem"} height={"3rem"}></AdjustmentsIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">Settings</span>

          </a>
        </li>
        <li className="w-full mt-auto">
          <a className="flex items-center" href="">
            <LogoutIcon color="#4F525B " className="m-4" width={"5rem"} height={"3rem"}></LogoutIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">Log-Out</span>

          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
