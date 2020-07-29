import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, Redirect } from 'react-router-dom';

import { getSingleBlog } from '../reducers/blogReducer';
import {
  increaseLikeBlog,
  deleteBlog,
  postComment,
} from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

import { Link, useHistory } from 'react-router-dom';

const Blog = () => {
  const blogID = useParams().id;
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs[0]);
  const history = useHistory();

  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(getSingleBlog(blogID));
  }, [dispatch, blogID]);

  const increaseLike = async (blog) => {
    await dispatch(increaseLikeBlog(blog));
    await dispatch(setNotification(`Liked: ${blog.title}.`, 5));
  };

  const deleteBlogFunc = async (blog) => {
    console.log(blog);
    const header = {
      headers: { Authorization: localStorage.getItem('userToken') },
    };

    if (
      window.confirm(
        `Do you really want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      history.push('/');
      await dispatch(deleteBlog(blog, header));
      await dispatch(setNotification(`Deleted: ${blog.title}.`, 5));
    }
  };

  const addComment = async (ev) => {
    ev.preventDefault();

    console.log(comment);
    await dispatch(postComment({ comment }, blog.id));
  };

  return (
    <div>
      {blog !== undefined ? (
        <div className="expanded-blog">
          <div className="blog-title-author">
            <h1>{blog.title}</h1>
            <h5>
              <i>{blog.author}</i>
            </h5>
          </div>
          <div className="blog-url">
            <p>
              Learn more here:<Link to={blog.url}>{blog.url}</Link>
            </p>
          </div>
          <div className="blog-likes">
            Likes: <span>{blog.likes}</span>&nbsp;&nbsp;
          </div>
          <div>
            <button
              onClick={() => increaseLike(blog)}
              className="increase-like-btn"
            >
              Like
            </button>
            <button
              onClick={() => deleteBlogFunc(blog)}
              className="delete-blog-btn"
            >
              Delete
            </button>
          </div>
          <div className="blog-add-comment">
            <form onSubmit={addComment}>
              <div>
                <input
                  type="text"
                  value={comment}
                  name="comment"
                  className="comment"
                  onChange={({ target }) => setComment(target.value)}
                />
                <button type="submit">Add This Comment</button>
              </div>
            </form>
          </div>
          <div className="blog-comments">
            <h2>Comments:</h2>
            {blog.comments.map((comment, ind) => {
              return <li key={`Comment${ind}`}>{comment}</li>;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
