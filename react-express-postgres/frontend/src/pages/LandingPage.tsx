import './LandingPage.css';

import { Box, Grid, Stack, Typography } from '@mui/material';
import { Button } from 'components/common';
import { useAuthService } from 'keycloak';
import { PageLayout } from 'layouts';
import React from 'react';

const LandingPage = () => {
  const { state: authState, getLoginURL } = useAuthService();
  const user = authState.userInfo;

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
                    color: '#ff4742',
                    fontWeight: 600,
                  }}
                >
                  Develop Applications Faster
                </Typography>
                <Typography variant="h5">LaunchPad Project</Typography>
                {!user && (
                  <Button onClick={() => (window.location.href = getLoginURL())}>
                    LOGIN WITH IDIR
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </PageLayout>
      </Box>
    </Stack>
  );
};

export default LandingPage;
