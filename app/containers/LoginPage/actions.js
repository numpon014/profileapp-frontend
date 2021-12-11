import { authService } from 'shares/services';
import { setItem as setStorageItem } from 'utils/localStorage';
import history from 'utils/history';
import { alertActions } from 'containers/Alert/action';
import { authConstants } from './constants';

export function submitLoginForm(username, password, failMessage) {
  return dispatch => {
    dispatch(request({ username }));

    return authService
      .login(username, password)
      .then(user => {
        setStorageItem('user', JSON.stringify(user));
        dispatch(success(user));
        history.push('/profile');
      })
      .catch(err => {
        dispatch(alertActions.error(failMessage));
        dispatch(failure(err.toString()));
      });

    function request(user) {
      return { type: authConstants.LOGIN_REQUEST, user };
    }
    function success(user) {
      return { type: authConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
      return { type: authConstants.LOGIN_FAILURE, error };
    }
  };
}
