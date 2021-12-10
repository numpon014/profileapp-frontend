import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { alertActions } from './action';

export function alertBox({ alert, onClose }) {
  return (
    <>
      {alert.message && (
        <Alert
          className={`alert ${alert.type}`}
          onClose={() => onClose()}
          dismissible
        >
          {alert.message}
        </Alert>
      )}
    </>
  );
}

alertBox.propTypes = {
  alert: PropTypes.object,
  onClose: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onClose() {
    dispatch(alertActions.clear());
  },
});

const mapStateToProps = state => ({
  alert: state.alert,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(alertBox);
