import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ThemeProvider } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { withAuthenticator } from 'aws-amplify-react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ListItemLink } from './components/list-item-link.component';
import { amplifyTheme } from './theme/amplify.theme';
import { Auth } from './services/amplify.service';
import { muiTheme } from './theme/mui.theme';

export interface UserAttributes {
  email: string;
  name: string;
}

const App: React.FC = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<UserAttributes>();

  React.useEffect((): void => {
    (async function getCurrentAuthenticatedUser(): Promise<void> {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      setUser(user.attributes);
    })();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLogoutClick = (): Promise<any> => {
    return Auth.signOut();
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={(): void => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">iVoy CMR</Typography>
            </Toolbar>
          </AppBar>

          <SwipeableDrawer
            open={open}
            onClose={(): void => setOpen(false)}
            onOpen={(): void => setOpen(true)}
          >
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              onClick={(): void => setOpen(false)}
            >
              <ListItemLink to="/" primary="Dashboard" icon={<HomeIcon />} />
              <ListItemLink
                to="/packages"
                primary="Paquetes"
                icon={<AllInboxIcon />}
              />
              <ListItemLink
                to="/routes"
                primary="Rutas"
                icon={<LinearScaleIcon />}
              />

              <ListItem button onClick={(): Promise<void> => onLogoutClick()}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItem>
            </List>
          </SwipeableDrawer>

          <Container>
            <Switch>
              <Route exact path="/">
                <h2>Home</h2>
              </Route>

              <Route path="/packages">
                <h2>Paquetes</h2>
              </Route>

              <Route path="/routes">
                <h2>Rutas</h2>
              </Route>
            </Switch>
          </Container>
        </>
      </Router>
    </ThemeProvider>
  );
};

export default withAuthenticator(App, false, undefined, false, amplifyTheme);