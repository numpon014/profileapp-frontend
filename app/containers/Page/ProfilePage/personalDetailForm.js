import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateUser } from 'shares/actions/users';

const StyledWrapper = styled.div`
  min-height: 100px;

  .submit-wrapper {
    margin-top: 10px;
  }
`;

function PersonalDetailForm({ className, onSubmitForm, user, intl }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    setName(user.name);
    setAge(user.age);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitForm(
      user.id,
      {
        name,
        age,
      },
      intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
    );
  };

  return (
    <StyledWrapper className={className}>
      <Form onSubmit={handleSubmit}>
        <Card>
          <Card.Body>
            <Container>
              <h5 className="mb-2 text-primary">Personal Details</h5>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label column="sm">
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
                  <Form.Label column="sm">
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
    </StyledWrapper>
  );
}

PersonalDetailForm.propTypes = {
  intl: PropTypes.object,
  className: PropTypes.string,
  onSubmitForm: PropTypes.func,
  user: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  onSubmitForm(id, params, failMessage, callback) {
    dispatch(updateUser(id, params, failMessage, callback));
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
)(PersonalDetailForm);
