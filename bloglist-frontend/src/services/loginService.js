import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

const login = async (body) => {
  console.log(body);
  try {
    const response = await axios.post(baseUrl, body);

    return response.data;
  } catch (err) {
    return null;
  }
};
export default { login };
