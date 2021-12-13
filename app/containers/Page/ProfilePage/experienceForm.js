import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FileUpload from 'components/FileUpload';
import { createCurrentUserExperience } from 'shares/actions/experiences';

const StyledWrapper = styled.div`
  .experience-form {
    margin-top: 10px;
  }

  .toggle-form-button {
    float: right;
  }

  .submit-wrapper {
    margin-top: 10px;
  }
`;

function ExperienceForm({ className, onSubmitForm, intl }) {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [validated, setValidated] = useState(false);

  const toggleExperienceForm = () => {
    setShowExperienceForm(!showExperienceForm);
    setValidated(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      onSubmitForm(
        {
          title,
          companyName,
          startDate,
          endDate,
          description,
          selectedFile,
        },
        intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
        () => {
          setShowExperienceForm(false);
          setValidated(false);
        },
      );
    }
    setValidated(true);
  };

  const showErrorAlert = error => {
    // eslint-disable-next-line no-console
    console.log(error);
  };

  return (
    <StyledWrapper className={className}>
      <Button
        variant="link"
        size="sm"
        className="toggle-form-button"
        onClick={toggleExperienceForm}
      >
        <span>{showExperienceForm ? 'Close' : 'Add Experience'}</span>
      </Button>
      {showExperienceForm && (
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="experience-form"
        >
          <h5 className="mb-2 text-primary">
            <FormattedMessage id="profilePage.form.experience.title" />
          </h5>
          <Form.Group>
            <Form.Label column="sm">
              <FormattedMessage id="profilePage.form.experience.field.companyName.label" />
            </Form.Label>
            <Form.Control
              type="text"
              size="sm"
              required
              onChange={e => setCompanyName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              <FormattedMessage id="profilePage.form.experience.field.companyName.validate" />
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label column="sm">
              <FormattedMessage id="profilePage.form.experience.field.companyLogo.label" />
            </Form.Label>
            <FileUpload
              onFileSelectSuccess={file => setSelectedFile(file)}
              onFileSelectError={({ error }) => showErrorAlert(error)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label column="sm">
              <FormattedMessage id="profilePage.form.experience.field.title.label" />
            </Form.Label>
            <Form.Control
              type="text"
              size="sm"
              required
              onChange={e => setTitle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              <FormattedMessage id="profilePage.form.experience.field.title.validate" />
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label column="sm">
              <FormattedMessage id="profilePage.form.experience.field.startDate.label" />
            </Form.Label>
            <Form.Control
              type="date"
              size="sm"
              required
              onChange={e => setStartDate(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              <FormattedMessage id="profilePage.form.experience.field.startDate.validate" />
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label column="sm">
              <FormattedMessage id="profilePage.form.experience.field.endDate.label" />
            </Form.Label>
            <Form.Control
              type="date"
              size="sm"
              onChange={e => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label column="sm">
              <FormattedMessage id="profilePage.form.experience.field.description.label" />
            </Form.Label>
            <Form.Control
              type="text"
              size="sm"
              as="textarea"
              rows={3}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
          <div className="submit-wrapper">
            <Button variant="primary" type="submit" size="sm">
              <FormattedMessage id="profilePage.form.experience.button.save" />
            </Button>{' '}
            <Button
              variant="secondary"
              type="reset"
              size="sm"
              onClick={toggleExperienceForm}
            >
              <FormattedMessage id="profilePage.form.experience.button.cancel" />
            </Button>
          </div>
        </Form>
      )}
    </StyledWrapper>
  );
}

ExperienceForm.propTypes = {
  intl: PropTypes.object,
  className: PropTypes.string,
  onSubmitForm: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onSubmitForm(params, failMessage, callback) {
    dispatch(createCurrentUserExperience(params, failMessage, callback));
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
)(ExperienceForm);
