import { Avatar } from '@mui/material';
import { useAuthService } from 'keycloak';
import React from 'react';
import stringToColor from 'utils/stringToColor';

interface IInitialsAvatar {
  size?: 'small' | 'large';
}

/**
 * Displays a user's initials as an avatar.
 * @param {('small'|'large')} size - (optional, default = 'small') The size of the avatar.
 */
const InitialsAvatar = (props: IInitialsAvatar) => {
  const { size = 'small' } = props;
  const { state: authState } = useAuthService();

  const user = authState.userInfo;
  const name = user ? `${user?.given_name} ${user?.family_name}` : '';
  const children = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;

  return (
    <Avatar
      alt="Profile Photo"
      sx={{
        bgcolor: stringToColor(name) ?? 'var(--orange)',
        height: size === 'small' ? '35px' : '100px',
        width: size === 'small' ? '35px' : '100px',
        fontSize: size === 'small' ? '1.25rem' : '3rem',
      }}
    >
      {children}
    </Avatar>
  );
};

export default InitialsAvatar;
