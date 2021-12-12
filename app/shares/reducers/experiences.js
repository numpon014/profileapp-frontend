import { experienceConstants } from 'shares/constants/experiences';

const initialState = {
  loading: false,
  experiences: [],
  error: '',
};

export function experienceReducer(state = initialState, action) {
  switch (action.type) {
    case experienceConstants.GET_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case experienceConstants.GET_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: action.experiences,
      };
    case experienceConstants.GET_EXPERIENCE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case experienceConstants.CREATE_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case experienceConstants.CREATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: [...state.experiences, action.experience],
      };
    case experienceConstants.CREATE_EXPERIENCE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case experienceConstants.DELETE_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case experienceConstants.DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: state.experiences.filter(item => item.id !== action.id),
      };
    case experienceConstants.UPDATE_EXPERIENCE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
