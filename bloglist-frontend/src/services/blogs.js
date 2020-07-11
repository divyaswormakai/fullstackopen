import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postBlog = async (data, header, setNotification) => {
  console.log(data, header);
  const response = await axios.post(baseUrl, data, header);
  console.log(response.data);
  if (response.data.error) {
    setNotification(`error ${response.data.error}`);
  } else {
    setNotification(
      `a new blog ${response.data.title} by ${response.data.author} added`
    );
  }
  return response.data;
};

export default { getAll, postBlog };
