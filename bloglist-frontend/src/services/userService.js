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

const getSingleUser = async (id) => {
  try {
    const getUrl = `${baseUrl}/${id}`;
    const response = await axios.get(getUrl);
    return response.data;
  } catch (err) {
    return null;
  }
};

export default { getAllUsers, getSingleUser };
