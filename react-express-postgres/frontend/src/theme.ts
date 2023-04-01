import { createTheme } from '@mui/material/styles';

interface IThemeConfig {
  palette: any;
  typography: any;
}

const themeConfig: IThemeConfig = {
  palette: {
    header: {
      main: '#ffffff',
      border: '#ebebeb',
    },
    footer: {
      main: '#3c3c3c',
    },
    fontColor: {
      white: '#fff',
      black: '#000',
    },
  },
  typography: {
    fontFamily: ['Arial', 'sans-serif'],
  },
};

const theme = createTheme(themeConfig);

export default theme;
