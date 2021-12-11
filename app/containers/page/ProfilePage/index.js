import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { alertActions } from 'containers/Alert/action';
import { getCurrentUser } from 'shares/actions/users';

const ProfilePageWrapper = styled.div`
  .account {
    .profile {
      margin: 0 0 1rem 0;
      padding-bottom: 1rem;
      text-align: center;
      .avatar {
        margin: 0 0 1rem 0;
        img {
          width: 90px;
          height: 90px;
          -webkit-border-radius: 100px;
          -moz-border-radius: 100px;
          border-radius: 100px;
        }
      }
      h5.name {
        margin: 0 0 0.5rem 0;
      }
      h6.email {
        margin: 0;
        font-size: 0.8rem;
        font-weight: 400;
        color: #9fa8b9;
      }
    }
    .about {
      margin: 2rem 0 0 0;
      text-align: center;

      h5 {
        margin: 0 0 15px 0;
        color: #007ae1;
      }

      p {
        font-size: 0.825rem;
      }
    }
  }
`;

export function ProfilePage({ user, getCurrentUserDetail, intl }) {
  useEffect(() => {
    getCurrentUserDetail(
      intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
    );
  }, []);

  return (
    <ProfilePageWrapper>
      <Helmet>
        <title>{intl.formatMessage({ id: 'loginPage.page.title' })}</title>
        <meta
          name={intl.formatMessage({ id: 'app.name' })}
          content={intl.formatMessage({ id: 'loginPage.page.content' })}
        />
      </Helmet>
      <Container>
        <Row>
          <Col xs={4}>
            <Card>
              <Card.Body>
                {user.user && (
                  <div className="account">
                    <div className="profile">
                      <div className="avatar">
                        {user.user.avatar && (
                          <img
                            src={user.user.avatar.url}
                            alt={user.user.name}
                          />
                        )}
                      </div>
                      <h5 className="name">{user.user.name}</h5>
                      <h6 className="email">{user.user.username}</h6>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={8}>2 of 3 (wider)</Col>
        </Row>
      </Container>
    </ProfilePageWrapper>
  );
}

ProfilePage.propTypes = {
  intl: PropTypes.object,
  getCurrentUserDetail: PropTypes.func,
  user: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  clearAlert() {
    dispatch(alertActions.clear());
  },
  getCurrentUserDetail() {
    dispatch(getCurrentUser());
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  memo,
)(ProfilePage);
