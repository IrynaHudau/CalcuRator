import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import CarLoanCalculator from '../calculators/carLoanCalculator/CarLoanCalculator';
import { CAR_LOAN_CALCULATOR_DATA_PROP_TYPES } from '../calculators/carLoanCalculator/CarLoanCalculatorCommon';

import { connect } from 'react-redux';
import * as ActionCreators from '../redux/store/actions/index';

class CarLoanCalculatorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Grid container alignItems="flex-start" justify="center">
                <Grid item xs={12} sm={8} md={6}>
                    <CarLoanCalculator data={this.props.st} onDataChanged={this.props.onCarLoanCalculatorDataChaged} />
                </Grid>
            </Grid>
        );
    }
}

CarLoanCalculatorPage.propTypes = {
    onDataChanged: PropTypes.func,
    data: CAR_LOAN_CALCULATOR_DATA_PROP_TYPES,
};


const mapStateToProps = state => {
    return {
        st: state.carLoanCalculatorData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCarLoanCalculatorDataChaged: (data) => dispatch(ActionCreators.createCarLoanCalculatorDataChanged(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarLoanCalculatorPage);