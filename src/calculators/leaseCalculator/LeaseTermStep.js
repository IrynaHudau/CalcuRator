import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import MoneyInput from '../../primitives/MoneyInput';
import { LEASE_CALCULATOR_DATA_PROP_TYPES, Model } from './LeaseCalculatorCommons';
import ResidualValueWarning from "./ResidualValueWarning";
import TitleTaxWarning from "./TitleTaxWarning";
import { copyApply } from "../../utils/apply";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
    }
});

class LeaseTermStep extends Component {
    constructor(props) {
        super(props);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }
    render() {
        const { classes } = this.props;
        const model = new Model(this.props.data);
        return (
            <div>
                <div>
                    <MoneyInput
                        id="cy-msrp"
                        className={classes.formControl}
                        label="MSRP or Base Price"
                        value={model.msrp()}
                        onChange={this.handleNumberChange("msrp")}
                        fullWidth
                        required
                        helperText="Manufacturer Suggested Retail Price or Base Price after all discounts."
                        validation={model.getMsrpValidation()}
                    />
                </div>
                <div>
                    <MoneyInput
                        id="cy-residualValue"
                        className={classes.formControl}
                        label="Residual Value"
                        value={model.residualValue()}
                        onChange={this.handleNumberChange("residualValue")}
                        fullWidth
                        required
                        helperText="A price you would pay at the end of lease if you were to buy the car. It should be in the lease contract."
                        validation={model.getResidualValueValidation()}
                    />
                </div>
                <ResidualValueWarning id="cy-residualValueWarning" data={this.props.data} />
                <div>
                    <MoneyInput
                        id="cy-titleTax"
                        className={classes.formControl}
                        label="Title and Tax"
                        value={model.titleTax()}
                        onChange={this.handleNumberChange("titleTax")}
                        fullWidth
                        helperText="Any taxes and feels. Leave it blank if you do not know."
                    />
                </div>
                <TitleTaxWarning id="cy-titleTaxWarning" data={this.props.data} />
            </div>
        );
    }

    handleNumberChange = name => event => {
        let update = {};
        update[name] = event.target.value;
        this.props.onDataChanged(copyApply(this.props.data, update));
    }
}

LeaseTermStep.propTypes = {
    data: LEASE_CALCULATOR_DATA_PROP_TYPES,
    onDataChanged: PropTypes.func,
}

export default withStyles(styles)(LeaseTermStep);