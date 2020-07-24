import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (ev) => {
    setValue(ev.target.value);
  };

  const onReset = (ev) => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    onReset,
  };
};
