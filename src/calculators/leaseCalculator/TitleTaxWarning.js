import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import HighlightBlock from '../../primitives/HighlightBlock';
import MoneyFormat from '../../primitives/MoneyFormat';
import { LEASE_CALCULATOR_DATA_PROP_TYPES, Model } from './LeaseCalculatorCommons';

const styles = theme => ({
});

class TitleTaxWarning extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { id, data } = this.props;
        const model = new Model(data);
        return model.isTitleTaxTooHigh()
            ? (
                <HighlightBlock id={id} type="warning" paragraph>
                    Title and Tax appear to be high.
                    Fair value could be below <MoneyFormat value={model.calculateFairTitleTaxValue()} />.
                </HighlightBlock>)
            : null;
    }
}

TitleTaxWarning.propTypes = {
    id: PropTypes.string,
    data: LEASE_CALCULATOR_DATA_PROP_TYPES,
}

export default withStyles(styles)(TitleTaxWarning);