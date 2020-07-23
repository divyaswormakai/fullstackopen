import React from 'react';
import { connect } from 'react-redux';
import { FilterChange } from '../reducers/filterReducer';
// import { useDispatch } from 'react-redux';

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.FilterChange(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { FilterChange })(Filter);
