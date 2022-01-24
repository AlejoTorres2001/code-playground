import React from 'react';
import { useSelector } from 'react-redux';
const Display = () => {
  const state = useSelector((state) => state);
  const makeHtml = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <style>
    ${state.code.css}
    </style>
    <head/>
    <body>
    <script>
    ${state.code.javascript}
    </script>
    ${state.code.html}
    </body>
    </html>
    `
  }
  return <div className="flex">
      <iframe  className="outline-none  grow" srcDoc={makeHtml()}></iframe>
  </div>;
};

export default Display;
