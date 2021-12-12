import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import ExperienceInlineForm from './experienceInlineForm';
import ExperienceForm from './experienceForm';
import ImageUpload from './imageUpload';

const StyledWrapper = styled.div`
  .experience-item {
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
      border-bottom: 0 none;
    }
  }

  .experience-form {
    margin-top: 20px;
  }
`;

function ExperienceList({ className, experiences }) {
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const toggleExperienceForm = () => {
    setShowExperienceForm(!showExperienceForm);
  };

  return (
    <StyledWrapper className={`experience-list ${className}`}>
      <Card>
        <Card.Body>
          <Container>
            <h5 className="mb-2 text-primary">Experience</h5>
            {experiences &&
              experiences.map(experience => (
                <Row key={`${experience.id}`} className="experience-item">
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
};

export default ExperienceList;
