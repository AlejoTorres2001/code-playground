import CodeContainer from "./components/CodeContainer";
import Display from "./components/Display";
import Split from "react-split-grid";
import "./index.css";
import NavBar from "./components/NavBar";
import useWindowDimensions from "./hooks/useWindowDimensions";
import MobileNavBar from "./components/MobileNavBar";
import Footer from "./components/Footer";
import PickName from "./components/PickName";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state";
import { db } from "./firebase";
import SkyPackSearchBar from "./components/SkyPackSearchBar";
function App() {
  //state search-bar
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  //settings state
  const [layout, setLayout] = useState("1");
  //dimensions hook
  const { height, width } = useWindowDimensions();
  //state modal
  const [isOpen, setIsOpen] = useState(false);
  //router
  const params = useParams();
  //state-redux
  const code = useSelector((state) => state.code);
  const dispatch = useDispatch();
  const { setCode } = bindActionCreators(actionCreators, dispatch);
  const test = true;
  const isCodeStateEmpty = () => {
    return code.html === "" && code.css === "" && code.javascript === "";
  };
  useEffect(() => {
    if (params?.id && isCodeStateEmpty()) {
      //load the code from the database
      const playground = getDoc(doc(db, "playgrounds", params.id));
      playground.then((doc) => {
        setCode(doc?.data()?.code?.html, "html");
        setCode(doc?.data()?.code?.css, "css");
        setCode(doc?.data()?.code?.javascript, "javascript");
      });
    }
  }, []);
  return (
    <div className="scrollbar-hide h-screen ">
      {isOpen && <PickName closeModal={() => setIsOpen(false)} />}

      <div className="flex h-screen">
        {width > 1000 && (
          <NavBar
            setLayout={setLayout}
            layout={layout}
            openModal={() => setIsOpen(true)}
            openSearchBar={() => setIsOpenSearchBar(true)}
            
          />
        )}
        {isOpenSearchBar && (
          <SkyPackSearchBar closeSearchBar={() => setIsOpenSearchBar(false)}/>
        )}
        {
          //LAYOUT 1
          layout === "1" ? (
            <Split
              minSize={100}
              render={({ getGridProps, getGutterProps }) => (
                <div
                  className={`grid-container overflow-hidden  h-screen w-screen ${
                    width > 1200 && !isOpenSearchBar ? "ml-[4rem]" : ""
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
          ) : // LAYOUT2
          layout === "2" ? (
            <div
              className={`grid grid-cols-4 w-screen  ${
                width > 1200 &&  !isOpenSearchBar ? "ml-[4rem]" : ""
              }  bottom-0 `}
            >
              <CodeContainer language="html"></CodeContainer>
              <CodeContainer language="css"></CodeContainer>
              <CodeContainer language="javascript"></CodeContainer>
              <Display></Display>
            </div>
          ) : // LAYOUT3
          layout === "3" ? (
            <div
              className={`grid grid-cols-1 grid-rows-4 w-screen  ${
                width > 1200 && !isOpenSearchBar ? "ml-[4rem]" : ""
              }  bottom-0 `}
            >
              <CodeContainer language="html"></CodeContainer>
              <CodeContainer language="css"></CodeContainer>
              <CodeContainer language="javascript"></CodeContainer>
              <Display></Display>
            </div>
          ) : (
            //more possible layouts
            ""
          )
        }
      </div>
      {width <= 600 && (
        <MobileNavBar
          setLayout={setLayout}
          layout={layout}
          openModal={() => setIsOpen(true)}
        />
      )}
      <Footer layout={layout}></Footer>
    </div>
  );
}

export default App;
