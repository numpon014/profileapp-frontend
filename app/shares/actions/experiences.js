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
      .then(experience => {
        dispatch(success(experience));
        if (typeof callback === 'function') callback(experience);
      })
      .catch(err => {
        dispatch(alertActions.error(failMessage));
        dispatch(failure(err.toString()));
      });
  };

  function request() {
    return { type: experienceConstants.UPDATE_EXPERIENCE_REQUEST };
  }
  function success(experience) {
    return { type: experienceConstants.UPDATE_EXPERIENCE_SUCCESS, experience };
  }
  function failure(error) {
    return { type: experienceConstants.UPDATE_EXPERIENCE_FAILURE, error };
  }
}

export function updateExperienceCompanyLogo(
  id,
  rawImage,
  failMessage,
  callback,
) {
  return dispatch => {
    dispatch(request());

    return experienceService
      .updateExperienceCompanyLogo(id, rawImage)
      .then(experience => {
        dispatch(success(experience));
        if (typeof callback === 'function') callback(experience);
      })
      .catch(err => {
        dispatch(alertActions.error(failMessage));
        dispatch(failure(err.toString()));
      });
  };

  function request() {
    return { type: experienceConstants.UPDATE_EXPERIENCE_REQUEST };
  }
  function success(experience) {
    return { type: experienceConstants.UPDATE_EXPERIENCE_SUCCESS, experience };
  }
  function failure(error) {
    return { type: experienceConstants.UPDATE_EXPERIENCE_FAILURE, error };
  }
}

export function createCurrentUserExperience(params, callback) {
  Object.assign(params, { user_id: getCurrentUserId() });

  return dispatch => {
    dispatch(request());

    return experienceService
      .createExperience(params)
      .then(experience => {
        dispatch(success(experience));
        if (typeof callback === 'function') callback(experience);
      })
      .catch(err => {
        dispatch(alertActions.error(err.toString()));
        dispatch(failure(err.toString()));
      });
  };

  function request() {
    return { type: experienceConstants.CREATE_EXPERIENCE_REQUEST };
  }
  function success(experience) {
    return { type: experienceConstants.CREATE_EXPERIENCE_SUCCESS, experience };
  }
  function failure(error) {
    return { type: experienceConstants.CREATE_EXPERIENCE_FAILURE, error };
  }
}

export function deleteExperience(experienceId, callback) {
  return dispatch => {
    dispatch(request());

    return experienceService
      .deleteExperience(experienceId)
      .then(experience => {
        dispatch(success(experienceId));
        if (typeof callback === 'function') callback(experience);
      })
      .catch(err => {
        dispatch(alertActions.error(err.toString()));
        dispatch(failure(err.toString()));
      });
  };

  function request() {
    return { type: experienceConstants.DELETE_EXPERIENCE_REQUEST };
  }
  function success(id) {
    return { type: experienceConstants.DELETE_EXPERIENCE_SUCCESS, id };
  }
  function failure(error) {
    return { type: experienceConstants.DELETE_EXPERIENCE_FAILURE, error };
  }
}
