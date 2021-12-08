import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';

const StyledWrap = styled.div`
   {
    margin: 0 auto;

    footer {
      padding: 40px 0 41px 0;
      background-color: #4d0a50;
    }
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
