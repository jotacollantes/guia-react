import { createTheme } from '@mui/material/styles';



export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#040e37',
    },
    secondary: {
      main: '#f50057',
    },
    info:{
      main:'#FFF'
    },
    // background: {
    //   default: 'rgba(189,189,189,0.6)',
    // },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#040e37',
          height: 60
        },
      }
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600
        },
        h2: {
          fontSize: 20,
          fontWeight: 400
        },
        h3: {
          fontSize: 15,
          fontWeight: 400
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600
        }
      }
    },


    MuiButton: {
      defaultProps: {
        variant: 'outlined',
        size: 'large',
        disableElevation: true,
        color:'info'
      },
      styleOverrides: {
        root: {
          // backgroundColor: 'white',
          // color:'black',
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ":hover": {
            backgroundColor: 'rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease-in-out'
          }
        }
      }
    },


    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '5px',
        }
      }
    }
    
  }
});