import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableRow, Typography, withStyles } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import PieChart from "../../components/charts/PieChart";
import MoneyFormat from '../../primitives/MoneyFormat';
import MoneyInput from '../../primitives/MoneyInput';
import NumberInput from "../../primitives/NumberInput";
import PercentInput from '../../primitives/PercentInput';
import { DOWNPAYMNET_ENTRY_MODE, LOAN_TYPE, Model, SIMPLE_LOAN_CALCULATOR_DATA_PROP_TYPES, SIMPLE_LOAN_MODE } from "./LoanCalculatorCommon";
import SimpleLoanResults from './SimpleLoanResults';
import clone from 'clone';
import { copyApply } from "../../utils/apply";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    paperContent: {
        padding: theme.spacing(1),
        paddingRight: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1)
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    detailsSwitch: {
        align: "right"
    },
    resultsHeader: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2)
    },
    resultContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    resultTable: {
        flex: "100 300px",
        marginRight: theme.spacing(1),
    },
    resultChart: {
        flex: "1 300px",
        margin: theme.spacing(1),
    }
});

class SimpleLoanCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            widthWindow: 0, 
            heightWindow: 0 
        };
        this.handleShowDetailsChange = this.handleShowDetailsChange.bind(this);
        this.handleTotalNeedChange = this.handleTotalNeedChange.bind(this);
        this.handleDownpaymentModeChange = this.handleDownpaymentModeChange.bind(this);
        this.handleDownpaymentChange = this.handleDownpaymentChange.bind(this);
        this.handleDownpaymentPercentChange = this.handleDownpaymentPercentChange.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ widthWindow: window.innerWidth, heightWindow: window.innerHeight });
    };

    render() {
        const { classes } = this.props;
        const model = new Model(this.props.data, this.props.mode);
        return (
            <div className={classes.root}>
                {this.renderHeader(classes)}
                <Paper>
                    <div className={classes.paperContent}>
                        <MoneyInput
                            id="totalNeed"
                            className={classes.formControl}
                            label={this.props.mode === SIMPLE_LOAN_MODE.Mortgage ? "Home Price" : "Loan Amount"}
                            value={model.totalNeed()}
                            onChange={this.handleTotalNeedChange}
                            fullWidth
                            required
                            validation={model.getTotalNeedValidation()}
                        />
                        {this.renderDownpaymentEntries(model, classes)}
                        <PercentInput
                            id="interestRate"
                            className={classes.formControl}
                            label="Interest Rate"
                            value={model.interestRate()}
                            onChange={this.handleDataChange("interestRate")}
                            fullWidth
                            required
                            validation={model.getInterestRateValidation()}
                        />
                        <FormControl id="loanType" className={classes.formControl} fullWidth required>
                            <InputLabel htmlFor="loan-term">Loan Term</InputLabel>
                            <Select
                                className={classes.selectEmpty}
                                value={model.loanType()}
                                onChange={this.handleDataChange("loanType")}
                                inputProps={{
                                    name: this.props.mode === SIMPLE_LOAN_MODE.Mortgage ? "Loan Term" : 'Loan Type',
                                    id: 'simple-loan-calculator-loan-type',
                                }}>
                                {this.getLoanTypes().map((lt, idx) => <MenuItem id={`loanTypeOption${idx}`} key={lt.type} value={lt.type}>{lt.label}</MenuItem>)}
                            </Select>
                        </FormControl>
                        {this.renderCustomLoanParameters(model, classes)}
                        <Typography variant="h6" align="left" className={classes.resultsHeader}>Results</Typography>
                        <section className={classes.resultContainer}>
                            <div className={classes.resultTable}>
                                {this.renderSummary(model)}
                            </div>
                            <div className={classes.resultChart}>
                                {this.renderChart(model)}
                            </div>
                        </section>
                    </div>
                </Paper>
                {this.renderDetails(model)}
            </div>
        );
    }

    renderHeader(classes) {
        return (<Grid
            container
            spacing={10}
            alignItems="center"
            direction="row"
            justify="space-between">
            <Grid item xs={6}>
                <Typography variant="h5" align="center" gutterBottom>
                    {this.props.mode === SIMPLE_LOAN_MODE.Mortgage ? "Mortgage" : "Simple Loan"}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    control={
                        <Switch
                            id="showDetailsCheck"
                            checked={this.state.showDetails}
                            onChange={this.handleShowDetailsChange}
                            value="showDetails"
                            color="primary" />
                    }
                    label="Show Details"
                    className={classes.detailsSwitch} />
            </Grid>
        </Grid>
        );
    }

    renderDownpaymentEntries(model, classes) {
        if (this.props.mode !== SIMPLE_LOAN_MODE.Mortgage) {
            return null;
        }

        let entries = [
            <FormControlLabel
                control={
                    <Checkbox
                        id="downpaymentMode"
                        checked={model.downpaymentMode() === DOWNPAYMNET_ENTRY_MODE.Percentage}
                        onChange={this.handleDownpaymentModeChange}
                        value={model.downpaymentMode()}
                        color="primary"
                    />
                }
                label="Downpayment as Percent of Home Price"
            />
        ];

        entries.push(
            <PercentInput
                id="downpaymentPercent"
                className={classes.formControl}
                label="Downpayment %"
                value={model.downpaymentPercent()}
                onChange={this.handleDownpaymentPercentChange}
                fullWidth
                required
                validation={model.getDownpaymentPercentValidation()}
                disabled={model.downpaymentMode() === DOWNPAYMNET_ENTRY_MODE.MoneyAmount}
            />);
        entries.push(
            <MoneyInput
                id="downpaymentMoney"
                className={classes.formControl}
                label="Downpayment"
                value={model.downpayment()}
                onChange={this.handleDownpaymentChange}
                fullWidth
                required
                validation={model.getDownpaymentValidation()}
                disabled={model.downpaymentMode() === DOWNPAYMNET_ENTRY_MODE.Percentage}
            />);

        return entries;
    }

    renderCustomLoanParameters(model, classes) {
        if (model.loanType() !== LOAN_TYPE.Custom) {
            return null;
        }

        return (
            <div>
                <NumberInput
                    id="loanLenghtPeriods"
                    className={classes.formControl}
                    label="Loan Length"
                    value={model.loanLenghtPeriods()}
                    onChange={this.handleDataChange("loanLenghtPeriods")}
                    fullWidth
                    required
                    helperText="What is a loan length in periods? E.g. for 30 Year Fixed loan a period is a year, therefore it is 30 periods long."
                    validation={model.getLoanLengthValidation()}
                />
                <NumberInput
                    id="paymentsPerPeriod"
                    className={classes.formControl}
                    label="Paymnets per Period"
                    value={model.paymentsPerPeriod()}
                    onChange={this.handleDataChange("paymentsPerPeriod")}
                    fullWidth
                    required
                    helperText="How many payments per period? E.g. for 30 year fixed it is 12 payments per period. One payment a month or 12 payments a year."
                    validation={model.getPaymentsPerPeriodValidation()}
                />
            </div>
        );
    }

    renderDetails(model) {
        if (!this.state.showDetails) {
            return null
        }
        return (
            <div>
                <br />
                <SimpleLoanResults model={model}></SimpleLoanResults>
            </div>);
    }

    renderSummary(model) {
        if (!model.totalNeed() || !model.loanType()) {
            return null;
        }

        return (<Table>
            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row" padding="none">Monthly Payment</TableCell>
                    <TableCell padding="none" align="right">
                        <MoneyFormat id="montlyPayment" fixedDecimalScale value={model.getMontlyPayment()} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" padding="none">Total Interest Payed</TableCell>
                    <TableCell padding="none" align="right">
                        <MoneyFormat id="totalInterestAccrued" fixedDecimalScale value={model.getTotalInterestAccrued()} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" padding="none">Total Payment for the loan life</TableCell>
                    <TableCell padding="none" align="right">
                        <MoneyFormat id="totalPaymnetForLoanLifetime" fixedDecimalScale value={model.getTotalPaymnetForLoanLifetime()} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>)
    }

    renderChart(model) {
        if (!model.totalNeed() || !model.loanType()) {
            return null;
        }

        const interest = Math.round(model.getTotalInterestAccrued());
        const principal = Math.round(model.totalNeed() - model.downpayment());
        const downpayment = Math.round(model.downpayment());
        const data = [
            {
                label: "Interest",
                value: interest,
            },
            {
                label: "Principal",
                value: principal,
            },
            {
                label: "Downpayment",
                value: downpayment
            },
        ];
        let w = 300;
        if(this.state.widthWindow <= 400){
            w = 150;
        }
        return (<PieChart id="resultsChart" data={data} width={w} height={w} />);
    }

    handleDataChange = name => event => {
        const model = new Model(this.props.data, this.props.mode);
        let update = {
            mode: this.props.mode
        };
        update[name] = event.target.value;
        this.props.onDataChanged(copyApply(model.data, update));
    }

    handleTotalNeedChange(event) {
        const model = new Model(this.props.data ? clone(this.props.data) : null, this.props.mode);
        model.setTotalNeed(event.target.value);
        this.props.onDataChanged(model.data);
    }

    handleDownpaymentChange(event) {
        const model = new Model(this.props.data ? clone(this.props.data) : null, this.props.mode);
        model.setDownpayment(event.target.value);
        this.props.onDataChanged(model.data);
    }

    handleDownpaymentPercentChange(event) {
        const model = new Model(this.props.data ? clone(this.props.data) : null, this.props.mode);
        model.setDownpaymentPercent(event.target.value);
        this.props.onDataChanged(model.data);
    }

    handleDownpaymentModeChange(event) {
        const model = new Model(this.props.data, this.props.mode);
        let update = {
            mode: this.props.mode,
            downpaymentMode: event.target.checked ? DOWNPAYMNET_ENTRY_MODE.Percentage : DOWNPAYMNET_ENTRY_MODE.MoneyAmount
        };
        this.props.onDataChanged(copyApply(model.data, update));
    }

    handleShowDetailsChange(event) {
        let update = {
            showDetails: event.target.checked,
            mode: this.props.mode
        };
        this.setState(copyApply(this.state, update));
    }

    getLoanTypes() {
        let loanTypes = [
            { type: LOAN_TYPE.Fixed30Years, label: this.props.mode === SIMPLE_LOAN_MODE.Mortgage ? "30 Years" : "30 Years Fixed" },
            { type: LOAN_TYPE.Fixed15Years, label: this.props.mode === SIMPLE_LOAN_MODE.Mortgage ? "15 Years" : "15 Years Fixed" }
        ];
        if (this.props.mode !== SIMPLE_LOAN_MODE.Mortgage) {
            loanTypes.push({ type: LOAN_TYPE.Custom, label: "Other" });
        }
        return loanTypes;
    }
}

SimpleLoanCalculator.propTypes = {
    onDataChanged: PropTypes.func,
    data: SIMPLE_LOAN_CALCULATOR_DATA_PROP_TYPES,
    mode: PropTypes.number,
    classes: PropTypes.object,
};

export default withStyles(styles)(SimpleLoanCalculator);