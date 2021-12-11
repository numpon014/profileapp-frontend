import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { alertActions } from 'containers/Alert/action';
import { getCurrentUser, updateUser } from 'shares/actions/users';
import ProfileCard from 'components/ProfileCard';

const ProfilePageWrapper = styled.div`
  .form-label {
    font-size: 0.825rem;
  }

  //.form-control {
  //  border: 1px solid #cfd1d8;
  //  -webkit-border-radius: 2px;
  //  -moz-border-radius: 2px;
  //  border-radius: 2px;
  //  font-size: 0.825rem;
  //  background: #ffffff;
  //  color: #2e323c;
  //}

  .card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
  }

  .submit-wrapper {
    margin-top: 10px;
  }
`;

export function ProfilePage({ user, getUserDetail, onSubmitForm, intl }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    getUserDetail(
      intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
      res => {
        setName(res.name);
        setAge(res.age);
      },
    );
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitForm(
      user.user.id,
      {
        name,
        age,
      },
      intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
    );
  };

  return (
    <ProfilePageWrapper>
      <Helmet>
        <title>{intl.formatMessage({ id: 'profilePage.page.title' })}</title>
        <meta
          name={intl.formatMessage({ id: 'app.name' })}
          content={intl.formatMessage({ id: 'profilePage.page.content' })}
        />
      </Helmet>
      <Container>
        <Row>
          <Col xs={3}>
            <ProfileCard user={user.user} />
          </Col>
          <Col xs={9}>
            {user && user.user && (
              <Form onSubmit={handleSubmit}>
                <Card>
                  <Card.Body>
                    <Container>
                      <h6 className="mb-2 text-primary">Personal Details</h6>
                      <Row>
                        <Form.Group as={Col}>
                          <Form.Label>
                            <FormattedMessage id="profilePage.form.field.name.label" />
                          </Form.Label>
                          <Form.Control
                            type="text"
                            size="sm"
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                          <Form.Label>
                            <FormattedMessage id="profilePage.form.field.age.label" />
                          </Form.Label>
                          <Form.Control
                            type="text"
                            size="sm"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                          />
                        </Form.Group>
                      </Row>
                      <div className="submit-wrapper">
                        <Button variant="primary" type="submit" size="sm">
                          Submit
                        </Button>
                      </div>
                    </Container>
                  </Card.Body>
                </Card>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </ProfilePageWrapper>
  );
}

ProfilePage.propTypes = {
  intl: PropTypes.object,
  getUserDetail: PropTypes.func,
  user: PropTypes.object,
  onSubmitForm: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  clearAlert() {
    dispatch(alertActions.clear());
  },
  getUserDetail(failMessage, callback) {
    dispatch(getCurrentUser(failMessage, callback));
  },
  onSubmitForm(id, params, failMessage, callback) {
    dispatch(updateUser(id, params, failMessage, callback));
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  memo,
)(ProfilePage);
