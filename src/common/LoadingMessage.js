import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

/**
 * Renders a LoadingMessage.
 */

const LoadingMessage = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: 'center',
      padding: '10% 0 10%',
    },
  }));

  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Typography p={4} component="h2" variant="h2" color="primary">
        Loading
      </Typography>
      <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default LoadingMessage;