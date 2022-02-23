import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import makeHtml from "../functions/makeHtml";
import { actionCreators } from "../state";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {XIcon} from "@heroicons/react/outline"
import {db} from "../firebase"
import {deleteDoc,doc} from "firebase/firestore"
const Playground = ({ document }) => {
  //router
  const navigate = useNavigate();
  //state-redux
  const dispatch = useDispatch();
  const { setCode } = bindActionCreators(actionCreators, dispatch);  
  const cleanCode=()=>{
    setCode("", "html");
    setCode("", "css");
    setCode("", "javascript");
  }
  const saveFiles = () => {
    var blob = new Blob([makeHtml(document.data())], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${document.data().name}.html`);
  };
  const deletePlayground =()=>{
  const documentRef = doc(db, "playgrounds", document.id);
  deleteDoc(documentRef)
  }
  return (
    <div className="flex items-center flex-col bg-[#1E1E1E] rounded overflow-hidden shadow-lg h-1/4 m-4 mt-6">

      <div className="flex w-full justify-end">
        <div className="bg-red-600 rounded-full m-[0.1rem] hover:bg-red-500 hover:cursor-pointer" onClick={deletePlayground}>
                  <XIcon className="w-[0.8rem] h-[0.8rem] md:w-[1rem] md:h-[1rem]"></XIcon>
        </div>
        </div>
      <img
        src={document.data().image}
        className="md:mt-1 object-cover float-left w-[90%] h-[100px] md:h-[110px]"
      ></img>
      <div className="px-6 py-2 md:py-4">
        <div className="font-bold text-xl text-center text-gray-300">
          {document.data().name}
        </div>
      </div>
      <div className="flex md:mt-2 mr-2 ml-2 justify-center items-center  space-x-4 ">
        <button
          onClick={() => {
            cleanCode()
            navigate(`/${document.id}`);
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center text-xs md:text-sm "
        >
          Open Playground
        </button>
        <button className=" outline outline-1 outline-gray-300 hover:bg-gray-800 text-gray-300 font-bold py-2 px-2 rounded inline-flex items-center text-xs md:text-sm ">
          <svg
            className="fill-current w-2 h-2 md:w-4 md:h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span onClick={saveFiles}>Download</span>
        </button>
      </div>
    </div>
  );
};

export default Playground;