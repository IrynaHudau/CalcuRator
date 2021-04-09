import React, { Component } from 'react';
import Aux from '../hoc/_Aux';
import AppMenu from './AppMenu';
import Footer from './Footer';

import { CssBaseline, withStyles } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const THEME = createMuiTheme({
    palette: {
        type: "light", // Switching the dark mode on is a single property value change.
        primary:{
            light:"rgba(199, 119, 158, 1)",
            main:"rgba(110, 67, 88, 1)",
            dark:"rgba(68, 35, 53, 1)",
            contrastText:"#fff",
        },
    },
    typography: {
        useNextVariants: true,
    },
});

const styles = () => ({
    appRoot: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    appContent: {
       flex: '1 0 auto',
    },
});

class Layout extends Component {
    render() {
        const { classes } = this.props;
        return(
            <React.Fragment>
                <CssBaseline />
                <MuiThemeProvider theme={THEME}>
                    <div className={classes.appRoot}>
                        <Aux >
                            <AppMenu></AppMenu>
                            <main className={classes.appContent}>
                                {this.props.children}
                            </main>
                            <Footer></Footer>
                        </Aux>
                    </div>
                </MuiThemeProvider>
            </React.Fragment >
        )
    }
}
export default withStyles(styles)(Layout);