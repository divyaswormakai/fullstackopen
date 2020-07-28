import loginService from '../services/loginService';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_USER': {
      return action.data;
    }
    case 'LOGIN': {
      return action.data;
    }
    case 'LOGOUT': {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export const InitializeUser = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('userToken');
    const username = localStorage.getItem('username');

    const userData = {
      token,
      username,
    };
    dispatch({
      type: 'INITIALIZE_USER',
      data: userData,
    });
  };
};
export const LoginInFromReducer = (body) => {
  return async (dispatch) => {
    const tokens = await loginService.login(body);

    if (tokens !== null) {
      const tokenFull = `bearer ${tokens.token}`;
      localStorage.setItem('userToken', tokenFull);
      localStorage.setItem('username', tokens.username);
      const userData = {
        token: tokenFull,
        username: tokens.username,
      };

      dispatch({
        type: 'LOGIN',
        data: userData,
      });
    }
  };
};

export const LogOutFromReducer = () => {
  return async (dispatch) => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    const userData = {
      token: null,
      username: null,
    };
    dispatch({
      type: 'LOGOUT',
      data: userData,
    });
  };
};

export default userReducer;
