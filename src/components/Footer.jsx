import { useLocation } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Footer = () => {
  const location = useLocation();
  const { height, width } = useWindowDimensions();

  return (
    <footer
      className={`${
        location.pathname === "/playgrounds" ? "inset-x-0 bottom-0" : ""
      } flex grow items-center justify-center flex-col    bg-[#2D323C]  `}
    >
      {width <= 600 &&
       (
         <div>
<span className="text-[#F7DF1E]">c</span>
        <span className="text-[#E34F26] text-lg">o</span>
        <span className="text-[#0C73B8] text-lg">d</span>
        <span className="text-[#F7DF1E] text-lg">i</span>
        <span className="text-[#E34F26] text-lg">f</span>
        <span className="text-[#0C73B8] text-lg">y</span>
         </div>
        
       )}
     <span className={`${width<=600 ? "ml-auto" : "" } text-[#C8C8C9] text-sm`}>
       <a href="https://github.com/AlejoTorres2001/code-playground">

     Alejo Torres |  © 2022
       </a>
       </span> 
      
    </footer>
  );
};

export default Footer;
