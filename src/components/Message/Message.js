import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

const Message = props =>
  <div className="component-message">{ props.messageText }</div>

Message.propTypes = {
  messageText: PropTypes.string.isRequired
};

export default Message;
