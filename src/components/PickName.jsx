import { addDoc, collection } from "firebase/firestore";
import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import {auth,db} from "../firebase";
const PickName = ({closeModal}) => {
  const state = useSelector((state) => state);
  const [user, loading, error] = useAuthState(auth);
  const input = useRef();
  const isThereCode = () => {
    return (
      state.code.html !== "" ||
      state.code.css !== "" ||
      state.code.javascript !== ""
    );
  };
  const savePlayground = () => {
    const name = input.current.value;
    if (!name) {
      console.log("Pick a name!");
      return;
    }
    if (!isThereCode()) {
      console.log("Add some code!");
      return;
    }

    const playground = {
      owner: user.email,
      name: name,
      code: {
        html: state.code.html,
        css: state.code.css,
        javascript: state.code.javascript,
      },
    };
    addDoc(collection(db, "playgrounds"), playground).then((docRef) => {
      console.log(docRef);
      closeModal();

    });
  };
  return (
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50">
      <div class="bg-white px-16 py-14 rounded-md text-center">
        <h1 class="text-xl mb-4 font-bold text-slate-500">Choose a name</h1>
        <div className="flex flex-col m-2 mb-4">
          <input
            ref={input}
            class="border h-5 border-gray-400 appearance-none rounded px-3 py-3  focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
            type="text"
            autofocus
          />
        </div>
        <button onClick={closeModal} class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white">
          Cancle
        </button>
        <button
          onClick={() => savePlayground()}
          class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PickName;
