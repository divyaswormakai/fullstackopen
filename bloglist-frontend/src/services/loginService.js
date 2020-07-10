import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

const login = async (body) => {
  console.log(body);
  const response = await axios.post(baseUrl, body);
  console.log(response.data);
  return response.data;
};
export default { login };
