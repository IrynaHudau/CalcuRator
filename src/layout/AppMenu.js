import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppBar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography, withStyles , Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { AboutIcon, HomeIcon } from '../icons/Icons';
import Logo from '../logo/Logo';

const font1 = " 'Avenir Next',sans-serif";

const styles = theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
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
        fontSize: '2rem',
        '@media (min-width:600px)': {
            fontSize: '2.3rem',
          },
        '@media (max-width:300px)': {
            fontSize: '1.3rem',
          },
      [theme.breakpoints.up('md')]: {
        fontSize: '2.4rem',
      },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            position: 'absolute',
            right: '24px'
        }
      },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
    navButton: {
        '& > *': {
            margin: theme.spacing(1),
          },
    }
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
        this.setState({ anchorEl: null});
    };
    

    render() {
        const { classes } = this.props;
        const { anchorEl} = this.state;
        const menuId = "application-menu";

        const renderMobileMenu = (
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
        );

        return(
            <AppBar position="static" style={{ background: 'transparent'}}>
                    <Toolbar>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                className={classes.menuButton}
                                aria-label="Menu"
                                aria-owns={anchorEl ? menuId : null}
                                aria-haspopup="true"
                                onClick={this.handleMenuClick}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                            <Logo></Logo>
                                <Typography color="inherit" className={classes.title}>
                                    Calc U Rator
                                </Typography>
                        <div className={classes.sectionDesktop}>
                            <nav className={classes.navButton}>
                                <Button variant="outlined" color="inherit" component={Link}  to="/">Home</Button>
                                <Button variant="outlined" color="inherit" component={Link}  to="/about">About</Button>
                            </nav>
                        </div>
                    </Toolbar> 
                    {renderMobileMenu}
            </AppBar>
        );
    }
}

    AppMenu.propTypes = {
        onNavigate: PropTypes.func
    };
    
export default withStyles(styles)(AppMenu);