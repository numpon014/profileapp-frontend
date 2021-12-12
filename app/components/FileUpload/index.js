import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

function FileUploader({ onFileSelectSuccess, onFileSelectError }) {
  const fileInput = useRef(null);

  const handleFileInput = e => {
    const file = e.target.files[0];
    if (file.size > 2097152)
      onFileSelectError({ error: 'File size cannot exceed more than 2MB' });
    else onFileSelectSuccess(file);
  };

  return (
    <div className="file-uploader">
      <Form.Control type="file" onChange={handleFileInput} />
      <Button onClick={() => fileInput.current && fileInput.current.click()} />
    </div>
  );
}

FileUploader.propTypes = {
  onFileSelectSuccess: PropTypes.func,
  onFileSelectError: PropTypes.func,
};

export default FileUploader;
