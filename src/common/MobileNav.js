import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem } from "@material-ui/core";
import { Link as NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CancelIcon from '@material-ui/icons/Cancel';

const MobileNav = ({ currentUser, logout }) => {

    const useStyles = makeStyles((theme)=>({
        root: {
            flexGrow: 1,
            marginBottom: '80px;',
          },
          AppBar: {
              backgroundColor: 'primary',
          },
          menuButton: {
            marginRight: theme.spacing(2),
            '&:active': {
              textDecoration: 'none',
            },
          },
        link: {
            textDecoration: 'none',
            color: 'primary',
            fontSize: '20px',
            '&:hover': {
                color: 'secondary',
                fontWeight: 'bold',
                textDecoration: 'none',
            },
        },
    }));

    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    const activeUser = () => {
        return (
            <div className={classes.root}>
                <AppBar className={classes.AppBar}>
                    <Toolbar>
                        <IconButton onClick={() => setOpenDrawer(!openDrawer)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                            <List>
                                <ListItem onClick={() => setOpenDrawer(false)}>
                                    <Typography variant="h6">
                                        <Link className={classes.link} component={NavLink} to="/">
                                            Jobly
                                        </ Link>
                                    </Typography>
                                </ListItem>
                                <ListItem onClick={() => setOpenDrawer(false)}>
                                    <Link className={classes.link} color="inherit" component={NavLink} to="/companies">
                                        Companies
                                    </Link>
                                </ListItem>
                                <ListItem onClick={() => setOpenDrawer(false)}>
                                    <Link className={classes.link} color="inherit" component={NavLink} to="/jobs">
                                        Jobs
                                    </Link>
                                </ListItem>
                                <ListItem onClick={() => setOpenDrawer(false)}>
                                    <Link className={classes.link} color="inherit" component={NavLink} to="/applications">
                                        View Apps
                                    </Link>
                                </ListItem>
                                <ListItem onClick={() => setOpenDrawer(false)}>
                                    <Link className={classes.link} color="inherit" component={NavLink} to="/profile">
                                        Profile
                                    </Link>
                                </ListItem>
                                <ListItem onClick={() => setOpenDrawer(false)}>
                                    <Link className={classes.link} color="inherit" onClick={logout}>
                                        Logout({currentUser.username})
                                    </Link>
                                </ListItem>
                                <ListItem onClick={() => setOpenDrawer(false)}>
                                    <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
                                        <CancelIcon />
                                    </IconButton>
                                </ListItem>
                            </List>
                        </Drawer>
                    </Toolbar>
                </AppBar>
            </div>
        );
    };

    const noUser = () => {
        return (
            <div className={classes.root}>
                <AppBar className={classes.AppBar}>
                    <Toolbar>
                        <IconButton onClick={() => setOpenDrawer(!openDrawer)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                        <List>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <Typography variant="h6">
                                    <Link className={classes.link} component={NavLink} to="/">
                                        Jobly
                                    </ Link>
                                </Typography>
                            </ListItem>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <Link className={classes.link} color="inherit" component={NavLink} to="/login">
                                    Login
                                </Link>
                            </ListItem>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <Link className={classes.link} color="inherit" component={NavLink} to="/signup">
                                    Signup
                                </Link>
                            </ListItem>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                    <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
                                        <CancelIcon />
                                    </IconButton>
                            </ListItem>
                        </List>
                        </Drawer>
                    </Toolbar>
                </AppBar>
            </div>
        );
    };

    if (!currentUser) {
        return noUser();
      } else {
        return activeUser();
    }
}
export default MobileNav;