import { userService } from 'shares/services';
import { alertActions } from 'containers/Alert/action';
import { userConstants } from 'shares/constants/users';
import { setItem as setStorageItem } from '../../utils/localStorage';
import { experienceConstants } from '../constants/experiences';

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

export function register(username, password, passwordConfirmation, callback) {
  return dispatch => {
    dispatch(request({ username }));

    return userService
      .createUser(username, password, passwordConfirmation)
      .then(user => {
        setStorageItem('user', JSON.stringify(user));
        dispatch(success(user));
        if (typeof callback === 'function') callback(user);
      })
      .catch(err => {
        dispatch(alertActions.error(err.toString()));
        dispatch(failure(err.toString()));
        if (typeof callback === 'function') callback({ error: err });
      });

    function request(user) {
      return { type: userConstants.CREATE_USER_REQUEST, user };
    }
    function success(user) {
      return { type: userConstants.CREATE_USER_SUCCESS, user };
    }
    function failure(error) {
      return { type: userConstants.CREATE_USER_FAILURE, error };
    }
  };
}

export function updateUserAvatar(id, rawImage, callback) {
  return dispatch => {
    dispatch(request());

    return userService
      .updateUserAvatar(id, rawImage)
      .then(user => {
        dispatch(success(user));
        if (typeof callback === 'function') callback(user);
      })
      .catch(err => {
        dispatch(alertActions.error(err.toString()));
        dispatch(failure(err.toString()));
      });
  };

  function request() {
    return { type: userConstants.UPDATE_USER_REQUEST };
  }
  function success(user) {
    return { type: experienceConstants.UPDATE_EXPERIENCE_SUCCESS, user };
  }
  function failure(error) {
    return { type: experienceConstants.UPDATE_EXPERIENCE_FAILURE, error };
  }
}
