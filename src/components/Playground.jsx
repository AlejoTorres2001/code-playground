import { useNavigate } from "react-router-dom";

import { useState } from 'react'

const Playground = ({ doc,Icon,color }) => {
  const navigate = useNavigate();
  console.log(color);
  console.log(Icon);
  return (
    <div className="flex items-center flex-col bg-[#1E1E1E] rounded overflow-hidden shadow-lg h-1/4 m-4 mt-6 ">
      <Icon width={"5rem"} height={"5rem"}  className={`text-[${color}]`}></Icon>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-1 text-center text-gray-300">
          {doc.data().name}
        </div>
      </div>
      <div className="flex mr-2 ml-2 md:flex-row justify-center items-center  space-x-4 md:mt-9 mb-3">
        <button  
          onClick={() => {
            navigate(`/${doc.id}`);
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center text-xs md:text-sm "
        >
          Open Playground
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center text-xs md:text-sm ">
          <svg
            className="fill-current w-2 h-2 md:w-4 md:h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default Playground;

{
  /* <div classNameName="m-3" key={doc.id}>
      <h1>{doc.data().name}</h1>
      
    </div> */
}
