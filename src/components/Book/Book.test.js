import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Book from './Book';
import { testData } from '../../assets/TestData';

Enzyme.configure({ adapter : new EnzymeAdapter() })

describe('Book component', () => {
  let wrapper;

  describe('when passed all expected props', () => {
    const props = testData.items[0];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = wrapper.find("[data-test='component-book']");
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders the passed title', () => {
      const title = props.title;
      const titleElement = wrapper.find("[data-test='book-title']");
      expect(titleElement.text()).toEqual(title);
    });

    it('renders the passed image', () => {
      const imageLink = props.imageLink;
      const imageElement = wrapper.find("[data-test='book-image']");
      expect(imageElement.prop("src")).toEqual(imageLink);
    });

    it('renders the passed author', () => {
      const author = props.authors[0];
      const authorElement = wrapper.find("[data-test='book-author']");
      expect(authorElement.text()).toEqual(author);
    });

    it('renders the passed publisher', () => {
      const publisher = props.publisher;
      const publisherElement = wrapper.find("[data-test='book-publisher']");
      expect(publisherElement.text()).toEqual(publisher);
    });

    it('renders a link to the book\'s info page', () => {
      const infoLink = testData.items[0].infoLink;
      const infoLinkElement = wrapper.find("[data-test='book-info-link']");
      expect(infoLinkElement.prop('href')).toEqual(infoLink);
    });
  });

  describe('when passed no image', () => {
    const props = testData.items[1];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = wrapper.find("[data-test='component-book']");
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders with a placeholder image', () => {
      const imageLink = "../../assets/book-placeholder.png";
      const imageElement = wrapper.find("[data-test='book-image']");
      expect(imageElement.prop("src")).toEqual(imageLink);
    });
  });

  describe('when passed no author', () => {
    const props = testData.items[2];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = wrapper.find("[data-test='component-book']");
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders an error string', () => {
      const authorElement = wrapper.find("[data-test='book-author']");
      expect(authorElement.text().length).not.toBe(0)
    })
  });

  describe('when passed multiple authors', () => {
    const props = testData.items[3];

    beforeEach(() => {
      wrapper = shallow(<Book { ...props }/>);
    });

    it('renders without crashing', () => {
      const bookComponent = wrapper.find("[data-test='component-book']");
      expect(bookComponent.exists()).toBe(true);
    });

    it('renders authors names as a comma separated list', () => {
      const authorString = props.authors.join(', ')
      const authorElement = wrapper.find("[data-test='book-author']");
      expect(authorElement.text()).toEqual(authorString)
    });
  });
});
