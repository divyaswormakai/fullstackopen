import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Toggalable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  //useImperative Hande hook will make the functions returned from the component accessible to all
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        {props.title}&nbsp;
        <Button onClick={toggleVisibility} variant="contained">
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="toggalableContent">
        {props.children}
        <Button onClick={toggleVisibility} variant="outlined" color="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
});

Toggalable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggalable;
