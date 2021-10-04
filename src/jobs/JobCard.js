import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ApplyButton from './ApplyButton';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

/** 
 * Renders a JobCard component and ApplyButton.
 * 
 * @returns JobCard & ApplyButton
 */

const JobCard = ({ job }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          margin: '20px',
        },
        content: {
          padding: '20px',
        },
      }));

    const classes = useStyles();

    return(
      <Container className={classes.root}>
        <Paper className={classes.content}>
          <Typography component="h5" variant="h5" color="primary">
            {job.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {job.companyName}
          </Typography>
          <Typography variant="body1" color="secondary">
            Salary: {job.salary}
          </Typography>
          <Typography variant="body1" color="secondary">
            Equity: {job.equity}
          </Typography>
          <ApplyButton jobId={job.id} />
        </Paper>
      </Container>
    );
}

export default JobCard;