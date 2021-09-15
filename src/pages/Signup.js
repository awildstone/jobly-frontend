import React from 'react';
import SignupForm from '../forms/SignupForm';
import '../App.css';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

/**
 * Renders a Signup page component.
 * 
 * @param {signup} function
 * @returns SignupForm
 */

const Signup = ({ signup }) => {
    const theme = useTheme();

    return(
        <div className="formContainer"> 
            <Typography component="h4" variant="h4" color="primary">
                Signup
            </Typography>
            <SignupForm signup={signup} />
        </div>
    );
}

export default Signup;