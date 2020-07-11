import React, { useState } from 'react';
import blogs from '../services/blogs';
const Blog = ({ blog }) => {
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
          {blogs.likes}
          <button>Like</button>
        </div>
        <p>{blog.likes}</p>
      </div>
    </div>
  );
};
export default Blog;
