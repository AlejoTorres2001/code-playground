import CodeContainer from "./components/CodeContainer";
import Display from "./components/Display";
import Split from "react-split-grid";
import "./index.css";
import NavBar from "./components/NavBar";
import useWindowDimensions from "./hooks/useWindowDimensions";
import MobileNavBar from "./components/MobileNavBar";
import Footer from "./components/Footer";

function App() {
  const { height, width } = useWindowDimensions();
  return (
    <div className="scrollbar-hide">
      <div className="flex">
        {width > 1000 && <NavBar />}

        <Split
          minSize={100}
          render={({ getGridProps, getGutterProps }) => (
            <div
              className={`grid-container overflow-hidden  h-screen w-screen ${
                width > 1200 ? "ml-[4rem]" : ""
              }  bottom-0 `}
              {...getGridProps()}
            >
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
      {width <= 600 && <MobileNavBar />}
      <Footer></Footer>
    </div>
  );
}

export default App;
