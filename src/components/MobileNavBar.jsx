import {
  AdjustmentsIcon,
  ArrowsExpandIcon,
  CollectionIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  SaveAsIcon,
} from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { auth, logOut, signInWithGoogle } from "../firebase";
import { actionCreators } from "../state";
import Layout1 from "../assets/layout1.svg";
import Layout2 from "../assets/layout2.svg";
import Layout3 from "../assets/layout3.svg";
import { useState } from "react";
const MobileNavBar = ({ openModal, setLayout, layout }) => {
  //state-settings
  const [showSettings, setShowSettings] = useState(false);
  const [radioPick, setRadioPick] = useState(layout);
  //state-redux
  const code = useSelector((state) => state.code);
  const dispatch = useDispatch();
  const { setCode } = bindActionCreators(actionCreators, dispatch);
  //react-router
  const location = useLocation();
  const navigate = useNavigate();
  //firebase
  const [user, loading, error] = useAuthState(auth);
  const openPickNameModal = () => {
    if (!user) {
      return;
    }
    openModal();
  };
  const goToNewPlayground = () => {
    setCode("", "html");
    setCode("", "css");
    setCode("", "javascript");
    navigate("/");
  };
  const changeLayout = (e) => {
    setRadioPick(e.target.value);
    setLayout(e.target.value);
  };

  return (
    <nav className="w-screen bg-[#2D323C] flex flex-col items-center justify-between">
      {showSettings && (
        <div>
          <div>
            <h2 className=" text-md  text-center text-[#C8C8C9] ">Layouts</h2>
          </div>
          <div className="flex w-full  justify-evenly items-center space-x-3">
            <span className=" flex my-2 space-x-1">
              <input
                type="radio"
                name="layout1"
                id="layout1"
                value={"1"}
                onChange={changeLayout}
                checked={radioPick === "1"}
              />
              <img src={Layout1} />
            </span>
            <span className="flex my-2 space-x-1">
              <input
                type="radio"
                name="layout2"
                id="layout2"
                value={"2"}
                onChange={changeLayout}
                checked={radioPick === "2"}
              />
              <img src={Layout2} />
            </span>
            <span className="flex my-2 space-x-1">
              <input
                type="radio"
                name="layout3"
                id="layout3"
                value={"3"}
                onChange={changeLayout}
                checked={radioPick === "3"}
              />
              <img src={Layout3} />
            </span>
          </div>
        </div>
      )}

      <ul className="flex grow w-full items-center justify-center">
        <li
          className="w-full flex flex-col items-center justify-center hover:bg-[#1E1E1E] transition: duration-200 ease-in space-x-1"
          onClick={goToNewPlayground}
        >
          <span className="flex items-center h-[2rem] " href="">
            <HomeIcon color="#4F525B" width={"2rem"} height={"2rem"}></HomeIcon>
          </span>
          <span className="text-[#C8C8C9] text-[0.6rem]">New Playground</span>
        </li>

        <li className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in flex flex-col justify-center items-center space-x-1">
          <Link
            to="/playgrounds"
            className="flex items-center h-[2rem]"
            href=""
          >
            <CollectionIcon
              color="#4F525B"
              className="m-4"
              width={"2rem"}
              height={"2rem"}
            ></CollectionIcon>
          </Link>
          <span className="text-[#C8C8C9] text-[0.6rem]">Playgrounds</span>
        </li>
        {location.pathname !== "/playgrounds" &&
          location.pathname !== "/settings" && (
            <li
              onClick={openPickNameModal}
              className=" w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in flex flex-col justify-center items-center space-x-1"
            >
              <Link to="#" className="flex items-center h-[2rem] " href="">
                <SaveAsIcon
                  color="#4F525B"
                  className="m-4"
                  width={"2rem"}
                  height={"2rem"}
                ></SaveAsIcon>
              </Link>
              <span className="text-[#C8C8C9] text-[0.6rem]">Save</span>
            </li>
          )}

        <li
          onClick={() => setShowSettings(!showSettings)}
          className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in flex flex-col justify-center items-center space-x-1"
        >
          <Link to="#" className="flex items-center h-[2rem]" href="">
            <AdjustmentsIcon
              color="#4F525B"
              className="m-4"
              width={"2rem"}
              height={"2rem"}
            ></AdjustmentsIcon>
          </Link>
          <span className="text-[#C8C8C9] text-[0.6rem]">Settings</span>
        </li>
        <li className="w-full flex flex-col items-center justify-center hover:bg-[#1E1E1E] transition: duration-200 ease-in space-x-1">
          <Link
            to="/fullscreen"
            className="flex items-center h-[2rem] "
            href=""
          >
            <ArrowsExpandIcon
              color="#4F525B"
              width={"2rem"}
              height={"2rem"}
            ></ArrowsExpandIcon>
          </Link>
          <span className="text-[#C8C8C9] text-[0.6rem]">Full-Screen</span>
        </li>
        {user ? (
          <li className="w-full mt-auto hover:bg-[#1E1E1E] transition: duration-200 ease-in flex flex-col justify-center items-center space-x-1">
            <Link
              to="#"
              onClick={() => logOut()}
              className="flex items-center h-[2rem]"
              href=""
            >
              <LogoutIcon
                color="#4F525B "
                className="m-4"
                width={"2rem"}
                height={"2rem"}
              ></LogoutIcon>
            </Link>
            <span className="text-[#C8C8C9] text-[0.6rem]">Log-Out</span>
          </li>
        ) : (
          <li className="w-full mt-auto hover:bg-[#1E1E1E] transition: duration-200 ease-in flex flex-col justify-center items-center space-x-1">
            <Link
              to="#"
              onClick={() => signInWithGoogle()}
              className="flex items-center h-[2rem]"
              href=""
            >
              <LoginIcon
                color="#4F525B"
                className="m-4"
                width={"2rem"}
                height={"2rem"}
              ></LoginIcon>
            </Link>
            <span className="text-[#C8C8C9] text-[0.6rem]">Log-In</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MobileNavBar;
