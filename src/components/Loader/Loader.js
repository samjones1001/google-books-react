import React from 'react';
import { BeatLoader } from 'react-spinners';
import './Loader.css';

const Loader = () =>
  <div className="component-loader">
    <BeatLoader className="loader" loading={ true } />
  </div>

export default Loader;
