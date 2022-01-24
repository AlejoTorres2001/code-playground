import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
const CodeContainer = ({ title, logo, language }) => {
  const code = useSelector((state) => state.code[language]);
  const dispatch = useDispatch();
  const { setCode } = bindActionCreators(actionCreators, dispatch);
  const handleChange = (e) => {
    setCode(e.target.value, language);
  };
  return (
    
    <div className="flex flex-col bg-gray-600 font-mono border-2 border-gray-600 ">
      <textarea className={`focus:outline-none bg-gray-600 font-mono text-white grow ${language}`} value={code} onChange={handleChange}></textarea>
    </div>
  );
};

export default CodeContainer;
