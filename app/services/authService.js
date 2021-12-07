import { httpClient } from '../utils/httpClient';

export const authService = {
  login,
};

function login(username, password) {
  const serviceUri = '/login';
  const bodyFormData = new FormData();
  bodyFormData.set('username', username);
  bodyFormData.set('password', password);
  return httpClient
    .default()
    .post(serviceUri, bodyFormData, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(response => response)
    .catch(error => error);
}
