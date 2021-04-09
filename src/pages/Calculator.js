import React from 'react';
import { Card, CardActionArea, CardActions, CardHeader, Grid, CardContent, Typography,Hidden} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CalculatorBankHomeIcon, CalculatorCarIcon, CalculatorHomeIcon } from "../icons/Icons";

const styles = theme => ({
    cardStyle: {
        display:'flex',
        flexWrap:'wrap',
        borderColor:'#94EC32',
        borderWidth:'1px',
        borderStyle:'solid',
        borderRadius:'8px',
        boxShadow:'0 0 33px rgba(0,0,0,.3)',
        '&:hover': {
            background:'#C1EB94',
            transform: 'scale(1.2)',
        },
    },
    icon: {
        width: "3em",
        height: "3em",
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
    }
})

const calculator = (props) => {
    const { classes } = props;
    return (
        <div>
            <Card className={classes.cardStyle}>
                    <CardActionArea onClick={props.clicked} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} >
                        <CardHeader
                            title={props.title}
                            titleTypographyProps={{ align: 'center'}}
                        />
                        <CardActions className={classes.cardActions} >
                            <div color="primary" align="center">
                                <Grid container align="center" alignItems="center" justify="center" direction="column">
                                    <Grid item>
                                        {props.title === 'Car Lease' ? <CalculatorCarIcon className={classes.icon} /> : props.title === 'Mortgage' ? <CalculatorHomeIcon className={classes.icon} /> : <CalculatorBankHomeIcon className={classes.icon} />}
                                    </Grid>
                                    <Grid item>
                                        Open
                                    </Grid>
                                </Grid>
                            </div>
                        </CardActions>        
                    </CardActionArea>
                <Hidden xsDown>
                    <CardContent>
                        <Typography  variant="caption" gutterBottom>
                            {props.about}
                        </Typography>
                    </CardContent>
                </Hidden> 
            </Card>
        </div>
    );
}

export default withStyles(styles)(calculator);