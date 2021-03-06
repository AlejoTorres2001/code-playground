import useWindowDimensions from "../hooks/useWindowDimensions";

const Footer = ({ layout }) => {
  const { height, width } = useWindowDimensions();
  return (
    <footer
      className={`flex grow ${
        width > 600 && layout !== "1" && "h-[4%]"
      } items-center justify-center flex-col bg-[#2D323C]`}
    >
      {width <= 600 && (
        <div>
          <span className="text-[#F7DF1E] text-lg">C</span>
          <span className="text-[#E34F26] text-lg">O</span>
          <span className="text-[#0C73B8] text-lg">D</span>
          <span className="text-[#F7DF1E] text-lg">I</span>
          <span className="text-[#E34F26] text-lg">F</span>
          <span className="text-[#0C73B8] text-lg">Y</span>
        </div>
      )}
      <span
        className={`${width <= 600 ? "ml-auto" : ""} text-[#C8C8C9] text-sm`}
      >
        <a href="https://github.com/AlejoTorres2001/code-playground">
          Alejo Torres | © 2022
        </a>
      </span>
    </footer>
  );
};

export default Footer;
