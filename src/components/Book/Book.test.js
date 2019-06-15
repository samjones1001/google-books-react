import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Book from './Book';
import { testData } from '../../assets/TestData';

Enzyme.configure({ adapter : new EnzymeAdapter() })

describe('Book component', () => {
  let wrapper;

  describe('when passed all props', () => {
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
      let titleElement = wrapper.find("[data-test='book-title']");
      expect(titleElement.text()).toEqual(title);
    });

    it('renders the passed image', () => {
      const imageLink = props.imageLink;
      let imageElement = wrapper.find("[data-test='book-image']");
      expect(imageElement.prop('src')).toEqual(imageLink);
    });

    it('renders the passed author', () => {
      const author = props.authors[0];
      let authorElement = wrapper.find("[data-test='book-author']");
      expect(authorElement.text()).toEqual(author);
    });

    it('renders the passed publisher', () => {
      const publisher = props.publisher;
      let publisherElement = wrapper.find("[data-test='book-publisher']");
      expect(publisherElement.text()).toEqual(publisher);
    });

    it('renders a link to the book\'s info page', () => {
      const infoLink = testData.items[0].infoLink;
      let infoLinkElement = wrapper.find("[data-test='book-info-link']");
      expect(infoLinkElement.prop('href')).toEqual(infoLink);
    });
  });
});
