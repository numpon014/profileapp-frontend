import React from 'react';
import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';

function Header({ className }) {
  return (
    <div className={className}>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/profile">Profile</HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
