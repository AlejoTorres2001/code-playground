import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import Editor from "@monaco-editor/react";

const CodeContainer = ({ language }) => {
  const code = useSelector((state) => state.code[language]);
  const dispatch = useDispatch();
  const { setCode } = bindActionCreators(actionCreators, dispatch);
  const handleChange = (value) => {
    setCode(value, language);
  };
  return (
    <div className={"flex flex-col focus:outline-none bg-gray-600"}>
      <Editor
        theme="vs-dark"
        options={{ fontSize: "18px", automaticLayout: true, wordWrap: "on" }}
        defaultLanguage={language}
        value={code}
        onChange={handleChange}
        className={`${language}`}
      ></Editor>
    </div>
  );
};

export default CodeContainer;
