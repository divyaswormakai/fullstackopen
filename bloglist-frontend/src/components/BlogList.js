import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      {blogs.map((blog) => (
        <div key={'Blog' + blog.id} className="blog-row">
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </>
  );
};

export default BlogList;
