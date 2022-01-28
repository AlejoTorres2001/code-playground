import { useNavigate } from "react-router-dom";

const Playground = ({doc}) => {
  const navigate = useNavigate();

  return (
    <div className="m-3" key={doc.id}>
      <h1>{doc.data().name}</h1>
      <button
        onClick={() => {
            navigate(`/${doc.id}`);
        }}
        className="bg-white"
      >
        go to
      </button>
    </div>
  );
};

export default Playground;
