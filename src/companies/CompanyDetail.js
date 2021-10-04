import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/Api';
import JobCard from '../jobs/JobCard';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LoadingMessage from '../common/LoadingMessage';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

/**
 * Renders CompanyDetail from the url params.
 * 
 * @returns CompanyDetail & Jobs.
 */

const CompanyDetail = () => {
    const [ company, setCompany ] = useState({});
    let { handle } = useParams();

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '95%',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#ebd5dd',
          boxShadow: '0 0 0 0',
        },
        content: {
          margin: '20px;',
          padding: '20px;'
        },
      }));

    const classes = useStyles();

    useEffect(() => {
        async function getData() {
            let company = await JoblyApi.getCompany(handle);
            setCompany({...company});
        }
        getData();
    }, [handle]);
   
    if (!company.jobs) {
        return <LoadingMessage />
    }
    
    return (
        <Container className={classes.root}>
            <Paper className={classes.content}>
                <Typography component="h4" variant="h4" color="primary">
                    {company.name}
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                    {company.description}
                </Typography>
                <Typography variant="body1" color="secondary">
                    Number of Employees: {company.numEmployees}
                </Typography>
            </Paper>
            <Typography variant="h6" color="secondary">
                Open Jobs:
            </Typography>
            {company.jobs.map(job => <JobCard key={job.id} job={job} />)}
        </Container>
    );
}

export default CompanyDetail;