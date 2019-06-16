import React from 'react';
import { shallow } from 'enzyme';

import Book from './Book';
import { testData } from '../../assets/TestData';
import { findByTestAttr } from '../../utils/testUtils';

describe('Book component', () => {
  let wrapper;

  describe('when passed all expected props', () => {
    const props = testData.items[0];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = findByTestAttr(wrapper, 'component-book')
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders the passed title', () => {
      const title = props.title;
      const titleElement = findByTestAttr(wrapper, 'book-title')
      expect(titleElement.text()).toEqual(title);
    });

    it('renders the passed image', () => {
      const imageLink = props.imagelink;
      const imageElement = findByTestAttr(wrapper, 'book-image')
      expect(imageElement.prop("src")).toEqual(imageLink);
    });

    it('renders the passed author', () => {
      const author = props.authors[0];
      const authorElement = findByTestAttr(wrapper, 'book-author')
      expect(authorElement.text()).toEqual(author);
    });

    it('renders the passed publisher', () => {
      const publisher = props.publisher;
      const publisherElement = findByTestAttr(wrapper, 'book-publisher')
      expect(publisherElement.text()).toEqual(publisher);
    });

    it('renders a link to the book\'s info page', () => {
      const infoLink = testData.items[0].infolink;
      const infoLinkElement = findByTestAttr(wrapper, 'book-info-link')
      expect(infoLinkElement.prop('href')).toEqual(infoLink);
    });
  });

  describe('when passed no image', () => {
    const props = testData.items[1];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = findByTestAttr(wrapper, 'component-book')
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders with a placeholder image', () => {
      const imageLink = "book-placeholder.png";
      const imageElement = findByTestAttr(wrapper, 'book-image')
      expect(imageElement.prop("src")).toEqual(imageLink);
    });
  });

  describe('when passed no author', () => {
    const props = testData.items[2];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = findByTestAttr(wrapper, 'component-book')
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders a placeholder string', () => {
      const authorElement = findByTestAttr(wrapper, 'book-author')
      expect(authorElement.text().length).not.toBe(0)
    })
  });

  describe('when passed multiple authors', () => {
    const props = testData.items[3];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = findByTestAttr(wrapper, 'component-book')
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders authors names as a comma separated list', () => {
      const authorString = props.authors.join(', ')
      const authorElement = findByTestAttr(wrapper, 'book-author')
      expect(authorElement.text()).toEqual(authorString)
    });
  });

  describe('when passed no publisher information', () => {
    const props = testData.items[4];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = findByTestAttr(wrapper, 'component-book')
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders a placeholder string', () => {
      const publisherElement = findByTestAttr(wrapper, 'book-publisher')
      expect(publisherElement.text().length).not.toBe(0);
    });
  });
});
