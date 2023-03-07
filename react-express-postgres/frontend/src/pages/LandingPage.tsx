import './LandingPage.css';

import { Box, Grid, Stack, Typography } from '@mui/material';
import { PageLayout } from 'layouts';
import React from 'react';
import { useAuthService } from 'services/auth';

const LandingPage = () => {
  const { getLoginURL } = useAuthService();

  return (
    <Stack className="landing-page">
      <Box className="landing-page__section">
        <PageLayout>
          <Grid container justifyContent="space-between" alignItems="center" gap={2}>
            <Grid item xs={12} sm={10}>
              <Stack gap={2}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: '3rem',
                    color: '#bf0a55',
                    fontWeight: 600,
                  }}
                >
                  Develop Applications Faster
                </Typography>
                <Typography variant="h5">LaunchPad Project</Typography>
                <a className="btn btn__primary" style={{ maxWidth: '150px' }} href={getLoginURL()}>
                  Login with IDIR
                </a>
              </Stack>
            </Grid>
          </Grid>
        </PageLayout>
      </Box>
    </Stack>
  );
};

export default LandingPage;
