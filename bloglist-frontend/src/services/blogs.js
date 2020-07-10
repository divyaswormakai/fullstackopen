import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postBlog = async (data, header) => {
  console.log(data, header);
  const response = await axios.post(baseUrl, data, header);
  console.log(response.data);
  return response.data;
};

export default { getAll, postBlog };
