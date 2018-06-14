import React from 'react';
import './Loader.scss';

import loaderGif from '../../../assets/images/loader.gif';

const Loader = () => (
  <div className="loader">
    <div className="loader__img">
      <img src={loaderGif} alt="Loader" />
    </div>
  </div>
);

export default Loader;
