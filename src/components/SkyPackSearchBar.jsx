import debounce from "lodash.debounce";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useEffect } from "react";
import { fetchSearchResults } from "../functions/fetchSearchResults";
import SearchResult from "./SearchResult";

const fetchData = async (query, cb) => {
  const res = await fetchSearchResults(query);
  cb(res);
};
const debouncedFetchData = debounce((query, cb) => {
  fetchData(query, cb);
}, 500);
const SkyPackSearchBar = ({ closeSearchBar }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    debouncedFetchData(query, (res) => {
      setResults(res?.results);
      setIsLoading(false);
    });
  }, [query]);

  return (
    <div className="md:ml-9 bg-[#2D323C] flex flex-col  p-1 w-screen   ">
      <div className="flex w-full justify-end">
        <div
          className=" rounded-full m-[0.1rem] hover:bg-red-500 hover:cursor-pointer"
          onClick={closeSearchBar}
        >
          <XIcon className="text-black w-[0.8rem] h-[0.8rem] md:w-[1rem] md:h-[1rem]"></XIcon>
        </div>
      </div>
      <div className="ml-9">
        <h1 className="text-white  ">
          <span className="font-bold text-[#ABADB1]">JavaScript:</span> Add
          dependency
        </h1>
        <p className="text-sm text-[#C8C8C9] ">
          An import statement will be added to the top of the JavaScript editor
          for the package.
        </p>
      </div>

      <div className="flex  w-[80%] bg-[#2F363D] ml-9 mt-2 border border-black rounded-sm">
        <SearchIcon
          width={"2rem"}
          height={"1.5rem"}
          className="mt-1 text-[#52565A]"
        ></SearchIcon>
        <input
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value !== "") setIsLoading(true);
          }}
          value={query}
          className=" text-left   w-full h-8 bg-[#2F363D] text-[#C8C8C9] placeholder:text-[#52565A] outline-none"
          type="text"
          placeholder="Search and add a package"
        />
      </div>
      {isLoading && (
        <div className="ml-9 my-2 text-white text-sm">
          <strong>searching...</strong>{" "}
        </div>
      )}
      {!isLoading && (
        <div className="mt-2 ml-9 overflow-y-auto scrollbar ">
          {results?.map((result, i) => (
            <SearchResult key={i} data={result} closeSearchBar={closeSearchBar} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkyPackSearchBar;
