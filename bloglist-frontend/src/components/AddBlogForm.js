import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

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
          <input
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
          <input
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
          <input
            id="url"
            type="text"
            className="add-blog-url"
            value={url}
            onChange={({ target }) => setURL(target.value)}
            required={true}
          />
        </div>
        <div>
          <button type="submit" className="add-blog-submit-btn">
            Add My Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
