import React from 'react';
import '../App.css';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

/**
 * Renders a Landing page Component.
 * 
 * @returns Landing
 */

const Landing = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            textAlign: 'center',
            padding: '10% 0 10%',
        },
        buttons: {
            display: 'flex',
            justifyContent: 'center',
        },
      }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box pb={2}>
                <Typography p={4} component="h2" variant="h2" color="primary">
                    Jobly
                </Typography>
            </Box>
            <Typography variant="body1" color="primary">
                All the jobs in one, convenient place.
            </Typography>
            <div className={classes.buttons}>
                <Box m={1}>
                    <Button variant="contained" color="primary" component={RouterLink} to="/login">Login</Button>
                </Box>
                <Box m={1}>
                    <Button variant="contained" color="primary" component={RouterLink} to="/signup">Signup</Button>
                </Box>
            </div>
        </div>
    );
}

export default Landing;