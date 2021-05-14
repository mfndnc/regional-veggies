import axios from 'axios';

const iniURL = process.env.REACT_APP_API || '/api';

const api = axios.create({
  baseURL: `${iniURL}/auth`,
});

export const signup = (payload) => api.post('/signup', payload);
export const login = (payload) => api.post('/login', payload);
export const islogged = () => api.get('/loggedin');
export const logout = () => api.delete('/logout');

export const loggedContext = async (dispatch) => {
  try {
    const resp = await islogged();
    if (resp.data && resp.data.username) {
      dispatch({ ...resp.data, logged: true, error: false });
    } else {
      dispatch({ username: '', logged: false, error: false });
    }
  } catch (err) {
    dispatch({ username: '', logged: false, error: true });
  }
};

const apis = {
  signup,
  login,
  islogged,
  logout,
  loggedContext,
};

export default apis;
