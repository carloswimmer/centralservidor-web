import {
  makeStyles,
  SimplePaletteColorOptions,
} from '@material-ui/core/styles';

import signInBackground from '../../assets/people-working.jpg';

interface ThemeProps {
  backgroundGridColor: SimplePaletteColorOptions;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: ({ backgroundGridColor }: ThemeProps) =>
      backgroundGridColor.light,
    color: ({ backgroundGridColor }: ThemeProps) =>
      backgroundGridColor.contrastText,
  },

  contentClass: {
    height: '100vh',
    maxWidth: 600,
  },

  header: {
    flex: 1,
    height: 279,
    backgroundColor: ({ backgroundGridColor }: ThemeProps) =>
      backgroundGridColor.main,
    '& img': {
      width: 370,
    },
  },

  formHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 14,
    marginTop: 40,
    '& img': {
      width: 48,
      marginRight: 6,
    },
  },
  formHeaderText: {
    maxWidth: 270,
    marginBottom: 36,
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',

    '& .MuiTextField-root': {
      marginTop: 4,
      marginBottom: 24,
      width: 343,
    },
    '& .MuiFilledInput-root': {
      backgroundColor: 'rgba(230, 241, 225, 0.7)',
    },
    '& .MuiFilledInput-root:hover': {
      backgroundColor: 'rgba(230, 241, 225, 0.6)',
    },
    '& .MuiInputBase-root': {
      color: 'rgba(0, 0, 0, 0.56)',
    },
  },
  formButton: {
    width: 343,
    marginTop: 8,
    marginBottom: 56,

    '& button': {
      height: 48,
    },
  },

  backgroundClass: {
    position: 'relative',
    flex: 1,
    background: `url(${signInBackground}) no-repeat center`,
    backgroundSize: 'cover',

    '&:after': {
      position: 'absolute',
      content: '""',
      height: '100vh',
      width: '100%',
      top: 0,
      left: 0,
      background:
        'linear-gradient(to right, rgba(4, 44, 30, 0.6) 20%, rgba(53, 6, 124, 0.6) 100%)',
    },
  },

  logoPms: {
    position: 'absolute',
    top: 56,
    right: 64,

    '& img': {
      width: 176,
    },
  },

  copyright: {
    display: 'flex',
    position: 'absolute',
    bottom: 40,
    right: 64,
    opacity: 0.6,
  },
});

export default useStyles;
