import { Box, Typography } from '@mui/material';
import React from 'react';

const sx = {
  footer: {
    backgroundColor: 'footer.main',
    color: '#fff',
    height: '6.5vh !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontSize: '12px',
  },
  footerInner: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1048px',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
};

const Footer = () => (
  <Box sx={sx.footer}>
    <Box sx={sx.footerInner}>
      <Typography variant="h6">LaunchPad Project by Brady Mitchell</Typography>
    </Box>
  </Box>
);

export default Footer;
