import React, { memo, useEffect } from 'react';
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
import { register } from 'shares/actions/users';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegistrationPageWrapper = styled.div`
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

  .inner {
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

  .login-link {
    text-align: right;
  }
`;

export function RegistrationPage({ onSubmitForm, clearAlert, intl }) {
  useEffect(() => {
    history.listen(() => {
      clearAlert();
    });
  }, []);

  const schema = Yup.object().shape({
    username: Yup.string()
      .required(
        intl.formatMessage({
          id: 'registerPage.form.field.email.validate.required',
        }),
      )
      .email(
        intl.formatMessage({
          id: 'registerPage.form.field.email.validate.email',
        }),
      ),
    password: Yup.string()
      .required(
        intl.formatMessage({
          id: 'registerPage.form.field.password.validate.required',
        }),
      )
      .min(6)
      .max(40),
    passwordConfirmation: Yup.string()
      .required(
        intl.formatMessage({
          id: 'registerPage.form.field.passwordConfirmation.validate.required',
        }),
      )
      .oneOf(
        [Yup.ref('password'), null],
        intl.formatMessage({
          id: 'registerPage.form.field.passwordConfirmation.validate.mismatch',
        }),
      ),
  });

  return (
    <RegistrationPageWrapper>
      <Helmet>
        <title>{intl.formatMessage({ id: 'registerPage.page.title' })}</title>
        <meta
          name={intl.formatMessage({ id: 'app.name' })}
          content={intl.formatMessage({ id: 'registerPage.page.content' })}
        />
      </Helmet>
      <div className="inner">
        <img
          src={appLogo}
          alt={intl.formatMessage({ id: 'app.name' })}
          className="logo"
        />
        <Formik
          initialValues={{
            username: '',
            password: '',
            passwordConfirmation: '',
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            onSubmitForm(
              values.username,
              values.password,
              values.passwordConfirmation,
              () => {
                setSubmitting(false);
                history.push('/profile');
              },
            );
          }}
        >
          {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Alert />
              <Form.Group className="mb-3 position-relative">
                <Form.Label>
                  <FormattedMessage id="registerPage.form.field.email.label" />
                </Form.Label>
                <Form.Control
                  type="email"
                  name="username"
                  placeholder={intl.formatMessage({
                    id: 'registerPage.form.field.email.placeholder',
                  })}
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 position-relative">
                <Form.Label>
                  <FormattedMessage id="registerPage.form.field.password.label" />
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder={intl.formatMessage({
                    id: 'registerPage.form.field.password.placeholder',
                  })}
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 position-relative">
                <Form.Label>
                  <FormattedMessage id="registerPage.form.field.passwordConfirmation.label" />
                </Form.Label>
                <Form.Control
                  name="passwordConfirmation"
                  type="password"
                  placeholder={intl.formatMessage({
                    id:
                      'registerPage.form.field.passwordConfirmation.placeholder',
                  })}
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  isInvalid={!!errors.passwordConfirmation}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="dark"
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <FormattedMessage id="registerPage.form.button.register" />
                </Button>
                <div className="login-link">
                  <span>
                    <FormattedMessage id="registerPage.form.button.loginInvitation" />{' '}
                  </span>
                  <Link to="/login">
                    <FormattedMessage id="registerPage.form.button.signIn" />
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </RegistrationPageWrapper>
  );
}

RegistrationPage.propTypes = {
  intl: PropTypes.object,
  onSubmitForm: PropTypes.func,
  clearAlert: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onSubmitForm(username, password, passwordConfirmation, callback) {
    dispatch(register(username, password, passwordConfirmation, callback));
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
)(RegistrationPage);
