import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';

const StyledWrap = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
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
