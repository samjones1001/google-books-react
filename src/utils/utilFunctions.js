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
