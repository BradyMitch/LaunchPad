import { useAuthService } from '@bcgov/keycloak-react';
import {
  DataObject as DataObjectIcon,
  ErrorOutline as ErrorIcon,
  KeyboardArrowDown as DownIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import ProjectLogo from 'assets/ProjectLogo.png';
import { InitialsAvatar } from 'components';
import React, { MouseEvent, useState } from 'react';
import { To, useNavigate } from 'react-router';

import sx from './styles';

const Header = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElUserDropdown, setAnchorElUserDropdown] = useState<HTMLElement | null>(null);
  const [testError, setTestError] = useState(false);
  const { state: authState, getLogoutURL } = useAuthService();
  const configuration = (window as Window).configuration;

  const user = authState.userInfo;

  const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path: To) => () => {
    navigate(path);
  };

  const TestError = () => {
    throw new Error('An error was thrown to test ErrorBoundary.');
    return <></>;
  };

  const LogoAndTitle = () => {
    return (
      <>
        <Box sx={sx.logoBox} onClick={() => handleNavigate('/')}>
          <img src={ProjectLogo} style={{ maxHeight: '23px' }} alt="Logo for the Project" />
        </Box>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          LaunchPad Project
        </Typography>
      </>
    );
  };

  const AccountDropdownMenu = () => {
    return (
      <Menu
        anchorEl={anchorElUserDropdown}
        open={!!anchorElUserDropdown}
        onClose={() => {
          setAnchorElUserDropdown(null);
        }}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        PaperProps={{
          style: {
            transformOrigin: 'left',
            transform: 'translateX(-70px)',
          },
        }}
      >
        <Divider />
        <MenuItem onClick={() => alert(JSON.stringify(configuration))}>
          <ListItemIcon>
            <DataObjectIcon />
          </ListItemIcon>
          <ListItemText>Alert Config</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setTestError(true)}>
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <ListItemText>Test Error</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => (window.location.href = getLogoutURL())}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    );
  };

  return (
    <Box sx={sx.headerContainer}>
      <AppBar position="static" color="transparent" elevation={0} sx={sx.appBar}>
        <Toolbar>
          {/** SMALL SCREEN */}
          <Box sx={sx.smallScreenToolbar}>
            <LogoAndTitle />
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup={true}
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem onClick={handleNavigate('/profile')}>
                    <Typography textAlign="center">
                      {user.given_name}
                      &nbsp;
                      {user.family_name}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              ''
            )}
          </Box>
          {/** LARGE SCREEN */}
          <Box sx={sx.largeScreenToolbar}>
            <LogoAndTitle />
            {user ? (
              <Stack direction="row" spacing={3}>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    backgroundColor: 'transparent !important',
                  }}
                  onClick={(e) => setAnchorElUserDropdown(e.currentTarget)}
                  endIcon={<DownIcon />}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                >
                  <InitialsAvatar />
                  &nbsp; &nbsp;
                  {user.given_name}
                  &nbsp;
                  {user.family_name}
                </Button>
              </Stack>
            ) : (
              ''
            )}
            <AccountDropdownMenu />
          </Box>
        </Toolbar>
      </AppBar>
      {testError && <TestError />}
    </Box>
  );
};

export default Header;
