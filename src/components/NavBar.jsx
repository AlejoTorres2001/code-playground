import {
  HomeIcon,
  AdjustmentsIcon,
  CollectionIcon,
  LogoutIcon,
  SaveAsIcon,
  LoginIcon,
  ArrowsExpandIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { logOut, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Layout1 from "../assets/layout1.svg";
import Layout2 from "../assets/layout2.svg";
import Layout3 from "../assets/layout3.svg";
import Skypack from "../assets/skypack.svg";

import LayoutSetting from "./LayoutSetting";
const NavBar = ({ openModal, setLayout, layout ,openSearchBar}) => {
  
  //state-settings
  const [showSettings, setShowSettings] = useState(false);
  const [radioPick, setRadioPick] = useState(layout);
  //react-router
  const location = useLocation();
  const navigate = useNavigate();
  //firabase auth
  const [user, loading, error] = useAuthState(auth);
  //state-redux
  const code = useSelector((state) => state.code);
  const dispatch = useDispatch();
  const { setCode } = bindActionCreators(actionCreators, dispatch);
  const goToNewPlayground = () => {
    setCode("", "html");
    setCode("", "css");
    setCode("", "javascript");
    navigate("/");
  };
  const openPickNameModal = () => {
    if (!user) {
      toast.warning("Sign in to save a playground");
      return;
    }
    openModal();
  };
  const openFullScreen = () => {
    //open iframe in new window
    navigate(`/fullscreen`);
  };
  const changeLayout = (e) => {
    setRadioPick(e.target.value);
    setLayout(e.target.value);
  };
  return (
    <nav className="group z-10 w-[4rem] h-screen fixed bg-[#2D323C] hover:w-64 transition: duration-200 ease-in top-0">
      <ToastContainer></ToastContainer>
      <ul className="list-none p-0 m-0 flex flex-col items-center h-full">
        <li>
          <Link
            to="/"
            href="#"
            className="flex items-center justify-center w-full h-full font-bold  uppercase mb-[1rem] text-center tracking-wide "
          >
            <span className="text-[#F7DF1E]">c</span>
            <span className="text-[#E34F26]">o</span>
            <span className="text-[#0C73B8]">d</span>
            <span className="text-[#F7DF1E]">i</span>
            <span className="text-[#E34F26]">f</span>
            <span className="text-[#0C73B8]">y</span>
          </Link>
        </li>
        <li
          onClick={goToNewPlayground}
          className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in "
        >
          <span className="flex items-center h-[5rem] " href="blank">
            <HomeIcon
              color="#4F525B"
              width={"5rem"}
              height={"3rem"}
              className="m-4"
            ></HomeIcon>
            <span
              href="#"
              className="hidden ml-1 group-hover:block text-[#C8C8C9] "
            >
              New Playground
            </span>
          </span>
        </li>
        <li
          onClick={openFullScreen}
          className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in "
        >
          <Link to="#" className="flex items-center h-[5rem] " href="">
            <ArrowsExpandIcon
              color="#4F525B"
              width={"5rem"}
              height={"3rem"}
              className="m-4"
            ></ArrowsExpandIcon>
            <Link
              to="/fullscreen"
              className="hidden ml-1 group-hover:block text-[#C8C8C9] "
            >
              Full-Screen
            </Link>
          </Link>
        </li>
        <li className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in">
          <Link to="/playgrounds" className="flex items-center " href="">
            <CollectionIcon
              color="#4F525B"
              className="m-4"
              width={"5rem"}
              height={"3rem"}
            ></CollectionIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">
              My Playgrounds
            </span>
          </Link>
        </li>
        {location.pathname !== "/playgrounds" &&
          location.pathname !== "/settings" && (
            <li
              onClick={openPickNameModal}
              className={` w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in`}
            >
              <Link to="#" className="flex items-center " href="">
                <SaveAsIcon
                  color="#4F525B"
                  className="m-4"
                  width={"5rem"}
                  height={"3rem"}
                ></SaveAsIcon>
                <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">
                  Save Playground
                </span>
              </Link>
            </li>
          )}
          <li
             
              className={` w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in`} onClick={openSearchBar}
            >
              <Link to="#" className="flex items-center " href="">
                {/* sketchy solution */}
                <img src={Skypack} className="w-[4rem] h-[2rem] m-4  group-hover:w-[5rem] group-hover:h-[3rem]" />
                <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">
                  SkyPack
                </span>
              </Link>
            </li>

        <li
          onClick={() => setShowSettings(!showSettings)}
          className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in"
        >
          <Link to="#" className="flex items-center" href="">
            <AdjustmentsIcon
              color="#4F525B"
              className="m-4"
              width={"5rem"}
              height={"3rem"}
            ></AdjustmentsIcon>
            <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">
              Settings
            </span>
          </Link>
        </li>
        {showSettings && (
          <li className="w-full transition: duration-200 ease-in flex flex-col text-[#C8C8C9]">
            <div>
              <h2 className=" text-md  text-center ">Layouts</h2>
            </div>
            <div className="flex flex-col justify-center items-center my-1 ml-[10%] ">
              <LayoutSetting
              LayoutImg={Layout1}
              name="Layout 1"
              value="1"
              handleChange={changeLayout}
              pickedValue={radioPick}
              />          
              <LayoutSetting
              LayoutImg={Layout2}
              name="Layout 2"
              value="2"
              handleChange={changeLayout}
              pickedValue={radioPick}
              />    
              <LayoutSetting
              LayoutImg={Layout3}
              name="Layout 3"
              value="3"
              handleChange={changeLayout}
              pickedValue={radioPick}
              />    
            </div>
          </li>
        )}
        {user ? (
          <li className="w-full mt-auto hover:bg-[#1E1E1E] transition: duration-200 ease-in">
            <Link
              to="#"
              onClick={() => logOut()}
              className="flex items-center"
              href=""
            >
              <LogoutIcon
                color="#4F525B "
                className="m-4"
                width={"5rem"}
                height={"3rem"}
              ></LogoutIcon>
              <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">
                Log-Out
              </span>
            </Link>
          </li>
        ) : (
          <li className="w-full mt-auto hover:bg-[#1E1E1E] transition: duration-200 ease-in">
            <Link
              to="#"
              onClick={() => signInWithGoogle()}
              className="flex items-center"
              href=""
            >
              <LoginIcon
                color="#4F525B "
                className="m-4"
                width={"5rem"}
                height={"3rem"}
              ></LoginIcon>
              <span className="hidden ml-1 group-hover:block text-[#C8C8C9]">
                Log-In
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
