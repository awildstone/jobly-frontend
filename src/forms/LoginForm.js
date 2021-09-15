import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles  } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import FormAlert from './FormAlert';

/** 
 * Renders a LoginForm Component.
 * 
 * Handles form update and submission data.
 * 
 * Params: login function to handle form submit data.
 * 
 * @returns LoginForm
 * */

const LoginForm = ({ login }) => {
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
    password: ''
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (evt) => {
    setFormData(data => ({...data, [evt.target.name]: evt.target.value}));
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
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
          placeholder="current-password"
          margin="normal"
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
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

export default LoginForm;