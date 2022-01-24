import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import Editor from "@monaco-editor/react";

const CodeContainer = ({ title, logo, language }) => {
  const code = useSelector((state) => state.code[language]);
  const dispatch = useDispatch();
  const { setCode } = bindActionCreators(actionCreators, dispatch);
  const handleChange = (value, event) => {setCode(value, language);};
  return (
    <div className={`flex flex-col focus:outline-none bg-gray-600`}>
      <Editor
        theme="vs-dark"
        options={{fontSize: "18px"}}
        defaultLanguage={language}
        value={code}
        onChange={handleChange}
        className={`${language}`}
      ></Editor>
     
    </div>
  );
};

export default CodeContainer;
 {/* <textarea className={`focus:outline-none bg-gray-600 font-mono text-white grow ${language}`} value={code} onChange={handleChange}></textarea> */}