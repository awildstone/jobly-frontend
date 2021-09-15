import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import FormAlert from '../forms/FormAlert';

/** 
 * Renders a SignupForm Component.
 * 
 * Handles form update and submission data.
 * 
 * Params: signup function to handle form submit data.
 * 
 * @returns SignupForm
 * */

const SignupForm = ({ signup }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
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
  const history = useHistory();
  const [formData, setFormData] = useState({ 
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState([]);

  /** Update formData in state when changes occur. */

  const handleChange = (evt) => {
    setFormData(data => ({...data, [evt.target.name]: evt.target.value}));
  };

  /** Pass formData to the App component to handle, and redirect the user to the welcome page. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push('/companies');
    } else {
      setFormErrors(result.err);
    }
  };

  return(
    <div className={classes.formBG}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField 
          placeholder="Username"
          margin="normal"
          variant="outlined"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required />
        <TextField 
          placeholder="your-password"
          margin="normal"
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required />
        <TextField 
          placeholder="First Name"
          margin="normal"
          variant="outlined"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required />
        <TextField 
          placeholder="Last Name"
          margin="normal"
          variant="outlined"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required />
        <TextField 
          placeholder="your-handle@email.com"
          margin="normal"
          variant="outlined"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required />
        { formErrors ? 
          formErrors.map((e, i) => <FormAlert key={i} severity="error" color="error" message={e} />)
          : null }
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
};

export default SignupForm;