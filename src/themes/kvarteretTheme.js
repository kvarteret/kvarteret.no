import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

let lightTheme = createMuiTheme({
  typography: {
    fontFamily: 'Hegval Display',
    fontSize: 12,
    h1: {
      fontSize: 60,
      wordBreak: 'break-word',
      fontWeight: 'bolder',
    },
    h2: {
      fontSize: 40,
      fontWeight: 500,
    },
    h3: {
      fontSize: 26,
      fontWeight: 500,
    },
    h6: {
      fontSize: 18,
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#f54b4b',
    },
    action: {
      hover: '#F54B4B;',
    },
    text: {
      secondary: '#000',
    },
  },
})
lightTheme = responsiveFontSizes(lightTheme)

let darkTheme = createMuiTheme({
  typography: {
    fontFamily: 'Hegval Display',
    fontSize: 12,
    h1: {
      fontSize: 60,
      color: '#ffffff',
    },
    h2: {
      fontWeight: 500,
      fontSize: 40,
      color: '#ffffff',
    },
    h3: {
      fontSize: 26,
      fontWeight: 500,
      color: '#ffffff',
    },
    h6: {
      color: '#fff',
      textTransform: 'uppercase',
      fontSize: 14,
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#fff',
    },
    action: {
      hover: '#F54B4B;',
    },
    divider: '#707070',
    text: { secondary: '#929292' },
  },
})
darkTheme = responsiveFontSizes(darkTheme)

export { lightTheme, darkTheme }
