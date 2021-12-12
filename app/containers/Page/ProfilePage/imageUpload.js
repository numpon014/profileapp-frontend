import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Image } from 'react-bootstrap';
import {
  faCheck,
  faBuilding,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateExperienceCompanyLogo } from 'shares/actions/experiences';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

const StyledWrapper = styled.div`
  padding-top: 5px;

  label {
    width: 100%;
  }

  .company-logo-placeholder {
    text-align: center;
    cursor: pointer;
    span {
      display: block;
      font-size: 12px;
    }
  }

  .text-center {
    font-size: 10px;
  }

  .upload-button {
    padding: 0;
  }

  .fa-check {
    color: #000;
  }
`;

function ImageUpload({ experienceId, imageUrl, onSaveLogo, intl }) {
  const [image, setImage] = useState({ preview: '', raw: '' });
  const [showUploadButton, setShowUploadButton] = useState(false);

  useEffect(() => {
    setImage({
      preview: imageUrl,
      raw: '',
    });
  }, []);

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setShowUploadButton(true);
    }
  };

  const handleCancel = () => {
    setImage({
      preview: imageUrl,
      raw: '',
    });
    setShowUploadButton(false);
  };

  const handleUpload = async e => {
    e.preventDefault();

    onSaveLogo(
      experienceId,
      image.raw,
      intl.formatMessage({ id: 'loginPage.form.result.fail.message' }),
      () => {
        setShowUploadButton(false);
      },
    );
  };

  return (
    <StyledWrapper className="image-uploader">
      <form>
        <label htmlFor={`upload-button-${experienceId}`}>
          {image.preview ? (
            <Image
              src={image.preview}
              alt="company logo: click to change logo"
              title="click to change logo"
              width="90"
              height="90"
              rounded
            />
          ) : (
            <div
              className="company-logo-placeholder"
              title="Click to upload company logo"
            >
              <FontAwesomeIcon icon={faBuilding} />
              <span>Company logo</span>
            </div>
          )}
        </label>
        <input
          type="file"
          id={`upload-button-${experienceId}`}
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        {showUploadButton && (
          <>
            <Button
              variant="link"
              onClick={handleUpload}
              className="upload-button"
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button
              variant="link"
              onClick={handleCancel}
              className="cancel-upload-button"
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </>
        )}
      </form>
    </StyledWrapper>
  );
}

ImageUpload.propTypes = {
  experienceId: PropTypes.number,
  imageUrl: PropTypes.string,
  onSaveLogo: PropTypes.func,
  intl: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  onSaveLogo(id, rawImage, failMessage, callback) {
    dispatch(updateExperienceCompanyLogo(id, rawImage, failMessage, callback));
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
)(ImageUpload);
