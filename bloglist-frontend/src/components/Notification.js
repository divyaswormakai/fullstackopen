import React from 'react';
import './styles/Notification.css';

import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const errornotifDOM = () => (
    <>
      <div className="errorNotif">
        <p>{notification.replace('error', '')}</p>
      </div>
    </>
  );
  const successnotifDOM = () => {
    if (notification.length > 0) {
      return (
        <>
          <div className="successNotif">
            <p>{notification}</p>
          </div>
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
