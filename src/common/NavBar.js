import React, { useContext } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserContext from '../context/UserContext';

/**
 * Renders a NavBar conditionally for an activeUser or noUser.
 * 
 * Consumes currentUser context.
 * 
 * Props: logout function to log out the currentUser.
 */

const NavBar = ({ logout }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          marginBottom: '80px;',
        },
        AppBar: {
            backgroundColor: 'primary',
        },
        menuButton: {
          marginRight: theme.spacing(2),
          "&.active": {
            textDecoration: 'none',
            backgroundColor:'black',
          },
        },
        title: {
          flexGrow: 1,
        },
        navLink: {
            color: 'white',
            "&.active": {
              textDecoration: 'none',
          },
        },
        button: {
          "&.active": {
              background: '#36172d',
          },
        },
      }));

    const classes = useStyles();
    const { currentUser } = useContext(UserContext);

    const activeUser = () => {
      return (
        <div className={classes.root}>
          <AppBar className={classes.AppBar}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <Link className={classes.navLink} component={NavLink} to="/">Jobly</ Link>
              </Typography>
              <Button className={classes.button} color="inherit" component={NavLink} to="/companies">Companies</Button>
              <Button className={classes.button} color="inherit" component={NavLink} to="/jobs">Jobs</Button>
              <Button className={classes.button} color="inherit" component={NavLink} to="/applications">View Apps</Button>
              <Button className={classes.button} color="inherit" component={NavLink} to="/profile">Profile</Button>
              <Button className={classes.button} color="inherit" onClick={logout}>Logout({currentUser.username})</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
    }

    const noUser = () => {
      return (
        <div className={classes.root}>
        <AppBar className={classes.AppBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.navLink} component={NavLink} to="/">Jobly</ Link>
            </Typography>
            <Button className={classes.button} color="inherit" component={NavLink} to="/login">Login</Button>
            <Button className={classes.button} color="inherit" component={NavLink} to="/signup">Signup</Button>
          </Toolbar>
        </AppBar>
      </div>
      );
    }

    if (!currentUser) {
      return noUser();
    } else {
      return activeUser();
    }
};

export default NavBar;