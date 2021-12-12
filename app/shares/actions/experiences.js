import { userService, experienceService } from 'shares/services';
import { alertActions } from 'containers/Alert/action';
import { experienceConstants } from 'shares/constants/experiences';
import { getCurrentUserId } from '../../utils/httpClient';

export function getCurrentUserExperience(failMessage, callback) {
  const userId = getCurrentUserId();

  return dispatch => {
    dispatch(request());

    return userService
      .getUserExperience(userId)
      .then(experiences => {
        dispatch(success(experiences));
        if (typeof callback === 'function') callback(experiences);
      })
      .catch(err => {
        dispatch(alertActions.error(failMessage));
        dispatch(failure(err.toString()));
      });
  };

  function request() {
    return { type: experienceConstants.GET_EXPERIENCE_REQUEST };
  }
  function success(experiences) {
    return { type: experienceConstants.GET_EXPERIENCE_SUCCESS, experiences };
  }
  function failure(error) {
    return { type: experienceConstants.GET_EXPERIENCE_FAILURE, error };
  }
}

export function updateExperience(id, params, failMessage, callback) {
  return dispatch => {
    dispatch(request());

    return experienceService
      .updateExperience(id, params)
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
    return { type: experienceConstants.UPDATE_EXPERIENCE_REQUEST };
  }
  function success(user) {
    return { type: experienceConstants.UPDATE_EXPERIENCE_SUCCESS, user };
  }
  function failure(error) {
    return { type: experienceConstants.UPDATE_EXPERIENCE_FAILURE, error };
  }
}
