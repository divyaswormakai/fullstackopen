import React, { useState } from 'react';
import blogService from '../services/blogs';

const AddBlog = ({ userToken, setNewBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title: title, author: author, url: url };
    const header = { headers: { Authorization: userToken } };
    await blogService.postBlog(body, header);
    const blogs = await blogService.getAll();
    setNewBlogs(blogs);
  };

  return (
    <div>
      <h2>Add a Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required={true}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required={true}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setURL(target.value)}
            required={true}
          />
        </div>
        <div>
          <button type="submit">Add My Blog</button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
