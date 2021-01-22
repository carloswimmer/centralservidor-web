import React from 'react';
import {
  createStyles,
  Fab,
  makeStyles,
  Theme,
  useScrollTrigger,
  Zoom,
} from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: spacing(2),
      right: spacing(2),
    },
  }),
);

const ScrollTop: React.FC = () => {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        <Fab color="secondary" size="small" aria-label="volta ao topo">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
};

export default ScrollTop;
