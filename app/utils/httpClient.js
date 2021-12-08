import axios from 'axios';

const errorCode = {
  NETWORK_ERROR: 503,
  // UNAUTHORIZED: 401,
  // NOT_FOUND: 404,
};

export const httpRequest = {
  default: () =>
    axios.create({
      baseURL: isLocal() ? 'http://localhost:3000/api' : '/api',
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

export const isLocal = () => {
  const isLocalhost = window.location.host.match(/localhost/g);
  const isSelfIP = window.location.host.match(/127\.0\.0\.1/g);
  const isLocalIP = window.location.host.match(/[0-9]{1,}(\.[0-9]{1,}){3,}/g);
  return !!(isLocalhost || isSelfIP || isLocalIP);
};

export const simplifyError = error => {
  if (error.response === undefined) {
    return { status: errorCode.NETWORK_ERROR, statusText: 'network-error' };
  }
  const { status, statusText } = error.response;
  return { status, statusText };
};
