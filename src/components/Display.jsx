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
    ${state.code.js}
    </script>
    ${state.code.html}
    </body>
    </html>
    `
  }
  return <div>
    <h1>Result</h1>
      <iframe srcDoc={makeHtml()}></iframe>
  </div>;
};

export default Display;
