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
    
    <div className="flex flex-col bg-slate-600 border-2 border-gray-800">
      <h1>{title}</h1>
      <textarea className="focus:outline-none bg-slate-600 text-white grow" value={code} onChange={handleChange}></textarea>
    </div>
  );
};

export default CodeContainer;
