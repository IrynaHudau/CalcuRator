import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppBar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { AboutIcon, HomeIcon } from '../icons/Icons';
import Logo from '../logo/Logo';

const font1 = " 'Avenir Next',sans-serif";

const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    title: {
        fontFamily: font1,
        flexGrow: 10,
    },
});

class AppMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }
    
    handleMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const menuId = "application-menu";
        return(
            <AppBar position="static" style={{ background: 'transparent'}}>
                    <Toolbar>
                         <IconButton
                            className={classes.menuButton}
                            aria-label="Menu"
                            aria-owns={anchorEl ? menuId : null}
                            aria-haspopup="true"
                            onClick={this.handleMenuClick}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id={menuId}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}>

                            <MenuItem onClick={() => {this.handleClose()}} component={Link}  to="/">
                                <ListItemIcon className={classes.icon}>
                                    <HomeIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Home" />
                            </MenuItem>
                            
                            <MenuItem onClick={() => {this.handleClose()}} component={Link}  to="/about">
                                <ListItemIcon className={classes.icon}>
                                    <AboutIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="About" />
                            </MenuItem>
                        </Menu>
                        <Logo></Logo>
                        <Typography variant="h5" color="inherit"className={classes.title}>
                            Calc U Rator
                        </Typography>
                    </Toolbar> 
            </AppBar>
                 
        );
    }
}

    AppMenu.propTypes = {
        onNavigate: PropTypes.func
    };
    
export default withStyles(styles)(AppMenu);