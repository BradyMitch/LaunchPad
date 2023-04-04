import { Box, Stack, Typography } from '@mui/material';
import { Button } from 'components/common';
import React, { Component, ErrorInfo, ReactNode } from 'react';

import Notify from './Notify';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | string;
  context: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  notifyOpen: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '', notifyOpen: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ errorMessage: error.message, notifyOpen: true });
    console.error(error, info);
  }

  handleClose = () => {
    this.setState({ notifyOpen: false });
  };

  render() {
    if (this.state.hasError) {
      // Render fallback component.
      if (this.props.fallback) {
        return (
          <>
            {this.props.fallback}
            <Notify
              type="error"
              message={this.state.errorMessage}
              open={this.state.notifyOpen}
              onClose={this.handleClose}
            />
          </>
        );
      } else {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack
              spacing={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '50%',
              }}
            >
              <Box
                sx={{
                  bgcolor: 'var(--error-bg)',
                  borderLeft: 'solid 10px var(--fc-error)',
                  padding: '10px',
                  height: 'fit-content',
                }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1}>
                    <Typography
                      sx={{
                        color: 'var(--fc-error-title)',
                        fontWeight: 'var(--bold)',
                      }}
                    >
                      Error caught in ErrorBoundary:
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--fc-error-title)',
                        fontFamily: 'Arial, sans-serif',
                      }}
                    >
                      {this.props.context}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: 'var(--fc-error)' }}>
                    {this.state.errorMessage}
                  </Typography>
                </Stack>
              </Box>
              <Button onClick={() => (window.location.href = '/')}>RETURN TO HOME</Button>
            </Stack>
            <Notify
              type="error"
              message={this.state.errorMessage}
              open={this.state.notifyOpen}
              onClose={this.handleClose}
            />
          </Box>
        );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
