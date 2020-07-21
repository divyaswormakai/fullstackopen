import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const updateAnecdote = async (anecdote) => {
  const path = `${baseUrl}/${anecdote.id}`;
  console.log(path);
  const response = await axios.put(path, anecdote);
  return response.data;
};

export default {
  getAll,
  createNew,
  updateAnecdote,
};
