import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/** 
 * Renders a SearchForm Component.
 * 
 * Handles form update and submission data.
 * 
 * Params: handleSubmit function to handle form submit data.
 * 
 * @returns SearchForm
 * */

const SearchForm = ({ handleSubmit }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          color: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap',
          margin: '40px',
          width: '60%',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      }));

    const classes = useStyles();
    const [ formData, setFormData ] = useState(0);

    const handleChange = (evt) => {
      setFormData(evt.target.value);
    }

    const handleFormSubmit = (evt) => {
      evt.preventDefault();
      handleSubmit(formData);
    }

    return(
        <form className={classes.root} onSubmit={handleFormSubmit}>
          <TextField
            id="outlined-full-width"
            style={{ margin: 8, backgroundColor: 'white', width: '75%', }}
            placeholder="Enter Search Term"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained" 
            color="primary" 
            style={{ margin: 8, backgroundColor: '#563F58', width: '200px', }}>
              Submit
          </Button>
        </form>
    );
};

export default SearchForm;