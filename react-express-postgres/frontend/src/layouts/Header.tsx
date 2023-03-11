import {
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
import { ProfileAvatar } from 'components';
import { useAuthService } from 'keycloak';
import { MouseEvent, useState } from 'react';
import React from 'react';
import { To, useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElUserDropdown, setAnchorElUserDropdown] = useState<HTMLElement | null>(null);
  const { state: authState, getLogoutURL } = useAuthService();

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

  return (
    <Box
      sx={{
        border: 'solid',
        borderColor: 'header.border',
        borderWidth: '0px 0px 0.3vh 0px',
        minHeight: '6.5vh',
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          maxWidth: '1096px',
          margin: 'auto',
        }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'header.border',
                borderRadius: '10px',
                height: '50px !important',
                width: '50px !important',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                marginRight: '1rem',
                cursor: 'pointer',
              }}
              onClick={() => handleNavigate('/')}
            >
              <img src={ProjectLogo} style={{ maxHeight: '23px' }} alt="Logo for the Project" />
            </Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
              LaunchPad Project
            </Typography>
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
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'header.border',
                borderRadius: '10px',
                height: '50px',
                width: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                marginRight: '1rem',
                cursor: 'pointer',
              }}
              onClick={() => handleNavigate('/')}
            >
              <img src={ProjectLogo} style={{ maxHeight: '23px' }} alt="Logo for the Project" />
            </Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
              LaunchPad Project
            </Typography>
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
                  <ProfileAvatar size="small" />
                  &nbsp; &nbsp;
                  {user.given_name}
                  &nbsp;
                  {user.family_name}
                </Button>
              </Stack>
            ) : (
              ''
            )}
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
                  transform: 'translateX(-100px)',
                },
              }}
            >
              <Divider />
              <MenuItem onClick={() => (window.location.href = getLogoutURL())}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
