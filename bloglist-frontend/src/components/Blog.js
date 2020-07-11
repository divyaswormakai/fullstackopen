import React, { useState } from 'react';
const Blog = ({ blog, increaseLike }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const handleToggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} &nbsp;
        <button onClick={handleToggle}>Show Details</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} &nbsp;
        <button onClick={handleToggle}>Hide Details</button>
        <p>{blog.author}</p>
        <div>
          Likes: {blog.likes}&nbsp;&nbsp;
          <button onClick={() => increaseLike(blog)}>Like</button>
        </div>
        <p>{blog.url}</p>
      </div>
    </div>
  );
};
export default Blog;
