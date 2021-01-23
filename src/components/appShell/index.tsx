import React, { ReactElement, useCallback, useEffect, useState } from 'react';
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
  Collapse,
  SvgIconProps,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountBalance,
  BarChart,
  HowToReg,
  ListAlt,
  Link as LinkIcon,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';

import { useAuth } from '../../hooks/auth';
import logoCentral from '../../assets/centralservidor-logo-texto.png';
import logoPms from '../../assets/LogoPMS.png';
import ToolbarMenu from './ToolbarMenu';
import ScrollTop from './ScrollTop';

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
      logoPms: {
        height: 30,
        marginLeft: spacing(1),
        [breakpoints.up('sm')]: {
          height: 33,
        },
      },
      grow: {
        flexGrow: 1,
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

interface DrawerItems {
  id: number;
  title: string;
  subtitles: string[];
  icon: ReactElement<SvgIconProps>;
}

interface ItemOpens {
  [key: number]: boolean;
}

const drawerItems: DrawerItems[] = [
  {
    id: 1,
    title: 'Declarações',
    subtitles: ['Declaração de Bens', 'Parceiro Econômico'],
    icon: <AccountBalance />,
  },
  {
    id: 2,
    title: 'Avaliações',
    subtitles: ['Avaliação Periódica'],
    icon: <BarChart />,
  },
  {
    id: 3,
    title: 'Recadastramento',
    subtitles: [],
    icon: <HowToReg />,
  },
  {
    id: 4,
    title: 'Formulários',
    subtitles: ['Falta Lei'],
    icon: <ListAlt />,
  },
  {
    id: 5,
    title: 'Links',
    subtitles: [],
    icon: <LinkIcon />,
  },
];

const AppShell: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [itemOpen, setItemOpen] = useState<ItemOpens>({});

  const classes = useStyles();
  const theme = useTheme();
  // eslint-disable-next-line
  const { user } = useAuth();

  const handleDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    Object.keys(itemOpen).forEach((key) => {
      setItemOpen((state) => ({ ...state, [key]: false }));
    });
    setDrawerOpen(false);
  }, [itemOpen]);

  const handleItemOpen = useCallback((item) => {
    const { id, subtitles } = item;

    if (subtitles.length) {
      setDrawerOpen(true);
      setItemOpen((state) => ({ ...state, [id]: !state[id] }));
    }
  }, []);

  if (user) {
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="abre menu lateral"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: drawerOpen,
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
            <ToolbarMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <img
              src={logoPms}
              alt="Logo Prefeitura de Santos"
              className={classes.logoPms}
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
            {drawerItems.map((item: DrawerItems) => (
              <div key={item.id}>
                <ListItem button onClick={() => handleItemOpen(item)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {!!item.subtitles.length &&
                    (itemOpen[item.id] ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
                {!!item.subtitles.length && (
                  <Collapse in={itemOpen[item.id]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subtitles.map((subtitle) => (
                        <ListItem button key={subtitle}>
                          <ListItemText inset primary={subtitle} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} id="back-to-top-anchor" />
          {children}
        </main>
        <ScrollTop />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default AppShell;
