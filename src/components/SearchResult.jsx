const SearchResult = ({ data }) => {
  const updatedAt = Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(data?.updatedAt));
  return (
    <div className="my-1 w-[300px]  hover:bg-[#393D46]   text-[1rem] overflow-hidden text-ellipsis">
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
