import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { TextField, Button } from '@material-ui/core';

const AddBlog = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title: title, author: author, url: url, likes: 0 };
    const header = {
      headers: { Authorization: localStorage.getItem('userToken') },
    };
    await dispatch(addBlog(body, header));
    await dispatch(setNotification('New blog has been added', 5));
    handleAddBlog();
  };

  return (
    <div>
      <h2>Add a Blog</h2>
      <form onSubmit={handleSubmit} className="add-blog-form">
        <div>
          Title:
          <TextField
            id="title"
            type="text"
            className="add-blog-title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required={true}
          />
        </div>
        <div>
          Author:
          <TextField
            id="author"
            type="text"
            className="add-blog-author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required={true}
          />
        </div>
        <div>
          URL:
          <TextField
            id="url"
            type="text"
            className="add-blog-url"
            value={url}
            onChange={({ target }) => setURL(target.value)}
            required={true}
          />
        </div>
        <div>
          <Button
            type="submit"
            className="add-blog-submit-btn"
            variant="contained"
          >
            Add My Blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
