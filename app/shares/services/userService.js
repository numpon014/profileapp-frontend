import { httpRequest } from '../../utils/httpClient';

export const userService = {
  getCurrentUser,
  createUser,
  updateUser,
  updateUserAvatar,
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

function createUser(username, password, passwordConfirmation) {
  const uri = `users`;
  const bodyFormData = new FormData();
  bodyFormData.set('username', username);
  bodyFormData.set('password', password);
  bodyFormData.set('password_confirmation', passwordConfirmation);

  return new Promise((resolve, reject) =>
    httpRequest
      .default()
      .post(uri, bodyFormData, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      }),
  );
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

function updateUserAvatar(id, rawImage) {
  const uri = `users/${id}`;
  const formData = new FormData();
  formData.set('avatar', rawImage);

  return new Promise((resolve, reject) =>
    httpRequest
      .default()
      .patch(uri, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
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
