export const findByTestAttr = (wrapper, value) =>
  wrapper.find(`[data-test='${value}']`);

export const enterAndSubmitQuery = (wrapper) => {
  const newValue = "testing component";
  const inputElement = findByTestAttr(wrapper, 'search-input');
  inputElement.simulate('change', { target: { value: newValue }});
  findByTestAttr(wrapper, 'component-search').simulate('submit');
}
