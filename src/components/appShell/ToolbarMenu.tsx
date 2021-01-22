import React, { useCallback, useState } from 'react';
import {
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
} from '@material-ui/core';
import {
  WbSunny,
  NightsStay,
  PowerSettingsNew,
  MoreVert as MoreIcon,
} from '@material-ui/icons';
import { useDarkMode } from '../../hooks/darkMode';
import { useAuth } from '../../hooks/auth';

const useStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    sectionDesktop: {
      display: 'none',
      [breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      marginRight: spacing(-1.5),
      [breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

const ToolbarMenu: React.FC = () => {
  const classes = useStyles();
  const { toggleDarkMode, darkMode } = useDarkMode();
  const { signOut } = useAuth();
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMoreAnchorEl(null);
  }, []);

  const handleMobileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget);
    },
    [],
  );

  const mobileMenuId = 'more-mobile-menu';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={toggleDarkMode}>
        <IconButton aria-label="muda cores para tema escuro" color="inherit">
          {darkMode ? <WbSunny /> : <NightsStay />}
        </IconButton>
        {darkMode ? <p>Claro</p> : <p>Escuro</p>}
      </MenuItem>
      <MenuItem onClick={signOut}>
        <IconButton aria-label="sai da aplicação" color="inherit">
          <PowerSettingsNew />
        </IconButton>
        <p>Sair</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.sectionDesktop}>
        <IconButton
          aria-label="muda cores para tema escuro"
          color="inherit"
          onClick={toggleDarkMode}
        >
          {darkMode ? <WbSunny /> : <NightsStay />}
        </IconButton>
        <IconButton
          edge="end"
          aria-label="sai da aplicação"
          onClick={signOut}
          color="inherit"
        >
          <PowerSettingsNew />
        </IconButton>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="mostra mais opções"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
      {renderMobileMenu}
    </>
  );
};

export default ToolbarMenu;
