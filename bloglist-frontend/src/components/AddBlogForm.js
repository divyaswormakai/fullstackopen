import React, { useState } from 'react';

const AddBlog = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { title: title, author: author, url: url };
    handleAddBlog(body);
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
