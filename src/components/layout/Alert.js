import React from "react";
import PropTypes from "prop-types";

const Alert = ({ alertState }) => {
  return (
    alertState !== null && (
      <div className={`alert alert-${alertState.type}`}>
        <i className="fas fa-info-circle">{alertState.msg}</i>
      </div>
    )
  );
};

Alert.propTypes = {
  alertState: PropTypes.shape({
    type: PropTypes.string,
    msg: PropTypes.string,
  }),
};

export default Alert;
