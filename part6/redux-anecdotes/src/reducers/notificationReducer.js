const notificationReducer = (state = 'This is notification', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.notification;
    }
    default: {
      return state;
    }
  }
};

let clearNotif = null;

export const SetNotification = (notification, timeout) => {
  return async (dispatch) => {
    if (clearNotif !== null) {
      clearInterval(clearNotif);
    }
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });
    clearNotif = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'No new notification',
      });
    }, timeout * 1000);
  };
};

// //clear previous timeout and set timer for 5 seconds
// clearInterval(clearNotificationTimer);

export default notificationReducer;
