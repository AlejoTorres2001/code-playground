import { useState } from "react";

const CodeContainer = ({title,logo}) => {
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
