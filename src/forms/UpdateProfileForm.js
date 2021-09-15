import React, { useState, useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserContext from '../context/UserContext';
import JoblyApi from '../api/Api';
import FormAlert from './FormAlert';

/** 
 * Renders a UpdateProfileForm Component.
 * 
 * Handles form update and submission data.
 * 
 * @returns UpdateProfileForm
 * */

const UpdateProfileForm = () => {
  
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
      alignItems: 'center',
      padding: theme.spacing(2), 
      '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '80%',
      backgroundColor: '#ffffff',
      },
    },
      formBG: {
        borderRadius: '20px',
        border: '1px solid',
      },
  }));

  const classes = useStyles();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      password: ''
  });
  const [formErrors, setFormErrors] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (evt) => {
    setFormData(data => ({...data, [evt.target.name]: evt.target.value}));
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
    };
    const username = currentUser.username;
    let updatedUser;

    try {
        updatedUser = await JoblyApi.updateUser(username, userData);
    } catch (err) {
        setUpdateSuccess(false);
        setFormErrors(err);
        return;
    }
    setFormData(data => ({...data, password: ''}));
    setUpdateSuccess(true);
    setFormErrors([]);
    setCurrentUser(updatedUser);
  };

  return(
    <div className={classes.formBG}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Typography variant="h6">
            Username 
        </Typography>
        <Typography>
            {currentUser.username} 
        </Typography>
        <TextField 
          placeholder={formData.firstName}
          margin="normal"
          variant="outlined"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required />
        <TextField 
          placeholder={formData.lastName}
          margin="normal"
          variant="outlined"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required />
        <TextField 
          placeholder={formData.email}
          margin="normal"
          variant="outlined"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required />
        <TextField 
          placeholder="current-password"
          margin="normal"
          variant="outlined"
          label="Confirm password to make changes:"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required />
        { formErrors ? 
          formErrors.map((e, i) => <FormAlert key={i} severity="error" color="error" message={e} />)
          : null }
         { updateSuccess ?
          <FormAlert key='1' severity="success" color="success" message='Profile updated successfully!' />
          : null } 
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;