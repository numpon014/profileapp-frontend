import { httpRequest } from '../../utils/httpClient';

export const authService = {
  login,
  logout,
};

function login(username, password) {
  const serviceUri = '/login';
  const bodyFormData = new FormData();
  bodyFormData.set('username', username);
  bodyFormData.set('password', password);

  return new Promise((resolve, reject) =>
    httpRequest
      .default()
      .post(serviceUri, bodyFormData, {
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

function logout() {
  localStorage.removeItem('user');
}
