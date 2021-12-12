import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { deleteExperience } from 'shares/actions/experiences';
import ExperienceInlineForm from './experienceInlineForm';
import ExperienceForm from './experienceForm';
import ImageUpload from './imageUpload';

const StyledWrapper = styled.div`
  .experience-item {
    padding: 20px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    &:last-child {
      border-bottom: 0 none;
    }
  }

  .experience-form {
    margin-top: 20px;
  }

  .delete-button {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
    background: 0 none;

    &:hover {
      background: 0 none;
    }
  }
`;

function ExperienceList({ className, experiences, deleteUserExperience }) {
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const toggleExperienceForm = () => {
    setShowExperienceForm(!showExperienceForm);
  };

  const handleRowHover = rowKey => {
    const control = document.getElementById(`delete-button-${rowKey}`);
    control.style.display = 'block';
  };

  const handleRowHoverLeave = rowKey => {
    const control = document.getElementById(`delete-button-${rowKey}`);
    control.style.display = 'none';
  };

  const onDeleteExperience = experienceId => {
    deleteUserExperience(experienceId);
  };

  return (
    <StyledWrapper className={`experience-list ${className}`}>
      <Card>
        <Card.Body>
          <Container>
            <h5 className="mb-2 text-primary">Experience</h5>
            {experiences &&
              experiences.map(experience => (
                <Row
                  key={`${experience.id}`}
                  className="experience-item"
                  onMouseEnter={() => {
                    handleRowHover(experience.id);
                  }}
                  onMouseLeave={() => {
                    handleRowHoverLeave(experience.id);
                  }}
                >
                  <Button
                    id={`delete-button-${experience.id}`}
                    className="delete-button"
                    variant="light"
                    size="sm"
                    onClick={() => {
                      onDeleteExperience(experience.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                  <Col xs={2}>
                    <ImageUpload
                      experienceId={experience.id}
                      imageUrl={experience.company_logo.url}
                    />
                  </Col>
                  <Col xs={10}>
                    <ExperienceInlineForm experience={experience} />
                  </Col>
                </Row>
              ))}
            <Row>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={toggleExperienceForm}
              >
                {showExperienceForm
                  ? 'Close Experience Form'
                  : 'Add Experience'}
              </Button>
              {showExperienceForm && (
                <ExperienceForm className="experience-form" />
              )}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </StyledWrapper>
  );
}

ExperienceList.propTypes = {
  className: PropTypes.string,
  experiences: PropTypes.array,
  deleteUserExperience: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  deleteUserExperience(failMessage, callback) {
    dispatch(deleteExperience(failMessage, callback));
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
)(ExperienceList);
