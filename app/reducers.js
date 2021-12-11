/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { alertReducer } from 'containers/Alert/reducer';
import { userReducer } from 'shares/reducers/users';
import { experienceReducer } from 'shares/reducers/experiences';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    alert: alertReducer,
    user: userReducer,
    experience: experienceReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
