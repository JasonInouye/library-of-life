import React from "react";
import PropTypes from "prop-types";
import { MdInfoOutline } from "react-icons/md";

const ShowError = ({ error }) => (
  <div className="error">
    <MdInfoOutline style={{ position: "relative", top: -2, marginRight: 2 }} />
    {error}
  </div>
);

ShowError.propTypes = {
  error: PropTypes.string.isRequired
};

export default ShowError;