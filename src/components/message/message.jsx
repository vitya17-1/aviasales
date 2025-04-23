import React from 'react';
import PropTypes from 'prop-types';

import getMessageByErrorCode from '../../utils/utils';

import styles from './message.module.scss';

function Message({ type, message, errorCode = null }) {
  let messageClass = '';
  const errorMessage = getMessageByErrorCode(errorCode);

  switch (type) {
    case 'error':
      messageClass = styles.error;
      break;
    case 'info':
      messageClass = styles.info;
      break;
    default:
      messageClass = styles.default;
      break;
  }

  return (
    <div className={messageClass}>{errorCode ? errorMessage : message}</div>
  );
}

Message.propTypes = {
  type: PropTypes.oneOf(['error', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  errorCode: PropTypes.number,
};

export default Message;
