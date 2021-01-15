import React from 'react';
import { Button as MuiButton, ButtonProps } from '@material-ui/core';

interface MuiButtonProps extends ButtonProps {
  text: string;
}

const Button: React.FC<MuiButtonProps> = (props) => {
  const { text, size, color, variant, onClick, ...others } = props;

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size}
      color={color}
      onClick={onClick}
      {...others}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
