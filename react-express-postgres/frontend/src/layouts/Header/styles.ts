const sx = {
  headerContainer: {
    border: 'solid',
    borderColor: 'header.border',
    borderWidth: '0px 0px 0.3vh 0px',
    minHeight: '6.5vh',
  },
  appBar: {
    maxWidth: '1096px',
    margin: 'auto',
  },
  logoBox: {
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
  },
  smallScreenToolbar: {
    flexGrow: 1,
    display: { xs: 'flex', md: 'none' },
    alignItems: 'center',
  },
  largeScreenToolbar: {
    flexGrow: 1,
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
  },
};

export default sx;
