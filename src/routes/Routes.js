import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail';
import JobsList from '../jobs/JobsList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import ApplicationsList from '../applications/ApplicationsList';

/**
 * Renders application Routes.
 * 
 * @param {signup, login} function 
 * @returns Routes & ProtectedRoutes
 */

const Routes = ({ signup, login }) => {
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `signup=${typeof signup}`,
    );
    return (
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            
            <Route exact path='/login'>
                <Login login={login} />
            </Route>

            <Route exact path='/signup'>
                <Signup signup={signup} />
            </Route>

            <ProtectedRoute exact path='/applications'>
                <ApplicationsList />
            </ProtectedRoute>

            <ProtectedRoute exact path='/companies'>
                <CompanyList />
            </ProtectedRoute>

            <ProtectedRoute exact path='/companies/:handle'>
                <CompanyDetail />
            </ProtectedRoute>

            <ProtectedRoute exact path='/jobs'>
                <JobsList />
            </ProtectedRoute>

            <ProtectedRoute exact path='/profile'>
                <Profile />
            </ProtectedRoute>

            <Redirect to='/' />
        </Switch>
    );
};

export default Routes;