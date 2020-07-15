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
<<<<<<< HEAD
      <div style={hideWhenVisible} className="default-blog">
        <div className="blog-title-author">
          {blog.title}
          <button onClick={handleToggle} className="show-details-btn">
            Show Details
          </button>
        </div>
      </div>
      <div style={showWhenVisible} className="expanded-blog">
        <div className="blog-title-author">
          {blog.title},&nbsp;{blog.author} &nbsp; &nbsp;
          <button onClick={handleToggle} className="hide-details-btn">
            Hide Details
          </button>
        </div>
        <div className="blog-likes">
          Likes: <span>{blog.likes}</span>&nbsp;&nbsp;
          <button
            onClick={() => increaseLike(blog)}
            className="increase-like-btn"
          >
            Like
          </button>
=======
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
>>>>>>> 76fee3fb094422f9d68f9fe9c816de69558d767b
        </div>
        <div className="blog-url">
          <p>{blog.url}</p>
        </div>
<<<<<<< HEAD
        <button onClick={() => deleteBlog(blog)} className="delete-blog-btn">
          Delete
        </button>
=======
        <button onClick={() => deleteBlog(blog)}>Delete</button>
>>>>>>> 76fee3fb094422f9d68f9fe9c816de69558d767b
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
