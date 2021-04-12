import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { SIMPLE_LOAN_CALCULATOR_DATA_PROP_TYPES, SIMPLE_LOAN_MODE } from '../calculators/simpleLoanCalculator/LoanCalculatorCommon';
import SimpleLoanCalculator from '../calculators/simpleLoanCalculator/SimpleLoanCalculator';
import * as ActionCreators from '../redux/store/actions/index';

class SimpleLoanCalculatorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Grid container alignItems="flex-start" justify="center">
                <Grid item xs={10} sm={8} md={6}>
                    <SimpleLoanCalculator data={this.props.st} onDataChanged={this.props.onSimpleLoanCalculatorDataChanged} mode={SIMPLE_LOAN_MODE.SimpleLoan} />
                </Grid>
            </Grid>
        );
    }
}

SimpleLoanCalculatorPage.propTypes = {
    onDataChanged: PropTypes.func,
    data: SIMPLE_LOAN_CALCULATOR_DATA_PROP_TYPES,
    mode: PropTypes.number
};


const mapStateToProps = state => {
    return {
        st: state.simpleLoanCalculatorData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSimpleLoanCalculatorDataChanged: (data) => dispatch(ActionCreators.createSimpleLoanCalculatorDataChanged(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleLoanCalculatorPage);