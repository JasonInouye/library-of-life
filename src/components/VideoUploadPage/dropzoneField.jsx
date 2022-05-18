import React from "react";
import PropTypes from "prop-types";
import DropZone from "react-dropzone-uploader";
import ImagePreview from "./imagePreview";
import Placeholder from "./placeholder";
import ShowError from "./showError";

const DropZoneField = ({
  handleOnDrop,
  input,
  imagefile,
  label,
  meta: { error, touched }
}) => (
  <div className="preview-container">
    <DropZone
      accept="image/jpeg, image/png, image/gif, image/bmp"
      className="upload-container"
      onDrop={handleOnDrop}
      onChange={file => input.onChange(file)}
    >
      {imagefile && imagefile.length > 0 ? (
        <ImagePreview imagefile={imagefile} />
      ) : (
        <Placeholder error={error} touched={touched} />
      )}
    </DropZone>
    {touched && error && <ShowError error={error} />}
  </div>
);

DropZoneField.propTypes = {
  handleOnDrop: PropTypes.func.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.shape({
      preview: PropTypes.string
    })
  }),
  imagefile: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  label: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string
};

export default DropZoneField;
