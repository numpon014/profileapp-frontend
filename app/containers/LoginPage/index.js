import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
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

  .auth-outer {
    h3 {
      text-align: center;
      margin: 0;
      line-height: 1;
      padding-bottom: 20px;
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
  }
`;

export function LoginPage({ onSubmitForm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitForm(username, password);
  };

  return (
    <LoginPageWrapper>
      <Helmet>
        <title>Login Page</title>
        <meta
          name="Profile App"
          content="Register your profile to get free ads!"
        />
      </Helmet>
      <div className="auth-outer">
        <div className="auth-inner">
          <Form onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </LoginPageWrapper>
  );
}

LoginPage.propTypes = {
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = () => ({
  // account: state.get('account'),
});

const mapDispatchToProps = dispatch => ({
  onSubmitForm(username, password) {
    dispatch(submitLoginForm(username, password));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
