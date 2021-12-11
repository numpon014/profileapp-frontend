import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .profile {
    margin: 0 0 10px 0;
    padding-bottom: 10px;
    text-align: center;

    .avatar {
      margin: 0 0 10px 0;
      img {
        width: 90px;
        height: 90px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        border-radius: 100px;
      }
    }

    h5.name {
      margin: 0 0 10px 0;
    }

    h6.email {
      margin: 0;
      font-size: 0.8rem;
      font-weight: 400;
      color: #9fa8b9;
    }
  }
`;

function ProfileCard({ className, user }) {
  return (
    <StyledWrapper className={className}>
      <Card>
        <Card.Body>
          {user && user.avatar && (
            <div className="account">
              <div className="profile">
                <div className="avatar">
                  <img src={user.avatar.url} alt={user.name} />
                </div>
                <h5 className="name">{user.name}</h5>
                <h6 className="email">{user.username}</h6>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </StyledWrapper>
  );
}

ProfileCard.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

export default ProfileCard;
