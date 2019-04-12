import React from "react";
import PropTypes from "prop-types";
import WebSocket from "ws";

function ConnectionButton({ onClick, status }) {
  return status == WebSocket.CLOSED ? (
    <button className="button is-danger" onClick={onClick}>
      Connect
    </button>
  ) : (
    <button className="button is-success" onClick={onClick}>
      Disconnect
    </button>
  );
}

ConnectionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired
};

export default ConnectionButton;
