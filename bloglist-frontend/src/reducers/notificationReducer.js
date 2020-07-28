const notificationReducer = (state = '', action) => {
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

export const setNotification = (notification, timeout) => {
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
        notification: '',
      });
    }, timeout * 1000);
  };
};

export default notificationReducer;
