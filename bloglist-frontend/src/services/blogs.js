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

const increaseLike = async (data) => {
  console.log(data);
  const updatePath = `${baseUrl}/update/${data.id}`;
  try {
    delete data.id;
    const response = await axios.put(updatePath, data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const deleteBlog = async (data, header) => {
  const deletePath = `${baseUrl}/delete/${data.id}`;
  console.log(header);
  try {
    const response = await axios.delete(deletePath, header);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};
export default { getAll, postBlog, increaseLike, deleteBlog };
