import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import './styles/BlogList.css';

import {
  TableContainer,
  Paper,
  TableRow,
  Table,
  TableCell,
} from '@material-ui/core';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          {blogs.map((blog) => (
            <TableRow key={'Blog' + blog.id}>
              <TableCell className="blog-row">
                <Link to={`/blog/${blog.id}`} className="blog-row">
                  {blog.title}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </>
  );
};

export default BlogList;
