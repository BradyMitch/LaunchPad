import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface ILoadingProps {
  pageLayout?: boolean;
}

// Reusable loading spinner component.
const Loading = (props: ILoadingProps) => {
  const { pageLayout = false } = props;

  const sx = pageLayout
    ? {
        display: 'flex',
        width: '100%',
        height: '84.65vh',
        justifyContent: 'center',
        alignItems: 'center',
      }
    : { display: 'flex', justifyContent: 'center', alignItems: 'center' };

  return (
    <Box sx={sx}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
