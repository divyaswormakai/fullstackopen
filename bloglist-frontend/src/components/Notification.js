import React from 'react';
import './styles/Notification.css';

const Notification = ({ notification }) => {
  const errornotifDOM = () => (
    <>
      <div className="errorNotif">
        <p>{notification.replace('error', '')}</p>
      </div>
    </>
  );
  const successnotifDOM = () => (
    <>
      <div className="successNotif">
        <p>{notification}</p>
      </div>
    </>
  );

  console.log(notification);
  return (
    <>{notification.includes('error') ? errornotifDOM() : successnotifDOM()}</>
  );
};

export default Notification;
