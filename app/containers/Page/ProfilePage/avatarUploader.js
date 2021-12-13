import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Image } from 'react-bootstrap';
import {
  faCheck,
  faUserAstronaut,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { updateUserAvatar } from '../../../shares/actions/users';

const StyledWrapper = styled.div`
  padding-top: 5px;

  label {
    width: 100%;
  }

  .avatar-placeholder {
    margin: 0 auto;
    padding: 20px 0;
    cursor: pointer;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 1px solid #9fa8b9;
    span {
      display: block;
      text-align: center;
      font-size: 12px;
    }
  }

  .text-center {
    font-size: 10px;
  }

  .upload-button {
    padding: 0;
  }

  .fa-check,
  .fa-times {
    color: #000;
  }
  .action-buttons {
    text-align: center;
  }
`;

function AvatarUploader({ userId, imageUrl, upload, intl }) {
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

    upload(userId, image.raw, () => {
      setShowUploadButton(false);
    });
  };

  return (
    <StyledWrapper className="image-uploader">
      <form>
        <label htmlFor={`upload-button-${userId}`}>
          {image.preview ? (
            <Image
              src={image.preview}
              alt={intl.formatMessage({
                id: 'profilePage.form.field.avatar.change.label',
              })}
              title={intl.formatMessage({
                id: 'profilePage.form.field.avatar.change.label',
              })}
              width="90"
              height="90"
              roundedCircle
            />
          ) : (
            <div
              className="avatar-placeholder"
              title={intl.formatMessage({
                id: 'profilePage.form.field.avatar.upload.label',
              })}
            >
              <FontAwesomeIcon icon={faUserAstronaut} className="fa-2x" />
              <span>Avatar</span>
            </div>
          )}
        </label>
        <input
          type="file"
          id={`upload-button-${userId}`}
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        {showUploadButton && (
          <div className="action-buttons">
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
          </div>
        )}
      </form>
    </StyledWrapper>
  );
}

AvatarUploader.propTypes = {
  userId: PropTypes.number,
  imageUrl: PropTypes.string,
  upload: PropTypes.func,
  intl: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  upload(id, rawImage, callback) {
    dispatch(updateUserAvatar(id, rawImage, callback));
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
)(AvatarUploader);
