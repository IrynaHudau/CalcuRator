import React, { Component } from 'react';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Select, withStyles } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MoneyFactorInput from '../../primitives/MoneyFactorInput';
import PercentInput from '../../primitives/PercentInput';
import { CREDIT_SCORE_LEVEL, INTEREST_RATE_METHOD, Model } from './LeaseCalculatorCommons';
import { makeCypressId } from "../../utils/cypressUtil";
import { copyApply } from '../../utils/apply';

const styles = theme => ({
    formControl: {
        marginTop: theme.spacing.unit
    },
    creditSelctor: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2
    },
});

const creditScoreLevels = [
    CREDIT_SCORE_LEVEL.Fair,
    CREDIT_SCORE_LEVEL.Good,
    CREDIT_SCORE_LEVEL.VeryGood,
    CREDIT_SCORE_LEVEL.Exceptional
];

class LeaseCredit extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    render() {
        const { classes } = this.props;
        const model = new Model(this.props.data);

        return (<div>
            <FormControl fullWidth className={classes.creditSelctor}>
                <FormLabel>
                    What can we use to calculate interest on your lease?
                </FormLabel>
                <RadioGroup
                    name="interestRateMethod"
                    value={model.interestRateMethod()}
                    onChange={this.handleValueChange("interestRateMethod")}
                    row>
                    <FormControlLabel id="cy-rbCreditScoreLevel" value={INTEREST_RATE_METHOD.CreditScoreLevel} control={<Radio color="primary" />} label="Credit Score Level" />
                    <FormControlLabel id="cy-rbInterestRate" value={INTEREST_RATE_METHOD.InterestRate} control={<Radio color="primary" />} label="Interest Rate" />
                    <FormControlLabel id="cy-rbMoneyFactor" value={INTEREST_RATE_METHOD.MoneyFactor} control={<Radio color="primary" />} label="Money Factor" />
                </RadioGroup>
                <FormHelperText>{this.getCalculationMethodSelectionHelpText(model)}</FormHelperText>
            </FormControl>
            {this.getInteresetRateControls(model, classes)}
        </div>);
    }

    handleValueChange = name => event => {
        const model = new Model(this.props.data);
        let update = {};
        update[name] = event.target.value;
        this.props.onDataChanged(copyApply(model.data, update));
    }

    getInteresetRateControls(model, classes) {
        switch (model.interestRateMethod()) {
            case INTEREST_RATE_METHOD.CreditScoreLevel:
                return <FormControl
                    id="cy-creditScore"
                    className={classes.formControl}
                    fullWidth
                    required>
                    <InputLabel htmlFor="credit-score-level">Credit Score</InputLabel>
                    <Select
                        value={model.creditScoreLevel()}
                        onChange={this.handleValueChange("creditScoreLevel")}
                        inputProps={{
                            name: 'Credit Score',
                            id: 'credit-score-level',
                        }}>
                        {
                            creditScoreLevels.map(l => <MenuItem id={makeCypressId("creditScore", l)} value={l}>{l}</MenuItem>)
                        }
                    </Select>
                    <FormHelperText>An estimate of how good is your credit score.</FormHelperText>
                </FormControl>;
            case INTEREST_RATE_METHOD.InterestRate:
                return <PercentInput
                    id="cy-interestRate"
                    className={classes.formControl}
                    label="Interest Rate"
                    value={model.interestRate()}
                    onChange={this.handleNumberChange("interestRate")}
                    fullWidth
                    helperText="Input interest rate for your lease if you know it."
                    validation={model.getInterestRateValidation()} />;
            case INTEREST_RATE_METHOD.MoneyFactor:
                return <MoneyFactorInput
                    id="cy-moneyFactor"
                    className={classes.formControl}
                    label="Money Factor"
                    value={model.moneyFactor()}
                    onChange={this.handleNumberChange("moneyFactor")}
                    fullWidth
                    helperText="Input money factor if you know exact value on your lease. Usually Money Factor is a small decimal number, e.g. 0.002187."
                    validation={model.getMoneyFactorValidation()} />;
            default:
                return;
        }
    }

    getCalculationMethodSelectionHelpText(model) {
        switch (model.interestRateMethod()) {
            case INTEREST_RATE_METHOD.CreditScoreLevel:
                return "It is a default option. Use it if you do not know neither exact interest rate nor money factor on your lease.";
            case INTEREST_RATE_METHOD.InterestRate:
            case INTEREST_RATE_METHOD.MoneyFactor:
                return "You can use this option if you know exact value on your lease. " +
                    "If you are not sure it's suggested to use Credit Score Level option.";
            default:
                return null;
        }
    }

    handleNumberChange = name => event => {
        let update = {};
        update[name] = event.target.value;
        this.props.onDataChanged(copyApply(this.props.data, update));
    }
}

export default withStyles(styles)(LeaseCredit);