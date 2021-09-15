import React, {useState, useEffect} from 'react';
import JobCard from './JobCard';
import SearchForm from '../forms/SearchForm';
import JoblyApi from '../api/Api';
import '../App.css';
import LoadingMessage from '../common/LoadingMessage';

/**
 * Renders a JobsList component and SearchForm.
 * 
 * Handles and filters Job data from SearchForm queries, othewise
 * dislays all Jobs data when unfiltered.
 *
 * @returns List of JobCards
 */

const JobsList = () => {
    const [ jobs, setJobs ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    
    useEffect(() => {
        async function getData() {
            let jobs = await JoblyApi.getJobs();
            setJobs([...jobs]);
            setIsLoading(false);
        }
        getData();
    }, []);

    const handleSearch = (searchTerm) => {
        async function getData() {
            let jobs = await JoblyApi.findJobs(searchTerm);
            setJobs([...jobs]);
        }
        getData();
    };

    if (!isLoading) {
        return (
            <>
                <SearchForm handleSubmit={handleSearch} />
                    { jobs.length ? 
                        <div className="jobsContainer">
                            {jobs.map( job => <JobCard key={job.id} job={job} /> )}
                        </div>
                    :
                        <div className='container'>Sorry, there are no results for this search.</div>
                    }
            </>
        );
    }
    return <LoadingMessage />
}

export default JobsList;