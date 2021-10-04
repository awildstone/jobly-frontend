import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UserContext from '../context/UserContext';

/**
 * Renders an ApplyButton Component.
 * 
 * Consumes applyToJob, hasApplied from UserContext
 * Holds state of applied status for a jobId.
 * 
 * @param {jobId}
 * @returns ApplyButton
 */

const ApplyButton = ({ jobId }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          margin: '20px',
          width: '80px',
          height: '50px',
        },
      }));

    const classes = useStyles();
    const { applyToJob, hasApplied } = useContext(UserContext);
    const [applied, setApplied] = useState(() => {
        return hasApplied(jobId);
    });

    async function handleClick(evt) {
        let result = await applyToJob(jobId);
        if (result.success) {
            setApplied(true);
        } else {
            console.debug(result.err);
        }
    }

    if (applied) {
        return (
            <Button className={classes.root} onClick={handleClick} disabled
                variant="contained" 
                color="secondary">
                Applied
            </Button>
        );
    } else {
        return (
            <Button className={classes.root} onClick={handleClick}
                variant="contained" 
                color="secondary">
                Apply
            </Button>
        );
    }
};

export default ApplyButton;