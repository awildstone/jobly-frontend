import React, { useContext } from 'react';
import '../App.css';
import UserContext from '../context/UserContext';
import Greeting from './Greeting';
import Landing from './Landing';

/**
 * Renders a Home page Component.
 * 
 * Consumes currentUser UserContext.
 * Conditionally Renders a Greeting or Landing message
 * based on currentUser status.
 * 
 * @returns Greeting or Landing
 */

const Home = () => {
    const { currentUser } = useContext(UserContext);

    if (currentUser) {
        return <Greeting firstName={currentUser.firstName} lastName={currentUser.lastName} />
    }
    return <Landing />
}

export default Home;