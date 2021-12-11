import { userConstants } from 'shares/constants/users';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { user } : {};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_CURRENT_USER_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GET_CURRENT_USER_SUCCESS:
      return {
        user: action.user,
      };
    case userConstants.GET_CURRENT_USER_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.UPDATE_USER_REQUEST:
      return {
        loading: true,
      };
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        user: action.user,
      };
    case userConstants.UPDATE_USER_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
