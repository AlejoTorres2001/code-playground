import CodeContainer from "./components/CodeContainer";
import Display from "./components/Display";
import Split from "react-split-grid";
import "./index.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
    <div className="flex">
      <NavBar/>
    <Split
      minSize={100}
      render={({ getGridProps, getGutterProps }) => (
        <div className="grid-container overflow-hidden  h-screen w-screen ml-[5rem] bottom-0 " {...getGridProps()}>
          
          <CodeContainer language="html"></CodeContainer>
          <CodeContainer language="css"></CodeContainer>
          <CodeContainer language="javascript"></CodeContainer>
          <Display></Display>
          <div />
          <div
            className="gutter-col gutter-col-1 bg-gray-400"
            {...getGutterProps("column", 1)}
          />
          <div />
          <div
            className="gutter-row gutter-row-1 bg-gray-400"
            {...getGutterProps("row", 1)}
          />
          <div />
        </div>
      )}
    />
  </div>
  <footer className="flex grow items-center justify-center bg-red-300 mt-0">Alejo Torres</footer>
  </div>
  );
}

export default App;

// <div className="grid grid-cols-2 h-screen w-screen">
//     <CodeContainer  title="HTML" language="html"></CodeContainer>
//     <CodeContainer title="CSS" language="css"></CodeContainer>
//     <CodeContainer title="JS" language="js"></CodeContainer>
//     <Display></Display>

// </div>
