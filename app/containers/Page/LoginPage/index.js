import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import appLogo from 'assets/images/tukubkao_logo.png';
import Alert from 'containers/Alert';
import history from 'utils/history';
import { alertActions } from 'containers/Alert/action';
import { submitLoginForm } from './actions';

const LoginPageWrapper = styled.div`
  background: #12c2e9;
  background: -webkit-linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-width: 100%;
  min-height: 100%;
  position: absolute;

  .logo {
    width: 150px;
    height: auto;
    display: block;
    margin: 0 auto 10px;
  }

  .auth-inner {
    background-color: #fff;
    box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    min-width: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export function LoginPage({ onSubmitForm, clearAlert, intl }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitForm(
      username,
      password,
      intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
    );
  };

  useEffect(() => {
    history.listen(() => {
      clearAlert();
    });
  }, []);

  return (
    <LoginPageWrapper>
      <Helmet>
        <title>{intl.formatMessage({ id: 'loginPage.page.title' })}</title>
        <meta
          name={intl.formatMessage({ id: 'app.name' })}
          content={intl.formatMessage({ id: 'loginPage.page.content' })}
        />
      </Helmet>
      <div className="auth-inner">
        <img
          src={appLogo}
          alt={intl.formatMessage({ id: 'app.name' })}
          className="logo"
        />
        <Form onSubmit={handleSubmit}>
          <Alert />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <FormattedMessage id="loginPage.form.field.email.label" />
            </Form.Label>
            <Form.Control
              type="email"
              placeholder={intl.formatMessage({
                id: 'loginPage.form.field.email.placeholder',
              })}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <FormattedMessage id="loginPage.form.field.password.label" />
            </Form.Label>
            <Form.Control
              type="password"
              placeholder={intl.formatMessage({
                id: 'loginPage.form.field.password.placeholder',
              })}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="dark" type="submit" size="lg">
              <FormattedMessage id="loginPage.form.button.signIn" />
            </Button>
          </div>
        </Form>
      </div>
    </LoginPageWrapper>
  );
}

LoginPage.propTypes = {
  intl: PropTypes.object,
  onSubmitForm: PropTypes.func,
  clearAlert: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onSubmitForm(username, password, failMessage) {
    dispatch(submitLoginForm(username, password, failMessage));
  },
  clearAlert() {
    dispatch(alertActions.clear());
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  memo,
)(LoginPage);
