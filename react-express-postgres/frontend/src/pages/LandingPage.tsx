import './LandingPage.css';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useAuthService } from 'keycloak';
import { PageLayout } from 'layouts';
import React from 'react';

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
                    color: '#ff4742',
                    fontWeight: 600,
                  }}
                >
                  Develop Applications Faster
                </Typography>
                <Typography variant="h5">LaunchPad Project</Typography>
                <Button
                  className="btn"
                  style={{ maxWidth: '150px' }}
                  onClick={() => (window.location.href = getLoginURL())}
                >
                  Login with IDIR
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </PageLayout>
      </Box>
    </Stack>
  );
};

export default LandingPage;
