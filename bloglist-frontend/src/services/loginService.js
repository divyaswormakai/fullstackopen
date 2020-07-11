import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

const login = async (body, setNotification) => {
  console.log(body);
  try {
    const response = await axios.post(baseUrl, body);
    console.log(response.data);
    setNotification(`Successfully logged in ${response.data.username}`);

    return response.data;
  } catch (err) {
    setNotification(`error ${err.response.data.error}`);
    return null;
  }
};
export default { login };
