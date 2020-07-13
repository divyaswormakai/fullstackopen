import React, { useState } from 'react';
import PropTypes from 'prop-types';
const Blog = ({ blog, increaseLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const handleToggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <div className="blog-title-author">
          {blog.title},&nbsp;{blog.author} &nbsp; &nbsp;
          <button onClick={handleToggle}>Show Details</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div className="blog-title-author">
          {blog.title},&nbsp;{blog.author} &nbsp; &nbsp;
          <button onClick={handleToggle}>Show Details</button>
        </div>
        <div className="blog-likes">
          Likes: {blog.likes}&nbsp;&nbsp;
          <button onClick={() => increaseLike(blog)}>Like</button>
        </div>
        <div className="blog-url">
          <p>{blog.url}</p>
        </div>
        <button onClick={() => deleteBlog(blog)}>Delete</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};
export default Blog;
