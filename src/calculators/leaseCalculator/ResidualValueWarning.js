import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import HighlightBlock from '../../primitives/HighlightBlock';
import MoneyFormat from '../../primitives/MoneyFormat';
import { LEASE_CALCULATOR_DATA_PROP_TYPES, Model } from './LeaseCalculatorCommons';

const styles = theme => ({
});

class ResidualValueWarning extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { id, data } = this.props;
        const model = new Model(data);
        return model.isResidualValueTooLow()
            ? (
                <HighlightBlock id={id} type="warning" paragraph>
                    Residual Value appears to be very low. The car will loose <MoneyFormat value={model.calculateValueLossPercentile()} prefix="" />% in value over the lease term.
                </HighlightBlock>)
            : null;
    }
}

ResidualValueWarning.propTypes = {
    id: PropTypes.string,
    data: LEASE_CALCULATOR_DATA_PROP_TYPES,
}

export default withStyles(styles)(ResidualValueWarning);