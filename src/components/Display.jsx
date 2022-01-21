import React from 'react';

const Display = ({html,css,js}) => {
  return <div>
    <h1>Result</h1>
      <iframe srcDoc={`${html}`}></iframe>
  </div>;
};

export default Display;
