import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

/**
 * Render a FormAlert Component.
 * 
 * @returns FormAlert
 */

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }));

const FormAlert = ({ severity, color, message }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert severity={severity} color={color}>{ message }</Alert>
        </div>
    );
};

export default FormAlert;