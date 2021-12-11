import { userService } from 'shares/services';
import { alertActions } from 'containers/Alert/action';
import { userConstants } from 'shares/constants/users';

export function getCurrentUser(failMessage, callback) {
  return dispatch => {
    dispatch(request());

    return userService
      .getCurrentUser()
      .then(user => {
        dispatch(success(user));
        if (typeof callback === 'function') callback(user);
      })
      .catch(err => {
        dispatch(alertActions.error(failMessage));
        dispatch(failure(err.toString()));
      });
  };

  function request() {
    return { type: userConstants.GET_CURRENT_USER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GET_CURRENT_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GET_CURRENT_USER_FAILURE, error };
  }
}

export function updateUser(id, params, failMessage, callback) {
  return dispatch => {
    dispatch(request());

    return userService
      .updateUser(id, params)
      .then(user => {
        dispatch(success(user));
        if (typeof callback === 'function') callback(user);
      })
      .catch(err => {
        dispatch(alertActions.error(failMessage));
        dispatch(failure(err.toString()));
      });
  };

  function request() {
    return { type: userConstants.UPDATE_USER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.UPDATE_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_USER_FAILURE, error };
  }
}
