import Footer from "../components/Footer";
import MobileNavBar from "../components/MobileNavBar";
import NavBar from "../components/NavBar";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {db} from "../firebase";
import { collection, query, where } from "firebase/firestore";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const Playgrounds = () => {
  const [user, loading, error] = useAuthState(auth);
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();
  const q = query(collection(db, "playgrounds"), where("owner", "==", user?.email || ""));
  const [value,loadingCollection,errorCollection] = useCollection(q);
  console.log(value)
   return (
    <div className="scrollbar-hide  bg-red-300">
      <div className="flex">
      {
        width > 1000  && (
          <NavBar/>
          )
        }
        <div className="grow w-screen h-screen ml-[4rem]  flex bg-[#4F525B]">
        {loading && <span>Collection: Loading...</span>}
        {value && (
         value.docs.map((doc) => (
              <div className="m-3" key={doc.id}>
                <h1>{doc.data().name}</h1>
                <button onClick={()=>{navigate(`/${doc.id}`)}} className="bg-white">go to</button>
              </div>
            ))
        )}
        </div>
      </div>
      {width <= 600 && <MobileNavBar />}
      <Footer></Footer>
    </div>
  );
}

export default Playgrounds;
