import React from 'react';
import LoginForm from '../forms/LoginForm';
import '../App.css';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

/**
 * Renders a Login page component.
 * 
 * @param {login} function
 * @returns LoginForm
 */

const Login = ({ login }) => {
    const theme = useTheme();

    return (
        <div className="formContainer"> 
            <Typography component="h4" variant="h4" color="primary">
                Login
            </Typography>
            <LoginForm login={login} />
        </div>
    );
}

export default Login;