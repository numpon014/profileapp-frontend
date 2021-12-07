import axios from 'axios';

const errorCode = {
  NETWORK_ERROR: 503,
  // UNAUTHORIZED: 401,
  // NOT_FOUND: 404,
};

export const httpClient = {
  default: () =>
    axios.create({
      baseURL: 'http://localhost:3000/api',
      timeout: 30000,
    }),
};

export const authHeader = () => {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

export const simplifyError = error => {
  if (error.response === undefined) {
    return { status: errorCode.NETWORK_ERROR, statusText: 'network-error' };
  }
  const { status, statusText } = error.response;
  return { status, statusText };
};
