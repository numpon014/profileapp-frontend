import { httpRequest } from '../../utils/httpClient';

export const userService = {
  getCurrentUser,
};

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const uri = `account`;

    return httpRequest
      .default()
      .get(uri)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
