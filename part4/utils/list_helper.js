const lodash = require('lodash/collection');

const dummy = (blogs) => {
  return 1;
};

const likeCount = (blogs) => {
  const reducer = (sum, blogs) => {
    return sum + blogs.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoutireBlog = (blogs) => {
  let favBlog = blogs.reduce((max, game) =>
    max.likes > game.likes ? max : game
  );
  //getting certain parts of the object only
  let parts = (({ title, author, likes }) => ({ title, author, likes }))(
    favBlog
  );
  console.log(parts);
  return parts;
};

const mostBlogs = (blogs) => {
  let authorsCountObj = [];
  blogs.map((blog) => {
    let list = authorsCountObj.filter((obj) => obj.author == blog.author);
    if (list.length === 0) {
      //add the author
      authorsCountObj.push({ author: blog.author, blogs: 1 });
    } else {
      //add 1 to author blogs
      list[0].blogs += 1;
    }
  });
  console.log(authorsCountObj);
  //find the maximum blog writer

  let maxWriter = authorsCountObj.reduce((max, writerDetails) =>
    max.blogs > writerDetails.blogs ? max : writerDetails
  );
  return maxWriter;
};

const mostBlogsLodash = (blogs) => {
  //counting by properrty
  let authorsCountObj = lodash.countBy(blogs, 'author');
  //{ 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 }
  let temp = Object.entries(authorsCountObj);
  let maxWriter = temp.reduce((max, writerDetails) =>
    max[1] > writerDetails[1] ? max : writerDetails
  );

  return {
    author: maxWriter[0],
    blogs: maxWriter[1],
  };
};

module.exports = {
  dummy,
  likeCount,
  favoutireBlog,
  mostBlogs,
  mostBlogsLodash,
};
