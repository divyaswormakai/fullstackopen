import blogService from './../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS': {
      return action.data;
    }
    case 'ADD_BLOG': {
      return [action.data, ...state];
    }
    case 'INCREASE_LIKE': {
      const updatedBlog = action.data;
      console.log(updatedBlog);
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    }
    case 'DELETE_BLOG': {
      const newBlogList = state.filter((blog) => blog.id !== action.data.id);
      return newBlogList;
    }
    default: {
      return state;
    }
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => {
      return b.likes - a.likes;
    });
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs,
    });
  };
};

export const addBlog = (blog, header) => {
  return async (dispatch) => {
    await blogService.postBlog(blog, header);
    //set notification with notification reducer
    dispatch({
      type: 'ADD_BLOG',
      data: blog,
    });
  };
};

export const increaseLikeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.increaseLike(updatedBlog);
    updatedBlog.id = blog.id;

    dispatch({
      type: 'INCREASE_LIKE',
      data: updatedBlog,
    });
  };
};

export const deleteBlog = (blog, header) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog, header);
    dispatch({
      type: 'DELETE_BLOG',
      data: blog,
    });
  };
};

export default blogReducer;
