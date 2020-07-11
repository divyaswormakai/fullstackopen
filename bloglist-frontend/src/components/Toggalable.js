import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

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
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

Toggalable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggalable;
