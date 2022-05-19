import React from 'react';

import loading from '../images/loading-gif.gif';

function Loading() {
  return <div className="loading">
      <img src={loading} alt="Loading..."/>
  </div>;
}

export default Loading;
