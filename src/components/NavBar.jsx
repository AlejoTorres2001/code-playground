import {
  HomeIcon,
  AdjustmentsIcon,
  CollectionIcon,
  LogoutIcon,
  SaveAsIcon,
  LoginIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { logOut, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import {db}  from "../firebase.js" 
import { addDoc, collection } from "firebase/firestore";
const NavBar = () => {
  const state = useSelector((state) => state);
  const [user, loading, error] = useAuthState(auth);
  const isThereCode = () => {
    return state.code.html !=="" || state.code.css !=="" || state.code.javascript !==""
  }
  const savePlayground = ()=>{
    if(!user) {
      return 
    }
    if (!isThereCode()) return

    const playground = {
      owner: user.email,
      code:{
          html:state.code.html,
          css:state.code.css,
          javascript:state.code.javascript,
      }
    }
    addDoc(collection(db,"playgrounds"),playground).then(
      (docRef)=>{
        console.log(docRef)
      }
    )
  }
  return (
    <nav className="group z-10 w-[4rem] h-screen fixed bg-[#2D323C] hover:w-64 transition: duration-200 ease-in top-0">
      <ul className="list-none p-0 m-0 flex flex-col items-center h-full">
          <li>
            <Link to="/" href="#" className="flex items-center justify-center w-full h-full font-bold  uppercase mb-[1rem] text-center tracking-wide ">
                <span className="text-[#F7DF1E]">c</span>
                <span className="text-[#E34F26]">o</span>
                <span className="text-[#0C73B8]">d</span>
                <span className="text-[#F7DF1E]">i</span>
                <span className="text-[#E34F26]">f</span>
                <span className="text-[#0C73B8]">y</span>
            </Link>
          </li>
        <li className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in ">
          <Link to="/" className="flex items-center h-[5rem] " href="">
            <HomeIcon color="#4F525B" width={"5rem"} height={"3rem"} className="m-4 btn-1" ></HomeIcon>
             <Link to="/" className="hidden ml-1 group-hover:block text-[#C8C8C9] ">Playground</Link>
          </Link>
        </li>
        <li className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in">
          <Link to="/playgrounds" className="flex items-center " href="">
            <CollectionIcon color="#4F525B" className="m-4" width={"5rem"} height={"3rem"}></CollectionIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">My Playgrounds</span>

          </Link>
        </li>
        <li onClick={()=>savePlayground()} className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in">
          <Link to="#"   className="flex items-center " href="">
            <SaveAsIcon  color="#4F525B" className="m-4" width={"5rem"} height={"3rem"}></SaveAsIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">Save Playground</span>

          </Link>
        </li>
        <li className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in">
          <Link to="#" className="flex items-center" href="">
            <AdjustmentsIcon color="#4F525B" className="m-4" width={"5rem"} height={"3rem"}></AdjustmentsIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">Settings</span>

          </Link>
        </li>
        {user ?  (
          <li className="w-full mt-auto hover:bg-[#1E1E1E] transition: duration-200 ease-in">
          <Link to="#" onClick={()=>logOut()} className="flex items-center" href="">
            <LogoutIcon color="#4F525B " className="m-4" width={"5rem"} height={"3rem"}></LogoutIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">Log-Out</span>
          </Link>
        </li> 
        )
        :
        <li className="w-full mt-auto hover:bg-[#1E1E1E] transition: duration-200 ease-in">
          <Link to="#" onClick={()=>signInWithGoogle()} className="flex items-center" href="">
            <LoginIcon color="#4F525B " className="m-4" width={"5rem"} height={"3rem"}></LoginIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">Log-In</span>
          </Link>
        </li> 
        }
      </ul>
    </nav>
  );
};

export default NavBar;
