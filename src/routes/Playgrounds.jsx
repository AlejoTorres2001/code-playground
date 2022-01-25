import Footer from "../components/Footer";
import MobileNavBar from "../components/MobileNavBar";
import NavBar from "../components/NavBar";
import useWindowDimensions from "../hooks/useWindowDimensions";


const Playgrounds = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div className="scrollbar-hide">
      <div className="flex">
      {
        width > 1000  && (
          
          <NavBar/>
          
          
          )
        }
      </div>
      {width <= 600 && <MobileNavBar />}
      <Footer></Footer>
    </div>
  );
};

export default Playgrounds;
