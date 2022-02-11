import Display from "../components/Display";

import { useScreenshot } from 'use-react-screenshot'
import { useRef } from "react";
const FullScreen = () => {
  const ref = useRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const iframe = document.getElementsByTagName('iframe');
  const screen = iframe[0]?.contentDocument?.body;
  const getImage = () => takeScreenshot(screen)
  console.log
  return(
    <>
    <button style={{ marginBottom: '10px' }} onClick={getImage}>
          Take screenshot
        </button>
    <Display reference={ref}></Display>;
    <img width={"100px"} src={image} alt={'Screenshot'} />
    </>
  ) 
};
export default FullScreen;
