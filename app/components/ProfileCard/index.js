import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import EasyEdit, { Types } from 'react-easy-edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { updateUser } from 'shares/actions/users';

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

    .name {
      margin: 0 0 10px 0;
    }

    .inline-editor {
      &.name {
        margin: 0 0 10px 0;
      }
      &.age {
        font-size: 0.8rem;
        margin: 10px 0 0;
      }
    }

    h6.email {
      margin: 0;
      font-size: 0.8rem;
      font-weight: 400;
      color: #9fa8b9;
    }
  }
`;

function ProfileCard({ className, user, onSubmitForm, intl }) {
  const handleSubmit = (name, value) => {
    onSubmitForm(
      user.id,
      {
        [name]: value,
      },
      intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
    );
  };

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
                <div className="inline-editor name">
                  <EasyEdit
                    type={Types.TEXT}
                    value={user.name}
                    onSave={value => {
                      handleSubmit('name', value);
                    }}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: 'name', id: 4 }}
                  />
                </div>
                <h6 className="email">{user.username}</h6>
                <div className="inline-editor age">
                  <span>
                    <FormattedMessage id="profilePage.form.field.age.label" />
                  </span>
                  <EasyEdit
                    type={Types.TEXT}
                    value={user.age}
                    onSave={value => {
                      handleSubmit('age', value);
                    }}
                    saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                    cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                    attributes={{ name: 'age', id: 4 }}
                  />
                </div>
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
  onSubmitForm: PropTypes.func,
  intl: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  onSubmitForm(id, params, failMessage, callback) {
    dispatch(updateUser(id, params, failMessage, callback));
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
)(ProfileCard);
