import {
  makeStyles,
  SimplePaletteColorOptions,
} from '@material-ui/core/styles';

interface Props {
  customColor: SimplePaletteColorOptions;
}

const useStyles = makeStyles({
  root: {
    borderRadius: 21,
    marginTop: 16,
    backgroundColor: ({ customColor }: Props) => customColor.main,
    color: ({ customColor }: Props) => customColor.contrastText,
  },
});

export default useStyles;
