import { useState } from "react";
import { useSelector } from "react-redux";
const CodeContainer = ({title,logo,language}) => {
    const state = useSelector(state => state.code[language]);
    const [code, setCode] = useState("");
    const handleChange = (e) => {
        setCode(e.target.value);
    }
  return <div>
    <h1>{title}</h1>
    <textarea value={code}  onChange={handleChange} ></textarea>
  </div>;
};

export default CodeContainer;
