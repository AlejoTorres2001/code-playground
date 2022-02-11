import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useScreenshot } from "use-react-screenshot";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PickName = ({ closeModal }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [playgroundInfo, setPlaygroundInfo] = useState({});
  const state = useSelector((state) => state);
  const [user, loading, error] = useAuthState(auth);
  const [image, takeScreenshot] = useScreenshot();
  const iframe = document.getElementsByTagName("iframe");
  const screen = iframe[0]?.contentDocument?.body;
  const getImage = () => takeScreenshot(screen);
  console.log(params)
  useEffect(() => {
    getImage();
    if (params?.id) {
      const playground = getDoc(doc(db, "playgrounds", params.id));
      playground.then((doc) => {
        setPlaygroundInfo({
          name: doc?.data()?.name,
          owner: doc?.data()?.owner,
        });
      });
    }
  }, []);
  const isThereCode = () => {
    return (
      state.code.html !== "" ||
      state.code.css !== "" ||
      state.code.javascript !== ""
    );
  };
  const savePlayground = () => {
    if (!playgroundInfo.name || playgroundInfo.name === "" ) {
      toast("Please enter a name for your playground", {
        type:"warning"
      });
      return
      
    }
    if (!isThereCode()) {
      toast("Please enter some code", {
        type:"error"
      })
      return;
    }
    if (playgroundInfo?.owner && playgroundInfo?.owner !== user.email) {
      toast("You are not the owner of this playground", {
        type:"error"
      })
      return;
    }

    if (params?.id) {
      //update doc
      try {
        updateDoc(doc(db, `playgrounds`, params.id), {
          name: playgroundInfo?.name,
          "code.html": state.code.html,
          "code.css": state.code.css,
          "code.javascript": state.code.javascript,
          image: image || "",
        })
      } catch (e) {
        console.log(e);
      }
    } else {
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
        navigate(`/${docRef.id}`);
      });
    }
    closeModal();
  };
  return (
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50">
       <ToastContainer />
      <div class="bg-[#2D323C] px-16 py-14 rounded-md text-center">
        <h1 class="text-xl mb-4 font-bold text-[#C8C8C9]">Choose a name</h1>
        <div className="flex flex-col m-2 mb-4">
          <input
            value={playgroundInfo.name || ""}
            onChange={(e) =>
              setPlaygroundInfo({ ...playgroundInfo, name: e.target.value })
            }
            className="border border-[#C8C8C9]  h-5  appearance-none rounded px-3 py-3  focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600 bg-[#2D323C]"
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
          onClick={savePlayground}
          class="bg-[#F7DF1E] px-7 py-2 ml-2 rounded-md text-md text-[#C8C8C9] font-semibold hover:text-gray-800"
        >
          {params?.id? "Update" : "Save" }
        </button>
      </div>
    </div>
  );
};

export default PickName;
