import React from 'react';
import UpdateProfileForm from '../forms/UpdateProfileForm';
import '../App.css';
import Typography from '@material-ui/core/Typography';
// import { useTheme } from '@material-ui/core/styles';

/**
 * Renders a Profile page component.
 * 
 * @returns UpdateProfileForm
 */

const Profile = () => {
    // const theme = useTheme();

    return(
        <div className="formContainer">
            <Typography component="h4" variant="h4" color="primary">
                Profile
            </Typography>
            <UpdateProfileForm />
        </div>
    );
}

export default Profile;