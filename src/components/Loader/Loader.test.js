import React from 'react';
import { shallow } from 'enzyme';
import { BeatLoader } from 'react-spinners'

import Loader from './Loader';

describe('Loader component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loader />);
  });

  it('renders without crashing', () => {
    const loaderComponent = wrapper.find('.component-loader');
    expect(loaderComponent.exists()).toBe(true);
  });

  it('renders a BeatLoader component', () => {
    const beatLoaderComponent = wrapper.find(BeatLoader);
    expect(beatLoaderComponent.exists()).toBe(true);
  });

  it('passes true into the BeatLoader component as a prop', () => {
    const beatLoaderComponent = wrapper.find(BeatLoader);
    expect(beatLoaderComponent.prop('loading')).toBe(true);
  });
});
