import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { LEASE_CALCULATOR_DATA_PROP_TYPES } from '../calculators/leaseCalculator/LeaseCalculatorCommons';
import LeaseCalculator from '../calculators/leaseCalculator/LeaseCalculator';

import {connect} from 'react-redux'; 
import * as ActionCreators from '../redux/store/actions/index';

class LeaseCalculatorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Grid container alignItems="flex-start" justify="center">
                <Grid item xs={12} sm={8} md={6}>
                    <LeaseCalculator data={this.props.st} onDataChanged={this.props.onLeaseCalculatorDataChanged} />
                </Grid>
            </Grid>
        );
    }
}

LeaseCalculatorPage.propTypes = {
    onDataChanged: PropTypes.func,
    data: LEASE_CALCULATOR_DATA_PROP_TYPES,
};

const mapStateToProps = state => {
    return {
        st: state.leaseCalculatorData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLeaseCalculatorDataChanged: (data) => dispatch(ActionCreators.createLeaseCalculatorDataChanged(data))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(LeaseCalculatorPage);