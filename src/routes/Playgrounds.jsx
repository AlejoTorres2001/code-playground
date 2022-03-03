import Footer from "../components/Footer";
import MobileNavBar from "../components/MobileNavBar";
import NavBar from "../components/NavBar";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { collection, query, where } from "firebase/firestore";
import { auth } from "../firebase";
import Playground from "../components/Playground";
import { ExclamationIcon } from "@heroicons/react/outline";
import CreatePlaygroundButton from "../components/CreatePlaygroundButton";
const Playgrounds = () => {
  //firebase
  const [user, loading, error] = useAuthState(auth);
  const q = query(
    collection(db, "playgrounds"),
    where("owner", "==", user?.email || "")
  );
  const [value, loadingCollection, errorCollection] = useCollection(q);
  //width hook
  const { height, width } = useWindowDimensions();
  return (
    <div className="scrollbar-hide">
      <div className="flex">
        {width > 1000 && <NavBar />}
        <div className="bg-img md:h-screen w-screen md:ml-[4rem] flex bg-[#4F525B]  justify-center items-center flex-col md:flex-row md:flex-wrap">
          {value?.docs.length === 0 && (
            <div className="bg-[#2D323C]  h-1/5 w-2/4 flex flex-col justify-center items-center rounded-md shadow-md">
              <ExclamationIcon className="text-[#F7DF1E] w-[3rem] h-[3rem]"></ExclamationIcon>
              <h1 className="text-xl text-center text-white ">
                Ups! Looks like you don't have playgrounds yet...
              </h1>
              <h2 className="text-lg text-white">What are you waiting for!</h2>
              <CreatePlaygroundButton />
            </div>
          )}
          {loading && <span>Collection: Loading...</span>}
          {value &&
            value.docs.map((doc) => (
              <Playground document={doc} key={doc.id}></Playground>
            ))}
        </div>
      </div>
      {width <= 600 && <MobileNavBar />}
      <Footer></Footer>
    </div>
  );
};

export default Playgrounds;
