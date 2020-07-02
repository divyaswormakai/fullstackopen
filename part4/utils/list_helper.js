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

module.exports = {
  dummy,
  likeCount,
  favoutireBlog,
};
