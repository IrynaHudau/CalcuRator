import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { SlightlyFrowningFace } from "../primitives/Emoji";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 3
    },
    paragraphs: {
        margin: theme.spacing.unit * 2
    }
});

class NotFoundPage extends Component {
    render() {
        const { classes, routeProps } = this.props;
        return (
            <Grid container alignItems="center" justify="center" direction="column" className={classes.root} spacing={40}>
                <Grid item>
                    <Typography variant="h3" className={classes.paragraphs}>
                        We are sorry <SlightlyFrowningFace />
                    </Typography>
                    <Typography variant="h4" className={classes.paragraphs}>
                        We are unable to locate the page.
                    </Typography>
                    <Typography variant="h4" className={classes.paragraphs}>
                        <tt>{routeProps.location.pathname}</tt>
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={this.handleHomeClick}>Back to Home</Button>
                </Grid>
            </Grid>
        );
    }

    handleHomeClick = () => {
        const { routeProps } = this.props;
        routeProps.history.push('/');
    };
}

export default withStyles(styles)(NotFoundPage)
