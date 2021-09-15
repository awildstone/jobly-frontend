import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ApplyButton from './ApplyButton';

/** 
 * Renders a JobCard component and ApplyButton.
 * 
 * @returns JobCard & ApplyButton
 */

const JobCard = ({ job }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          margin: '20px',
        },
        details: {
          display: 'flex',
          flexDirection: 'column',
        },
        content: {
          width: '400px',
        },
        apply: {
          float: 'right',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        },
      }));

    const classes = useStyles();

    return(
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
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
                </CardContent>
            </div>
            <div className={classes.apply}>
              <ApplyButton jobId={job.id} />
            </div>
        </Card>
    );
}

export default JobCard;