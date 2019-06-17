import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader = () =>
  <div className="component-loader">
    <BeatLoader loading={ true } />
  </div>

export default Loader;
