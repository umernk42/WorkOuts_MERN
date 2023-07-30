// components/Loading.js

import React from 'react';

const Loading = ({loadingText}) => {
  return (
    <div className="loading">
      <h2>{loadingText}</h2>
    </div>
  );
};

export default Loading;
