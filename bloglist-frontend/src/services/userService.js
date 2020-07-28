import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/users';

const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    return null;
  }
};

export default { getAllUsers };
