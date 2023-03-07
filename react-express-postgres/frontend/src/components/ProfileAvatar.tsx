import { Avatar } from '@mui/material';
import React from 'react';
import { useAuthService } from 'services/auth';

import StringAvatar from './StringAvatar';

interface IProfileAvatar {
  size: string;
}

const ProfileAvatar = (props: IProfileAvatar) => {
  const { size } = props;
  const { state: authState } = useAuthService();
  const user = authState.userInfo;

  switch (size) {
    case 'large':
      // LARGE AVATAR
      return (
        <Avatar
          alt="Profile Photo"
          {...StringAvatar({
            name: user?.given_name + ' ' + user?.family_name,
            size: '100px',
            fontSize: '3rem',
          })}
        />
      );
    default:
      // SMALL AVATAR (DEFAULT)
      return (
        <Avatar
          alt="Profile Photo"
          {...StringAvatar({
            name: user?.given_name + ' ' + user?.family_name,
            size: '35px',
            fontSize: '1.25rem',
          })}
        />
      );
  }
};

export default ProfileAvatar;
