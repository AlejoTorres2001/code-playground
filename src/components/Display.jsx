import { useSelector } from "react-redux";
import makeHtml from "../functions/makeHtml";
import { useLocation } from "react-router-dom";
const Display = () => {
  const state = useSelector((state) => state);
  const location = useLocation();
  return (
    <div className="flex">
      <iframe title="code"
        className={`outline-none  ${
          location.pathname.includes("fullscreen") && "w-screen h-screen"
        } grow  `}
        srcDoc={makeHtml(state)}
      ></iframe>
    </div>
  );
};

export default Display;
