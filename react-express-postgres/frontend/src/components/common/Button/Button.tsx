import { Button as MUIButton, SxProps, Theme } from '@mui/material';
import React, { ReactNode } from 'react';

import { btnSX } from './styles';

interface IButtonProps {
  children: ReactNode | string;
  onClick?: Function;
  sx?: SxProps<Theme>;
  testid?: string;
}

/**
 * A reusable Button component using MUI's Button.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {IButtonProps} props
 * @param {ReactNode|string} props.children - The content to be displayed inside the button.
 * @param {Function} props.onClick - (optional) The function to be called on button click.
 * @param {SxProps<Theme>} props.sx - (optional) The custom styles to be applied to the button using MUI's `sx` prop.
 * @param {string} props.testid - (optional) An identifier for testing frameworks.
 */
const Button = (props: IButtonProps) => {
  const { children, onClick, sx = {}, testid } = props;
  return (
    <MUIButton
      data-testid={testid}
      sx={Object.assign({}, btnSX, sx)}
      onClick={onClick ? () => onClick() : undefined}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
