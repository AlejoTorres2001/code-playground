import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
const CodeContainer = ({title,logo}) => {
    const state = useSelector(state =>state)
    const dispatch = useDispatch()
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
