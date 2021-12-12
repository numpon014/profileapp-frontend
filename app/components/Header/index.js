import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import appLogo from 'assets/images/tukubkao_logo.png';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from 'shares/actions/auth';

const StyledWrap = styled.div`
  .logo {
    width: 50px;
  }
  .logout-button {
    color: rgba(0, 0, 0, 0.55);
    text-decoration: none;
  }
`;

function Header({ className, intl, onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <StyledWrap className={className}>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand as={Link} to="/profile">
            <img
              src={appLogo}
              alt={intl.formatMessage({ id: 'app.name' })}
              className="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                <FormattedMessage id="app.navbar.home" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <Button
              variant="link"
              className="logout-button"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />{' '}
              <FormattedMessage id="app.navbar.logout" />
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </StyledWrap>
  );
}

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch(logout());
  },
});

Header.propTypes = {
  className: PropTypes.string,
  onLogout: PropTypes.func,
  intl: PropTypes.object,
};

export default compose(
  injectIntl,
  connect(
    null,
    mapDispatchToProps,
  ),
  memo,
)(Header);
