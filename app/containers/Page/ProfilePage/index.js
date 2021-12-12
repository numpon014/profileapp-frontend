import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { alertActions } from 'containers/Alert/action';
import { getCurrentUser } from 'shares/actions/users';
import { getCurrentUserExperience } from 'shares/actions/experiences';
import ProfileCard from 'components/ProfileCard';
import PersonalDetailForm from './personalDetailForm';
import ExperienceList from './experienceList';

const ProfilePageWrapper = styled.div`
  .card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 20px;
  }
`;

export function ProfilePage({
  user,
  experience,
  getPersonalDetail,
  getExperience,
  intl,
}) {
  useEffect(() => {
    getPersonalDetail(
      intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
    );
    getExperience(
      intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
    );
  }, []);

  return (
    <ProfilePageWrapper>
      <Helmet>
        <title>{intl.formatMessage({ id: 'profilePage.page.title' })}</title>
        <meta
          name={intl.formatMessage({ id: 'app.name' })}
          content={intl.formatMessage({ id: 'profilePage.page.content' })}
        />
      </Helmet>
      <Container>
        <Row>
          <Col xs={3}>
            <ProfileCard user={user.user} />
          </Col>
          <Col xs={9}>
            {user && user.user && (
              <div className="personal-detail">
                <PersonalDetailForm user={user.user} />
              </div>
            )}
            <ExperienceList experiences={experience.experiences} />
          </Col>
        </Row>
      </Container>
    </ProfilePageWrapper>
  );
}

ProfilePage.propTypes = {
  intl: PropTypes.object,
  getPersonalDetail: PropTypes.func,
  getExperience: PropTypes.func,
  user: PropTypes.object,
  experience: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  clearAlert() {
    dispatch(alertActions.clear());
  },
  getPersonalDetail(failMessage, callback) {
    dispatch(getCurrentUser(failMessage, callback));
  },
  getExperience(failMessage, callback) {
    dispatch(getCurrentUserExperience(failMessage, callback));
  },
});

const mapStateToProps = state => ({
  user: state.user,
  experience: state.experience,
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
