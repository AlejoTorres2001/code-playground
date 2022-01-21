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
    <div>
      <h1>{title}</h1>
      <textarea value={code} onChange={handleChange}></textarea>
    </div>
  );
};

export default CodeContainer;
