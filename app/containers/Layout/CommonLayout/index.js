import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from 'components/Header';

const StyledWrap = styled.div`
  min-height: 100%;
  width: 100%;
  background: #f5f6fa;
  position: absolute;

  .main-body {
    max-width: calc(1320px + 16px * 2);
    margin: 0 auto;
    display: flex;
    min-height: 100%;
    padding: 0 16px;
    flex-direction: column;
  }
  .main-header {
    margin-bottom: 20px;
  }

  .main-footer {
    margin-top: 20px;
  }
`;

const DefaultLayout = ({ component: Component, ...Props }) => (
  <StyledWrap className="main-wrapper">
    <Header className="main-header" />
    <div className="main-body">
      <Component {...Props} />
    </div>
  </StyledWrap>
);

DefaultLayout.propTypes = {
  component: PropTypes.func,
};

export default DefaultLayout;
