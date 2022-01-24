import CodeContainer from "./components/CodeContainer";
import Display from "./components/Display";
import Split from "react-split-grid";
import "./index.css";
import NavBar from "./components/NavBar";
import useWindowDimensions from "./hooks/useWindowDimensions";

function App() {
  const { height, width } = useWindowDimensions();
  return (
    <div className="scrollbar-hide">
    <div className="flex">
      {
        width > 1000  && (

          <NavBar/>
        )
      }
    <Split
      minSize={100}
      render={({ getGridProps, getGutterProps }) => (
        <div className={`grid-container overflow-hidden  h-screen w-screen ${width> 1200? 'ml-[4rem]':''}  bottom-0 `} {...getGridProps()}>
          
          <CodeContainer language="html"></CodeContainer>
          <CodeContainer language="css"></CodeContainer>
          <CodeContainer language="javascript"></CodeContainer>
          <Display></Display>
          <div />
          <div
            className="gutter-col gutter-col-1 bg-[#2D323C]"
            {...getGutterProps("column", 1)}
          />
          <div />
          <div
            className="gutter-row gutter-row-1 bg-[#2D323C]"
            {...getGutterProps("row", 1)}
          />
          <div />
        </div>
      )}
    />
  </div>
  {width<=600&&(
    <h1>
      menu
    </h1>
  )}
  <footer className="flex grow items-center justify-center bg-[#2D323C] mt-0">Alejo Torres</footer>
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
