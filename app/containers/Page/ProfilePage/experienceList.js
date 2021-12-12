import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'react-bootstrap';
import styled from 'styled-components';
import ExperienceForm from './experienceForm';

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
                <ExperienceForm
                  key={`${experience.id}`}
                  className="experience-item"
                  experience={experience}
                />
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
