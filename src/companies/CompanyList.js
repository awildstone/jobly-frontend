import React, {useState, useEffect} from 'react';
import CompanyCard from './CompanyCard';
import SearchForm from '../forms/SearchForm';
import JoblyApi from '../api/Api';
import '../App.css';
import LoadingMessage from '../common/LoadingMessage';

/**
 * Renders CompanyList of all Company data.
 * 
 * Filters Company data via SearchForm query.
 * 
 * @returns SearchForm & List of CompanyCards.
 */

const CompanyList = () => {
    const [ companies, setCompanies ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        async function getData() {
            let companies = await JoblyApi.getCompanies();
            setCompanies([...companies]);
            setIsLoading(false);
        }
        getData();
    }, []);

    const handleSearch = (searchTerm) => {
        async function getData() {
            let companies = await JoblyApi.findCompanies(searchTerm);
            setCompanies([...companies]);
        }
        getData();
    };

    if (!isLoading) {
        return <>
                <SearchForm handleSubmit={handleSearch} />
                    { companies.length ? 
                        companies.map(company => <CompanyCard key={company.handle} company={company} />) 
                    : 
                        <div className='container'>Sorry, there are no results for this search.</div>
                    }
                </>
    }
    return <LoadingMessage />
}

export default CompanyList;