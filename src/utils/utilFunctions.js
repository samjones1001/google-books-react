import axios from 'axios';

export const queryAPI = (url, params, successFunc, errFunc) => {
  axios.get(url, { params })
  .then((response) => {
    return successFunc(response);
  })
  .catch((error) => {
    return errFunc(error);
  })
}

export const retrieveResultsFromResponse = (responseObject) => {
  return responseObject.data.items !== undefined
    ? responseObject.data.items
    : [];
}

export const retrieveErrorFromResponse = (responseObject) => {
  return responseObject.response.data.error.message
}
