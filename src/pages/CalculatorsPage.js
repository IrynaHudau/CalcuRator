import { Grid, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { SmilingFaceWithSmilingEyes } from "../primitives/Emoji";
import Calculator from './Calculator';

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        // [theme.breakpoints.up(900 + theme.spacing(2)*3)]: {
        //     width: 900,
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        // },
    },
    heroContent: {
        margin: '0 auto',
        padding: `${theme.spacing(8)}px 0 ${theme.spacing(8)}px`,
    },
    title:{
        fontSize: '4rem',
        '@media (min-width:600px)': {
            fontSize: '3.4rem',
          },
          '@media (max-width:400px)': {
            fontSize: '2.8rem',
          },
        '@media (max-width:300px)': {
            fontSize: '2.3rem',
          },
          '@media (max-width:200px)': {
            fontSize: '1.5rem',
          },
    }
});

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const CalculatorType = {
    CarLease: 'Car Lease',
    SimpleLoan: 'Simple Loan',
    Mortgage: 'Mortgage',
    CarLoan: 'Car Loan',
};
const calculators = [
    {
        title: CalculatorType.CarLease,
        path: '/lease-calculator',
        about: 'If you are considering Car Lease. Your are already at dealership or just researching at home.',
    },
    // {
    //     title: CalculatorType.CarLoan,
    //     path: '/car-loan',
    //     about: 'Buying a car and need financing or not sure about your trade-in. Run numbers before going to dealership.'
    // },
    {
        title: CalculatorType.SimpleLoan,
        path: '/simple-loan-calculator',
        about: 'Considering a Loan and need to know what the payments will be and how much you will pay for the entire loan.',
    },
    {
        title: CalculatorType.Mortgage,
        path: '/mortgage-calculator',
        about: 'Looking to get a Mortgage and need to know which one fits your needs better. How interest rate will impact payments.',
    },
];

class CalculatorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
        };
    }

    handleLeaseCalculatorButtonClicked = (path) => {
        const { routeProps } = this.props;
        const parentUrl = routeProps.match.url;
        routeProps.history.push(parentUrl + path);
    }

    handleSimpleLoanCalculatorButtonClicked = (path) => {
        const { routeProps } = this.props;
        const parentUrl = routeProps.match.url;
        routeProps.history.push(parentUrl + path);
    }

    handleMortgageCalculatorButtonClicked = (path) => {
        const { routeProps } = this.props;
        const parentUrl = routeProps.match.url;
        routeProps.history.push(parentUrl + path);
    }

    handleCarLoanCalculatorButtonClicked = (path) => {
        const { routeProps } = this.props;
        const parentUrl = routeProps.match.url;
        routeProps.history.push(parentUrl + path);
    }

    setRedirect = (calculator) => {
        switch (calculator.title) {
            case CalculatorType.SimpleLoan:
                return this.handleSimpleLoanCalculatorButtonClicked(calculator.path);
            case CalculatorType.CarLease:
                return this.handleLeaseCalculatorButtonClicked(calculator.path);
            case CalculatorType.Mortgage:
                return this.handleMortgageCalculatorButtonClicked(calculator.path);
            case CalculatorType.CarLoan:
                return this.handleCarLoanCalculatorButtonClicked(calculator.path);
            default:
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Typography  className={classes.title} component="h1"  align="center" color="textPrimary" gutterBottom>
                        Calculators
                    </Typography>
                    <Typography variant="h6" align="justify" color="textSecondary" component="p">
                        Quickly research financial question to make weighted decision, it is the primary goal of Calc U Rator.
                        Each calculator is super simple to use and guides your throght sometimes complicated financial concepts.
                        It's always in your pocket and is ready to help <SmilingFaceWithSmilingEyes />.
                        Select a problem you want to solve and get the results right away!
                    </Typography>
                </div>
                <Grid container spacing={7} alignItems="flex-end">
                    {calculators.map((calculator, index) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Calculator
                                title={calculator.title}
                                clicked={() => { this.setRedirect(calculator) }}
                                about={calculator.about}>
                            </Calculator>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(CalculatorPage);