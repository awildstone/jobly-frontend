import React, {useState, useEffect, useContext } from 'react';
import JoblyApi from '../api/Api';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoadingMessage from '../common/LoadingMessage';
import UserContext from '../context/UserContext';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

/** ApplicationsList
 * 
 * Renders a list of Company names and Jobs the current user has applied to.
 * 
 *  Consumes currentUser context.
 *  Updates and holds jobs data in state.
 * 
*/

const ApplicationsList = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
          },
          paper: {
            margin: theme.spacing(2),
            textAlign: 'center',
          },
          job: {
            paddingTop: '16px',
            textAlign: 'center',
            height: '70px',
          },
          company: {
            paddingTop: '16px',
            textAlign: 'center',
            height: '70px',
          },
      }));

    const classes = useStyles();
    const { currentUser } = useContext(UserContext);
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        async function getJobs() {
            const jobIds = currentUser.applications;

            const jobs = await Promise.all(jobIds.map(async (id) => {
                return await JoblyApi.getJobData(id);
            }));

            setJobs(jobs);
        }
        getJobs();
    }, [currentUser.applications]);
   
    if (!jobs.length) {
        return <LoadingMessage />
    }
    
    return (
        <Container maxWidth="md" p={2}>
            <Box p={4}>
                <Typography component="h4" variant="h4" color="primary" className={classes.paper}>
                   Applications for {currentUser.firstName} {currentUser.lastName}
                </Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h6" color="secondary" className={classes.paper}>
                        Company Name
                    </Typography>
                    { jobs.map( (job, i) => (
                        <Paper key={i} className={classes.paper}>
                            <Typography className={classes.company} key={job.id} variant="body1"color="primary">
                                {job.company.name}
                            </Typography>
                        </Paper>
                     ))}
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="secondary" className={classes.paper}>
                        Job Details
                    </Typography>
                    { jobs.map( (job, i) => (
                        <Paper key={i} className={classes.paper}>
                            <Box className={classes.job}>
                                <Typography key={job.title} variant="body1"color="primary">
                                    Title: {job.title}
                                </Typography>
                                <Typography key={job.salary} variant="body1"color="primary">
                                    Salary: {job.salary}
                                </Typography>
                            </Box>
                        </Paper>
                     ))}
                </Grid>
            </Grid>
        </Container>
    );
}

export default ApplicationsList;