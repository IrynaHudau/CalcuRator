import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { SIMPLE_LOAN_CALCULATOR_DATA_PROP_TYPES, SIMPLE_LOAN_MODE } from '../calculators/simpleLoanCalculator/LoanCalculatorCommon';
import SimpleLoanCalculator from '../calculators/simpleLoanCalculator/SimpleLoanCalculator';
import * as ActionCreators from '../redux/store/actions/index';

class MortgageCalculatorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Grid container alignItems="flex-start" justify="center">
                <Grid item xs={12} sm={8} md={6}>
                    <SimpleLoanCalculator data={this.props.st} onDataChanged={this.props.onMortgageCalculatorDataChanged} mode={SIMPLE_LOAN_MODE.Mortgage} />
                </Grid>
            </Grid>
        );
    }
}

MortgageCalculatorPage.propTypes = {
    onDataChanged: PropTypes.func,
    data: SIMPLE_LOAN_CALCULATOR_DATA_PROP_TYPES,
    mode: PropTypes.number
};


const mapStateToProps = state => {
    return {
        st: state.mortgageCalculatorData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMortgageCalculatorDataChanged: (data) => dispatch(ActionCreators.createMortgageCalculatorDataChanged(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MortgageCalculatorPage);