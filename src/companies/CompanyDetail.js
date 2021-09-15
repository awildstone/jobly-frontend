import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/Api';
import JobCard from '../jobs/JobCard';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoadingMessage from '../common/LoadingMessage';

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
          width: '60%',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#ebd5dd',
          boxShadow: '0 0 0 0',
        },
        content: {
          flex: '1 0 auto',
          margin: '40px;',
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
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Box pb={2}>
                    <Typography component="h4" variant="h4" color="primary">
                        {company.name}
                    </Typography>
                </Box>
                <Box pb={2}>
                    <Typography variant="subtitle1" color="secondary">
                        {company.description}
                    </Typography>
                    <Typography variant="body1" color="secondary">
                        Number of Employees: {company.numEmployees}
                    </Typography>
                </Box>
                <Typography variant="h6" color="secondary">
                    Open Jobs:
                </Typography>
                {company.jobs.map(job => <JobCard key={job.id} job={job} />)}
            </CardContent>
        </Card>
    );
}

export default CompanyDetail;