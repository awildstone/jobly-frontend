import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

/** 
 * Renders CompanyCard.
 * 
 * Props: company data.
 * 
 * @returns CompanyCard
 * 
 *  */

const CompanyCard = ({ company }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          margin: '20px',
          width: '60%',
          marginLeft: 'auto',
          marginRight: 'auto',
          textDecoration: 'none',
        },
        details: {
          display: 'flex',
          flexDirection: 'column',
        },
        content: {
          flex: '1 0 auto',
        },
        cover: {
          width: 151,
        },
      }));

    const classes = useStyles();

    return(
        <CardActionArea>
            <Card className={classes.root} component={RouterLink} to={`/companies/${company.handle}`}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5" color="primary">
                            {company.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {company.description}
                        </Typography>
                    </CardContent>
                </div>
                {/* <CardMedia className={classes.cover} image={company.logoUrl} title={company.name}/>  */}
            </Card>
        </CardActionArea>
    );
}

export default CompanyCard;