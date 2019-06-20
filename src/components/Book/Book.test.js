import React from 'react';
import { shallow } from 'enzyme';

import Book from './Book';
import { testData } from '../../fixtures/TestData';
import { retrieveBookField } from '../../utils/testUtils.js';

describe('Book component', () => {
  let wrapper;

  describe('when passed all expected props', () => {
    const props = testData.items[0];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = wrapper.find('.component-book')
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders the passed title', () => {
      const title = retrieveBookField(props, 'title');
      const titleElement = wrapper.find('.book-title')
      expect(titleElement.text()).toEqual(title);
    });

    it('renders the passed image', () => {
      const imageLink = retrieveBookField(props, 'imageLink');
      const imageElement = wrapper.find('.book-image')
      expect(imageElement.prop('src')).toEqual(imageLink);
    });

    it('renders the passed author', () => {
      const author = retrieveBookField(props, 'authors')[0];
      const authorElement = wrapper.find('.book-author')
      expect(authorElement.text()).toEqual(author);
    });

    it('renders the passed publisher', () => {
      const publisher = retrieveBookField(props, 'publisher');
      const publisherElement = wrapper.find('.book-publisher')
      expect(publisherElement.text()).toEqual(publisher);
    });

    it('renders a link to the book\'s info page', () => {
      const infoLink = retrieveBookField(props, 'infoLink');
      const infoLinkElement = wrapper.find('.book-info-link')
      expect(infoLinkElement.prop('href')).toEqual(infoLink);
    });
  });

  describe('when passed no image', () => {
    const props = testData.items[1];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = wrapper.find('.component-book')
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders with a placeholder image', () => {
      const imageLink = 'book-placeholder.png';
      const imageElement = wrapper.find('.book-image')
      expect(imageElement.prop('src')).toEqual(imageLink);
    });
  });

  describe('when passed no author', () => {
    const props = testData.items[2];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = wrapper.find('.component-book')
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders a placeholder string', () => {
      const authorElement = wrapper.find('.book-author')
      expect(authorElement.text().length).not.toBe(0)
    })
  });

  describe('when passed multiple authors', () => {
    const props = testData.items[3];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = wrapper.find('.component-book')
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders authors names as a comma separated list', () => {
      const authorString = retrieveBookField(props, 'authors').join(', ')
      const authorElement = wrapper.find('.book-author')
      expect(authorElement.text()).toEqual(authorString)
    });
  });

  describe('when passed no publisher information', () => {
    const props = testData.items[4];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = wrapper.find('.component-book')
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders a placeholder string', () => {
      const publisherElement = wrapper.find('.book-publisher')
      expect(publisherElement.text().length).not.toBe(0);
    });
  });
});
