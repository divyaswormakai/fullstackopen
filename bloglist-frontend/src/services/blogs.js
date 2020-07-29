import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSingleBlog = async (id) => {
  const getUrl = `${baseUrl}/${id}`;
  const response = await axios.get(getUrl);
  return response.data;
};

const postBlog = async (data, header) => {
  const response = await axios.post(baseUrl, data, header);

  return response.data;
};

const postComment = async (comment, id) => {
  const postUrl = `${baseUrl}/${id}/comment`;
  console.log(postUrl);
  const response = await axios.post(postUrl, comment);
  return response.data;
};

const increaseLike = async (data) => {
  const updatePath = `${baseUrl}/update/${data.id}`;
  try {
    delete data.id;
    const response = await axios.put(updatePath, data);
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
export default {
  getAll,
  getSingleBlog,
  postBlog,
  increaseLike,
  deleteBlog,
  postComment,
};
