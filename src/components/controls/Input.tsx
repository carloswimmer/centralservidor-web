import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useDarkMode } from '../../hooks/darkMode';

const Input: React.FC<TextFieldProps> = (props) => {
  const {
    name,
    label,
    variant,
    value,
    onChange,
    onBlur,
    error,
    helperText,
    InputProps,
    ...others
  } = props;

  const { darkMode } = useDarkMode();

  return (
    <TextField
      variant={variant || 'outlined'}
      fullWidth
      label={label}
      name={name}
      value={value}
      color={darkMode ? 'secondary' : 'primary'}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputProps={InputProps}
      {...others}
    />
  );
};

export default Input;
