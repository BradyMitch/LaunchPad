import { useAuthService } from '@bcgov/keycloak-react';
import { Avatar } from '@mui/material';
import React from 'react';
import stringToColor from 'utils/stringToColor';

interface IInitialsAvatar {
  size?: 'small' | 'large';
  testid?: string;
}

/**
 * Displays a user's initials as an avatar.
 * @param {IInitialsAvatar} props
 * @param {('small'|'large')} props.size - (optional, default = 'small') The size of the avatar.
 * @param {string} props.testid - (optional) An identifier for testing frameworks.
 */
const InitialsAvatar = (props: IInitialsAvatar) => {
  const { size = 'small', testid } = props;
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
      data-testid={testid}
    >
      {children}
    </Avatar>
  );
};

export default InitialsAvatar;
