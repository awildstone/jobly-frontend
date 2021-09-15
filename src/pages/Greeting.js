import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Renders a Greeting page component.
 * 
 * @param {firstName, lastName} 
 * @returns Greeting
 */

const Greeting = ({ firstName, lastName }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            textAlign: 'center',
            padding: '10% 0 10%',
        }
      }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box pb={2}>
                <Typography p={4} component="h2" variant="h2" color="primary">
                    Jobly
                </Typography>
            </Box>
            <Box pb={2}>
                <Typography variant="body1" color="primary">
                    All the jobs in one, convenient place.
                </Typography>
            </Box>
            <Typography variant="h6" color="secondary">
                Welcome back, {firstName} {lastName}!
            </Typography>
        </div>
    );
}

export default Greeting;