import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EasyEdit, { Types } from 'react-easy-edit';
import styled from 'styled-components';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { updateExperience } from 'shares/actions/experiences';

const StyledWrapper = styled.div`
  .title {
    color: #02c0ce;
  }

  p {
    padding: 5px 0;
    margin: 0;
  }

  .easy-edit-inline-wrapper {
    .easy-edit-component-wrapper {
      width: 90%;
      input[type='text'] {
        min-height: calc(1.5em + 0.5rem + 2px);
        padding: 0.25rem 0.5rem;
        border: 1px solid #ced4da;
        border-radius: 0.2rem;
        font-size: 0.875rem;
        margin-bottom: 2px;
        &:focus {
          outline: none;
          outline: #ced4da;
        }
      }
      textarea {
        min-height: 150px;
        &:focus {
          outline: none;
          outline: #ced4da;
        }
      }
    }

    .easy-edit-button {
      background: none;
    }
  }

  .text-muted {
    font-size: 13px;
  }

  .period {
    &:after {
      content: '';
      clear: both;
      display: table;
    }

    .easy-edit-wrapper,
    .date-to {
      float: left;
      margin-right: 5px;
    }
  }
`;

function ExperienceForm({ className, experience, onSaveExperience, intl }) {
  const onSubmit = (name, value) => {
    onSaveExperience(
      experience.id,
      {
        [name]: value,
      },
      intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
    );
  };

  return (
    <StyledWrapper className={`${className}`}>
      <div className="title">
        <EasyEdit
          type={Types.TEXT}
          value={experience.title}
          onSave={value => {
            onSubmit('title', value);
          }}
          saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
          cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
          attributes={{ name: 'experience-title', id: 1 }}
        />
      </div>
      <EasyEdit
        type={Types.TEXT}
        value={experience.company}
        onSave={value => {
          onSubmit('company', value);
        }}
        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
        attributes={{ name: 'experience-company', id: 1 }}
      />
      <div className="period">
        <EasyEdit
          type={Types.DATE}
          value={experience.start_date}
          onSave={value => {
            onSubmit('start_date', value);
          }}
          saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
          cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
          attributes={{ name: 'experience-start-date', id: 1 }}
        />
        <span className="date-to"> - </span>
        <EasyEdit
          type={Types.DATE}
          value={experience.end_date}
          onSave={value => {
            onSubmit('end_date', value);
          }}
          saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
          cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
          attributes={{ name: 'experience-end-date', id: 1 }}
        />
      </div>
      <div className="text-muted">
        <EasyEdit
          type={Types.TEXTAREA}
          value={experience.description}
          onSave={value => {
            onSubmit('description', value);
          }}
          saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
          cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
          attributes={{ name: 'experience-description', id: 1 }}
        />
      </div>
    </StyledWrapper>
  );
}

ExperienceForm.propTypes = {
  className: PropTypes.string,
  experience: PropTypes.object,
  onSaveExperience: PropTypes.func,
  intl: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  onSaveExperience(id, params, failMessage, callback) {
    dispatch(updateExperience(id, params, failMessage, callback));
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
