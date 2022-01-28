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
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state";
import { db } from "./firebase";


function App() {
  const { height, width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const { setCode } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    if(params?.id){
      const playground = getDoc(doc(db,"playgrounds",params.id));
      playground.then(doc=>{
        setCode(doc?.data()?.code?.html, "html");
        setCode(doc?.data()?.code?.css, "css");
        setCode(doc?.data()?.code?.javascript, "javascript");
      })
    }
  }, []);
  return (
    <div className="scrollbar-hide">
      {isOpen && <PickName closeModal={()=>setIsOpen(false)} />}
      <div className="flex">
        {width > 1000 && <NavBar openModal={()=>setIsOpen(true)}/>}
        
        <Split
          minSize={100}
          render={({ getGridProps, getGutterProps }) => (
            <div
              className={`grid-container overflow-hidden  h-screen w-screen ${
                width > 1200 ? "ml-[4rem]" : ""
              }  bottom-0 `}
              {...getGridProps()}
            >
              <CodeContainer  language="html"></CodeContainer>
              <CodeContainer language="css"></CodeContainer>
              <CodeContainer  language="javascript"></CodeContainer>
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
