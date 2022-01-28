import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <footer
      className={`${
        location.pathname === "/playgrounds" ? "inset-x-0 bottom-0" : ""
      } flex grow items-center justify-center  bottom-0  bg-[#2D323C]  `}
    >
      Alejo Torres
    </footer>
  );
};

export default Footer;
