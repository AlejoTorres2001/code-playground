import { AdjustmentsIcon, CollectionIcon, HomeIcon, LoginIcon, LogoutIcon, SaveAsIcon } from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import { auth, logOut, signInWithGoogle } from "../firebase";

const MobileNavBar = ({openModal}) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const openPickNameModal = () => {
    if (!user) {
      return;
    }
    openModal();
  };

  return <nav className="w-screen bg-[#2D323C] flex items-center justify-between">
    <ul className="flex grow items-center justify-center">
    <li className="w-full flex flex-col items-center justify-center hover:bg-[#1E1E1E] transition: duration-200 ease-in space-x-1">
          <Link to="/" className="flex items-center h-[2rem] " href="">
            <HomeIcon
              color="#4F525B"
              width={"2rem"}
              height={"2rem"}
            ></HomeIcon>
          </Link>
         <span className="text-[#C8C8C9]">Home</span>
        </li>
        <li className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in flex flex-col justify-center items-center space-x-1">
          <Link to="/playgrounds" className="flex items-center h-[2rem]" href="">
            <CollectionIcon
              color="#4F525B"
              className="m-4"
              width={"2rem"}
              height={"2rem"}
            ></CollectionIcon>
          </Link>
         <span className="text-[#C8C8C9]">Playgrounds</span>

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
         <span className="text-[#C8C8C9]">Save</span>
              
            </li>
          )}
           <li className="w-full hover:bg-[#1E1E1E] transition: duration-200 ease-in flex flex-col justify-center items-center space-x-1">
          <Link to="#" className="flex items-center h-[2rem]" href="">
            <AdjustmentsIcon
              color="#4F525B"
              className="m-4"
              width={"2rem"}
              height={"2rem"}
            ></AdjustmentsIcon>
          </Link>
         <span className="text-[#C8C8C9]">Settings</span>

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
         <span className="text-[#C8C8C9]">Log-Out</span>

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
         <span className="text-[#C8C8C9]">Log-In</span>

          </li>
        )}
    </ul>
  </nav>;
};

export default MobileNavBar;
