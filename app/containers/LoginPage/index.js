import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { submitLoginForm } from './actions';

export function LoginPage({ onSubmitForm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitForm(username, password);
  };

  return (
    <article>
      <Helmet>
        <title>Login Page</title>
        <meta
          name="Profile App"
          content="Register your profile to get free ads!"
        />
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
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
    </article>
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
