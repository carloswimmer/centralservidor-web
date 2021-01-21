import React, { useState } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@material-ui/core';
import {
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountBalance,
  BarChart,
  HowToReg,
  ListAlt,
  Link as LinkIcon,
  NightsStay,
  WbSunny,
  PowerSettingsNew,
  More as MoreIcon,
} from '@material-ui/icons';

import { useAuth } from '../hooks/auth';
import logoCentral from '../assets/centralservidor-logo-texto.png';
import logoPms from '../assets/LogoPMS.png';
import { useDarkMode } from '../hooks/darkMode';

const routes = [
  { title: 'Declarações', icon: <AccountBalance /> },
  { title: 'Avaliações', icon: <BarChart /> },
  { title: 'Recadastramento', icon: <HowToReg /> },
  { title: 'Formulários', icon: <ListAlt /> },
  { title: 'Links', icon: <LinkIcon /> },
];

const mobileMenuId = 'primary-search-account-menu-mobile';

const drawerWidth = 256;

const useStyles = makeStyles(
  ({ zIndex, transitions, palette, spacing, breakpoints, mixins }: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      appBar: {
        zIndex: zIndex.drawer + 1,
        transition: transitions.create(['width', 'margin'], {
          easing: transitions.easing.sharp,
          duration: transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: transitions.create(['width', 'margin'], {
          easing: transitions.easing.sharp,
          duration: transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: spacing(0.5),
        [breakpoints.up('sm')]: {
          marginRight: spacing(2),
        },
      },
      logoCentral: {
        height: 44,
        [breakpoints.up('sm')]: {
          height: 50,
        },
      },
      grow: {
        flexGrow: 1,
      },
      sectionDesktop: {
        display: 'none',
        [breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [breakpoints.up('md')]: {
          display: 'none',
        },
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiSvgIcon-root': {
          color: palette.type === 'dark' ? '' : palette.primary.contrastText,
        },
      },
      drawerOpen: {
        backgroundColor: palette.type === 'dark' ? '' : palette.primary.light,
        color: palette.type === 'dark' ? '' : palette.primary.contrastText,
        width: drawerWidth,
        transition: transitions.create('width', {
          easing: transitions.easing.sharp,
          duration: transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        backgroundColor: palette.type === 'dark' ? '' : palette.primary.light,
        color: palette.type === 'dark' ? '' : palette.primary.contrastText,
        transition: transitions.create('width', {
          easing: transitions.easing.sharp,
          duration: transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0,
        [breakpoints.up('sm')]: {
          width: spacing(7) + 1,
        },
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing(0, 1),
        // necessary for content to be below app bar
        ...mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: spacing(3),
      },
    }),
);

const Navigation: React.FC = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const theme = useTheme();
  // eslint-disable-next-line
  const { user, signOut } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  if (user) {
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <img
              src={logoCentral}
              alt="Logo Central do Servidor"
              className={classes.logoCentral}
            />
            <div className={classes.grow} />
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
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <img
              src={logoPms}
              alt="Logo Prefeitura de Santos"
              style={{ marginLeft: theme.spacing(1) }}
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {routes.map((item) => (
              <ListItem button key={item.title}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Navigation;
