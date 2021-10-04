import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Link as NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const DesktopNav = ({ currentUser, logout }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          marginBottom: '80px;',
        },
        AppBar: {
            backgroundColor: 'primary',
        },
        title: {
          flexGrow: 1,
        },
        navLink: {
            color: 'white',
            '&.active': {
              textDecoration: 'none',
              backgroundColor: '#36172d',
          },
        },
        button: {
          '&.active': {
            backgroundColor: '#36172d',
          },
        },
      }));

    const classes = useStyles();

    const activeUser = () => {
        return (
            <div className={classes.root}>
                <AppBar className={classes.AppBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.navLink} component={NavLink} to="/">
                            Jobly
                        </Link>
                    </Typography>
                    <Button className={classes.button} color="inherit" component={NavLink} to="/companies">
                        Companies
                    </Button>
                    <Button className={classes.button} color="inherit" component={NavLink} to="/jobs">
                        Jobs
                    </Button>
                    <Button className={classes.button} color="inherit" component={NavLink} to="/applications">
                        View Apps
                    </Button>
                    <Button className={classes.button} color="inherit" component={NavLink} to="/profile">
                        Profile
                    </Button>
                    <Button className={classes.button} color="inherit" onClick={logout}>
                        Logout({currentUser.username})
                    </Button>
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
                        <Typography variant="h6" className={classes.title}>
                            <Link className={classes.navLink} component={NavLink} to="/">
                                Jobly
                            </ Link>
                        </Typography>
                        <Button className={classes.button} color="inherit" component={NavLink} to="/login">
                            Login
                        </Button>
                        <Button className={classes.button} color="inherit" component={NavLink} to="/signup">
                            Signup
                        </Button>
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

export default DesktopNav;