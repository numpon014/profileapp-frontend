import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createCurrentUserExperience } from 'shares/actions/experiences';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

function ExperienceForm({ className, onSubmitForm }) {
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const toggleExperienceForm = () => {
    setShowExperienceForm(!showExperienceForm);
  };

  const schema = Yup.object().shape({
    companyName: Yup.string().required(),
    title: Yup.string().required(),
    startDate: Yup.date().required(),
    endDate: Yup.date().when(
      'startDate',
      // eslint-disable-next-line no-shadow
      (startDate, schema) => startDate && schema.min(startDate),
    ),
  });

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
        <Formik
          initialValues={{
            title: '',
            companyName: '',
            startDate: '',
            endDate: '',
            description: '',
            company_logo: null,
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            onSubmitForm(
              {
                companyName: values.companyName,
                company_logo: values.company_logo,
                title: values.title,
                startDate: values.startDate,
                endDate: values.endDate,
                description: values.description,
              },
              () => {
                setSubmitting(false);
                setShowExperienceForm(false);
              },
            );
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <h5 className="mb-2 text-primary">
                <FormattedMessage id="profilePage.form.experience.title" />
              </h5>
              <Form.Group className="position-relative">
                <Form.Label column="sm">
                  <FormattedMessage id="profilePage.form.experience.field.companyName.label" />
                </Form.Label>
                <Form.Control
                  name="companyName"
                  type="text"
                  size="sm"
                  value={values.companyName}
                  onChange={handleChange}
                  isInvalid={!!errors.companyName}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.companyName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Label column="sm">
                  <FormattedMessage id="profilePage.form.experience.field.companyLogo.label" />
                </Form.Label>
                <Form.Control
                  type="file"
                  size="sm"
                  name="company_logo"
                  onChange={e => {
                    setFieldValue('company_logo', e.currentTarget.files[0]);
                  }}
                  isInvalid={!!errors.company_logo}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.company_logo}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Label column="sm">
                  <FormattedMessage id="profilePage.form.experience.field.title.label" />
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  size="sm"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Label column="sm">
                  <FormattedMessage id="profilePage.form.experience.field.startDate.label" />
                </Form.Label>
                <Form.Control
                  name="startDate"
                  type="date"
                  size="sm"
                  value={values.startDate}
                  onChange={handleChange}
                  isInvalid={!!errors.startDate}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.startDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Label column="sm">
                  <FormattedMessage id="profilePage.form.experience.field.endDate.label" />
                </Form.Label>
                <Form.Control
                  name="endDate"
                  type="date"
                  size="sm"
                  value={values.endDate}
                  onChange={handleChange}
                  isInvalid={!!errors.endDate}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.endDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label column="sm">
                  <FormattedMessage id="profilePage.form.experience.field.description.label" />
                </Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  size="sm"
                  as="textarea"
                  rows={3}
                  value={values.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="submit-wrapper">
                <Button
                  variant="primary"
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                >
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
        </Formik>
      )}
    </StyledWrapper>
  );
}

ExperienceForm.propTypes = {
  className: PropTypes.string,
  onSubmitForm: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onSubmitForm(params, callback) {
    dispatch(createCurrentUserExperience(params, callback));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ExperienceForm);
