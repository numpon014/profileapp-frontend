import { authService } from 'shares/services';
import { authConstants } from 'containers/Page/LoginPage/constants';
import history from 'utils/history';

export function logout() {
  authService.logout();
  history.push('/login');
  return { type: authConstants.LOGOUT };
}
