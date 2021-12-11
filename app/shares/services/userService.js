import { httpRequest } from '../../utils/httpClient';

export const userService = {
  getCurrentUser,
  updateUser,
  getUserExperience,
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

function updateUser(id, params) {
  const uri = `users/${id}`;
  return new Promise((resolve, reject) =>
    httpRequest
      .default()
      .patch(uri, params)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      }),
  );
}

function getUserExperience(id) {
  const uri = `user/${id}/experiences`;
  return new Promise((resolve, reject) =>
    httpRequest
      .default()
      .get(uri)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      }),
  );
}
