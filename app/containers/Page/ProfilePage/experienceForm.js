import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
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

  const toggleExperienceForm = () => {
    setShowExperienceForm(!showExperienceForm);
  };

  const handleSubmit = e => {
    e.preventDefault();

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
      },
    );
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
        <Form onSubmit={handleSubmit} className="experience-form">
          <h5 className="mb-2 text-primary">Create Experience</h5>
          <Form.Group>
            <Form.Label column="sm">Title</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label column="sm">Company Name</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              onChange={e => setCompanyName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label column="sm">Company Logo</Form.Label>
            <FileUpload
              onFileSelectSuccess={file => setSelectedFile(file)}
              onFileSelectError={({ error }) => showErrorAlert(error)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label column="sm">Start Date</Form.Label>
            <Form.Control
              type="date"
              size="sm"
              onChange={e => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label column="sm">End Date</Form.Label>
            <Form.Control
              type="date"
              size="sm"
              onChange={e => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label column="sm">Description</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
          <div className="submit-wrapper">
            <Button variant="primary" type="submit" size="sm">
              Submit
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
