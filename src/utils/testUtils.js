export const enterAndSubmitQuery = (wrapper) => {
  const newValue = "testing component";
  const inputElement = wrapper.find('.search-input');
  inputElement.simulate('change', { target: { value: newValue }});
  wrapper.find('.component-search').simulate('submit');
}
