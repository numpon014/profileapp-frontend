import { userService } from 'shares/services';
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
