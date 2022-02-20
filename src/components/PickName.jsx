import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useScreenshot } from "use-react-screenshot";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validatePlayground } from "../functions/validatePlayground";
const PickName = ({ closeModal }) => {
  //router
  const navigate = useNavigate();
  const params = useParams();
  //state-redux
  const [playgroundInfo, setPlaygroundInfo] = useState({});
  const state = useSelector((state) => state);
  //session
  const [user, loading, error] = useAuthState(auth);
  //screen capture
  const [image, takeScreenshot] = useScreenshot();
  const iframe = document.getElementsByTagName("iframe");
  const screen = iframe[0]?.contentDocument?.body;
  const getImage = () => takeScreenshot(screen);

  useEffect(() => {
    getImage();
    if (params?.id) {
      const playground = getDoc(doc(db, "playgrounds", params.id));
      playground
        .then((doc) => {
          setPlaygroundInfo({
            name: doc?.data()?.name,
            owner: doc?.data()?.owner,
          });
        })
        .catch((err) => {
          toast.error("Error: invalid playground");
        });
    }
  }, []);

  const updatePlayground = () => {
    //updates existing playground
    const errors = validatePlayground(
      state.code,
      playgroundInfo?.name,
      playgroundInfo?.owner,
      user
    );
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }
    updateDoc(doc(db, `playgrounds`, params.id), {
      name: playgroundInfo?.name,
      "code.html": state.code.html,
      "code.css": state.code.css,
      "code.javascript": state.code.javascript,
      image: image || "",
    })
      .catch((err) => {
        toast.error("Error: the playground doesn't exist");
      })
      .finally(() => {
        //wait 3 seconds
        setTimeout(() => {
          closeModal();
        }, 3000);
      });
  };
  const savePlayground = () => {
    const errors = validatePlayground(
      state.code,
      playgroundInfo?.name,
      playgroundInfo?.owner,
      user
    );
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }
    //create a new doc
    const playground = {
      owner: user.email,
      name: playgroundInfo?.name,
      code: {
        html: state.code.html,
        css: state.code.css,
        javascript: state.code.javascript,
      },
      image: image || "",
    };
    addDoc(collection(db, "playgrounds"), playground).then((docRef) => {
      closeModal();
      navigate(`/${docRef.id}`);
    });
  };

  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50">
      <ToastContainer />
      <div className="bg-[#2D323C] px-16 py-14 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-[#C8C8C9]">Choose a name</h1>
        <div className="flex flex-col m-2 mb-4">
          <input
            value={playgroundInfo.name || ""}
            onChange={(e) =>
              setPlaygroundInfo({ ...playgroundInfo, name: e.target.value })
            }
            className="border border-[#C8C8C9] text-[#C8C8C9] h-5  appearance-none rounded px-3 py-3  focus:outline-none active:outline-none bg-[#2D323C]"
            type="text"
            autoFocus
          />
        </div>
        <button
          onClick={closeModal}
          className="border border-[#C8C8C9] bg-[#2D323C] px-4 py-2 rounded-md text-md text-[#C8C8C9] hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={params?.id ? updatePlayground : savePlayground}
          className="bg-green-700 px-7 py-2 ml-2 rounded-md text-md text-gray-800  font-semibold hover:text-[#C8C8C9] hover:bg-green-600"
        >
          {params?.id ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default PickName;
