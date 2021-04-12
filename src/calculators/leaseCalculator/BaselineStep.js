import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoneyFormat from '../../primitives/MoneyFormat';
import MoneyInput from '../../primitives/MoneyInput';
import { LEASE_CALCULATOR_DATA_PROP_TYPES, Model } from './LeaseCalculatorCommons';
import {makeCypressId} from "../../utils/cypressUtil";
import { copyApply } from "../../utils/apply";

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
});

class BaselineStep extends Component {
    constructor(props) {
        super(props);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    render() {
        const { classes } = this.props;
        const model = new Model(this.props.data);
        const summary = model.monthlyPayment() && model.monthInLease() ?
            (
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row" padding="default">Total for lease</TableCell>
                            <TableCell padding="default">
                                <MoneyFormat id="cy-totalForLease" value={model.calculateTotalForLease()} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" padding="default">Monthly payment if $0 down</TableCell>
                            <TableCell padding="default">
                                <MoneyFormat id="cy-monthlyPaymentIfNoDownpayment" value={model.calculateMonthlyPaymentIfNoDownpayment()} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            ) :
            null;
        return (
            <div>
                <div>
                    <MoneyInput
                        id="cy-downpayment"
                        className={classes.formControl}
                        label="Downpayment"
                        value={model.downpayment()}
                        onChange={this.handleNumberChange("downpayment")}
                        fullWidth
                    />
                </div>
                <div>
                    <MoneyInput
                        id="cy-monthlyPayment"
                        className={classes.formControl}
                        label="Monthly Payment"
                        value={model.monthlyPayment()}
                        onChange={this.handleNumberChange("monthlyPayment")}
                        fullWidth
                        required
                        validation={model.getMonthlyPaymentValidation()}
                    />
                </div>
                <div>
                    <FormControl id="cy-monthInLease" className={classes.formControl} fullWidth required>
                        <InputLabel htmlFor="calculator-month-in-lease">Month in Lease</InputLabel>
                        <Select
                            className={classes.selectEmpty}
                            value={model.monthInLease()}
                            onChange={this.handleNumberChange("monthInLease")}
                            inputProps={{
                                name: 'Month in Lease',
                                id: 'calculator-month-in-lease',
                            }}>
                            {
                                [12, 24, 36, 48].map(m => 
                                    <MenuItem key={m} id={makeCypressId("monthInLeaseValue", m)} value={m}>{`${m} Month`}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </div>
                {summary}
            </div>
        );
    }

    handleNumberChange = name => event => {
        const model = new Model(this.props.data);
        let update = {};
        update[name] = event.target.value;
        this.props.onDataChanged(copyApply(model.data, update))
    }
}

BaselineStep.propTypes = {
    data: LEASE_CALCULATOR_DATA_PROP_TYPES,
    onDataChanged: PropTypes.func,
};


export default withStyles(styles)(BaselineStep);