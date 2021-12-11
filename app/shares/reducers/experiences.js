import { experienceConstants } from 'shares/constants/experiences';

export function experienceReducer(state = {}, action) {
  switch (action.type) {
    case experienceConstants.GET_EXPERIENCE_REQUEST:
      return {
        loading: true,
      };
    case experienceConstants.GET_EXPERIENCE_SUCCESS:
      return {
        experiences: action.experiences,
      };
    case experienceConstants.GET_EXPERIENCE_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
