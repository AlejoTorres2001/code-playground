import Footer from "../components/Footer";
import MobileNavBar from "../components/MobileNavBar";
import NavBar from "../components/NavBar";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
const Playgrounds = () => {
  const [user, loading, error] = useAuthState(auth);
  const { height, width } = useWindowDimensions();
   return (
    <div className="scrollbar-hide  bg-red-300">
      <div className="flex">
      {
        width > 1000  && (
          
          <NavBar/>
          
          
          )
        }
        <div className="grow w-screen h-screen ml-[4rem]  flex bg-[#4F525B]">
          holaasdasd
        </div>
      </div>
      {width <= 600 && <MobileNavBar />}
      <Footer></Footer>
    </div>
  );
}

export default Playgrounds;
