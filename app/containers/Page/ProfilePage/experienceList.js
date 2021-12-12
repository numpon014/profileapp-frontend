import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .title {
    color: #02c0ce;
  }

  p {
    font-size: 0.9rem;
    padding: 5px 0;
    margin: 0;
  }

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
                <div key={`${experience.id}`} className="experience-item">
                  <p className="title">{experience.title}</p>
                  <p className="company">{experience.company}</p>
                  <p className="period">
                    <span className="start-date">{experience.start_date}</span>
                    <span className="start-date">{experience.end_date}</span>
                  </p>
                  <p className="text-muted">{experience.description}</p>
                </div>
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
