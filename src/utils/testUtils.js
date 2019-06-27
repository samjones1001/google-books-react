import { testData } from '../fixtures/TestData';

export const enterAndSubmitQuery = (wrapper) => {
  const newValue = "testing component";
  const inputElement = wrapper.find('.search-input');
  inputElement.simulate('change', { target: { value: newValue }});
  wrapper.find('.component-search').simulate('submit');
}

export const retrieveBookField = (bookObject, field) => {
  switch (field) {
    case 'authors':
      return bookObject.volumeInfo.authors;
      break;
    case 'title':
      return bookObject.volumeInfo.title;
      break;
    case 'publisher':
      return bookObject.volumeInfo.publisher;
      break;
    case 'infoLink':
      return bookObject.volumeInfo.infoLink;
      break;
    case 'imageLink':
      return bookObject.volumeInfo.imageLinks.thumbnail;
      break;
    default:
      return;
  }
}
