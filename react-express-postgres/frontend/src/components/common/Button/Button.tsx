import { Button as MUIButton, SxProps, Theme } from '@mui/material';
import React, { ReactNode } from 'react';

import { btnSX } from './styles';

interface IButtonProps {
  children: ReactNode | string;
  onClick?: Function;
  sx?: SxProps<Theme>;
}

/**
 * A reusable Button component using MUI's Button.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {ReactNode|string} children - The content to be displayed inside the button.
 * @param {Function} onClick - (optional) The function to be called on button click.
 * @param {SxProps<Theme>} sx - (optional) The custom styles to be applied to the button using MUI's `sx` prop.
 */
const Button = (props: IButtonProps) => {
  const { children, onClick, sx = btnSX } = props;
  return (
    <MUIButton sx={sx} onClick={onClick ? () => onClick() : undefined}>
      {children}
    </MUIButton>
  );
};

export default Button;
