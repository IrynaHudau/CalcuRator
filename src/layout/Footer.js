import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    footerRoot: {
        //flexShrink: 0, 
        padding: '48px',
    },
    text: {
        textAlign: 'center',
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2
    },
});

class Footer extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        const classes = this.props.classes;
        return(
            <footer className={classes.footerRoot} >
                <div>
                    <br />
                    <Typography variant="caption" gutterBottom align="center" className={classes.text}>
                        Fearless Future LLC © 2020
                    </Typography>
                </div>
            </footer>
        )
    }
}

export default withStyles(styles)(Footer);