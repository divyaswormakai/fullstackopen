import userService from '../services/userService';

const userDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL': {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers();
    console.log(users);
    dispatch({
      type: 'GET_ALL',
      data: users,
    });
  };
};

export default userDetailsReducer;
