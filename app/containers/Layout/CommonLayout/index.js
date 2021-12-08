import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';

const StyledWrap = styled.div`
   {
    margin: 0 auto;
  }
`;

const DefaultLayout = ({ component: Component, ...Props }) => (
  <StyledWrap className="main-wrapper">
    <Header />
    <div className="main-body">
      <Component {...Props} />
    </div>
    <Footer />
  </StyledWrap>
);

DefaultLayout.propTypes = {
  component: PropTypes.func,
};

export default DefaultLayout;
