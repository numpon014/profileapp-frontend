import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Container } from 'react-bootstrap';
import styled from 'styled-components';
import ExperienceForm from './experienceForm';
import ImageUpload from './imageUpload';

const StyledWrapper = styled.div`
  .experience-item {
    padding: 15px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
      border-bottom: 0 none;
    }
  }
`;

function ExperienceList({ className, experiences }) {
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
                    <ExperienceForm experience={experience} />
                  </Col>
                </Row>
              ))}
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
