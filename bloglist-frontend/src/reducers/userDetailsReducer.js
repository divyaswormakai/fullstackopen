import userService from '../services/userService';

const userDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL': {
      return action.data;
    }
    case 'GET_SINGLE_BLOG': {
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
    dispatch({
      type: 'GET_ALL',
      data: users,
    });
  };
};

export const getSingleUser = (id) => {
  return async (dispatch) => {
    const user = await userService.getSingleUser(id);
    dispatch({
      type: 'GET_SINGLE_BLOG',
      data: user,
    });
  };
};

export default userDetailsReducer;
