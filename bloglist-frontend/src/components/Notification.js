import React from 'react';
import './styles/Notification.css';

import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const errornotifDOM = () => (
    <>
      <Alert severity="error">
        <p>{notification.replace('error', '')}</p>
      </Alert>
    </>
  );
  const successnotifDOM = () => {
    if (notification.length > 0) {
      return (
        <>
          <Alert severity="success">
            <p>{notification}</p>
          </Alert>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>{notification.includes('error') ? errornotifDOM() : successnotifDOM()}</>
  );
};

export default Notification;
