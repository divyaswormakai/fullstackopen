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
      <form onSubmit={handleSubmit} className="add-blog-form">
        <div>
          Title:
          <input
            id="title"
            type="text"
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
