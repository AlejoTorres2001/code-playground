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
const Playgrounds = () => {
  const [user, loading, error] = useAuthState(auth);
  const { height, width } = useWindowDimensions();
  const q = query(
    collection(db, "playgrounds"),
    where("owner", "==", user?.email || "")
  );
  const [value, loadingCollection, errorCollection] = useCollection(q);
  return (
    <div className="scrollbar-hide  bg-red-300">
      <div className="flex">
        {width > 1000 && <NavBar />}
        <div className="bg-img w-screen h-screen md:ml-[4rem] flex bg-[#4F525B]  justify-center items-center flex-col md:flex-row">
          {loading && <span>Collection: Loading...</span>}
          {value &&
            value.docs.map((doc) => (
              <Playground
                doc={doc}
              ></Playground>
            ))}
        </div>
      </div>
      {width <= 600 && <MobileNavBar />}
      <Footer></Footer>
    </div>
  );
};

export default Playgrounds;
