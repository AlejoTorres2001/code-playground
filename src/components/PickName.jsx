import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
const PickName = ({ closeModal }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [playgroundInfo, setPlaygroundInfo] = useState({});
  const state = useSelector((state) => state);
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
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
    if (!playgroundInfo.name || playgroundInfo.name === "") {
      console.log("Pick a name!");
      return;
    }
    if (!isThereCode()) {
      console.log("Add some code!");
      return;
    }
    if (playgroundInfo?.owner && playgroundInfo?.owner !== user.email) {
      console.log("You can't save playgrounds you don't own!");
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
        });
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
      };
      addDoc(collection(db, "playgrounds"), playground).then((docRef) => {
        navigate(`/${docRef.id}`);
      });
    }
    closeModal();
  };
  return (
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50">
      <div class="bg-white px-16 py-14 rounded-md text-center">
        <h1 class="text-xl mb-4 font-bold text-slate-500">Choose a name</h1>
        <div className="flex flex-col m-2 mb-4">
          <input
            value={playgroundInfo.name}
            onChange={(e) =>
              setPlaygroundInfo({ ...playgroundInfo, name: e.target.value })
            }
            className="border h-5 border-gray-400 appearance-none rounded px-3 py-3  focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
            type="text"
            autoFocus
          />
        </div>
        <button
          onClick={closeModal}
          className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
        >
          Cancel
        </button>
        <button
          onClick={savePlayground}
          class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PickName;
