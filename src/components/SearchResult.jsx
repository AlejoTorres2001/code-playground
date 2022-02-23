import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

const SearchResult = ({ data }) => {
  const CDN_URL = "https://cdn.skypack.dev";

    const dispatch = useDispatch();
  const { setCode } = bindActionCreators(actionCreators, dispatch); 
  const code = useSelector((state) => state.code["javascript"]);
  const updatedAt = Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(data?.updatedAt));

  const importModule = (packageName)=>{
    let parsedName = packageName.split('/').join('-')
    if (parsedName.startsWith('@')) parsedName = parsedName.substr(1)
    const importLine = `import ${parsedName} from '${CDN_URL}/${packageName}'; \n`
      setCode(importLine.concat(code), "javascript")


  }
  return (
    <div className="my-1 w-[300px]  hover:bg-[#393D46]   text-[1rem] overflow-hidden text-ellipsis" onClick={()=>importModule(data?.name)}>
      <header className="text-white flex ">
        <strong>{data?.name}</strong>
        {data?.hasTypes && (

        <div className="ts-bagde ml-2 mt-1"></div>
        )}
        {data?.popularityScore > 0.8 && (
            <div className="popular-badge">popular</div>
        )}
      </header>
      <p className="text-white  ">{data?.description}</p>
      <p className="text-[#ABADB1]">Updated: {updatedAt}</p>
    </div>
  );
};

export default SearchResult;
