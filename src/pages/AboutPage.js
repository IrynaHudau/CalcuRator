import React, { Component } from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import bigDinoLogo from '../assets/StandLogo.svg';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: `0 ${theme.spacing(3)}px`,
        paddingTop: theme.spacing(2),

        backgroundImage: `url(${bigDinoLogo})`,
        backgroundPosition: '120% 30%',
        backgroundAttachment: 'fixed',

        backgroundSize: '50% 50%',
        backgroundRepeat: 'no-repeat',
        height: '1000px'
    },
});

class AboutPage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <Grid container wrap="nowrap" justify="space-around" alignItems="center" spacing={10}>
                <Grid item xs sm={6}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" paragraph>
                        "Calc U Rator" app helps you quickly and with ease analyze numbers before
                        you sign a contract, for example a Car Lease.
                     </Typography>
                    <Typography variant="body1" paragraph>
                        Take the app with you, ask salesman for a quote, input few numbers from the quote and
                        get an answer right away whether the quote is reasonable.
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                        Motivation
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Motivation to create this app is simple.
                        There are good dealerships which give fair and reasonable quotes,
                        however there are other which usually do opposite.
                        It is very easy to be tricked and sign an expensive lease
                        without even realizing how much is the overpay.
                        Car lease math is simple, but quotes are presented in a way so it is hard
                        to understand and reason about it especially under pressure of a "pushy" salesman or manager.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        "Calc U Rator" will help you think rational and avoid making forced decisions.
                        Seeing numbers and how the math works will help you ask the right questions and
                        negotiate down to a reasonable price.
                    </Typography>
                    <Typography variant="caption" paragraph>
                        We hope you enjoy the app and it is serving you well!
                    </Typography>
                </Grid>
            </Grid>
        </div>
        );
    }
}
export default withStyles(styles)(AboutPage);