import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { Model} from '../carLoanCalculator/CarLoanCalculatorCommon';
import { FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MoneyInput from '../../primitives/MoneyInput';
import MoneyFormat from '../../primitives/MoneyFormat';
import PercentInput from '../../primitives/PercentInput';
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
});

class CarLoanCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // checkedTradeInBtn: false,
            // checkedInterRateBtn: false,
        };
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
    }

    handleCheckedChange = name => event => {
        const model = new Model(this.props.data);
        let update = {};
        update[name] = event.target.checked;
        this.props.onDataChanged(copyApply(model.data, update))
      };

    handleNumberChange = name => event => {
        const model = new Model(this.props.data);
        let update = {};
        update[name] = event.target.value;
        this.props.onDataChanged(copyApply(model.data, update))
    }

    render() {
        const { classes } = this.props;
        const model = new Model(this.props.data);

        let tradeInChecked = null;
        let intRateChecked = null;
        if(model.checkedTradeInBtn() === true){
            tradeInChecked = <FormGroup>
                                <MoneyInput
                                    className={classes.formControl}
                                    label="Trade In"
                                    value={model.tradeIn()}
                                    onChange={this.handleNumberChange("tradeIn")}
                                    fullWidth
                                />
                                <FormHelperText>Tell sales person about ypu trade in affter you already negotoatede all numbers.</FormHelperText>
                            </FormGroup>
        }
        if(model.checkedInterRateBtn() === true){
            intRateChecked = <FormGroup> 
                                <PercentInput
                                    className={classes.formControl}
                                    label="Interest Rate"
                                    value={model.interestRate()}
                                    onChange={this.handleNumberChange("interestRate")}
                                    fullWidth
                                    required
                             />
                            </FormGroup>
        }
        const summary = model.downpayment() && model.monthlyPayment() ?
        (
            <div className={classes.paperContent}>
            <Typography gutterBottom variant="h6"  className={classes.formControl}>
                Result
            </Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row" padding="dense">The car would bst you</TableCell>
                            <TableCell padding="dense">
                                <MoneyFormat value={model.totalPayment()} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" padding="dense">Compare to MSRP</TableCell>
                            <TableCell padding="dense">
                                <MoneyFormat value={model.msrp()} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" padding="dense">From which interest and other fees is</TableCell>
                            <TableCell padding="dense">
                                <MoneyFormat value={model.totalPaymentPlusMSRP()} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" padding="dense">From with interest is</TableCell>
                            <TableCell padding="dense">
                                <MoneyFormat value={model.totalInterestAcc()} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" padding="dense">other fees</TableCell>
                            <TableCell padding="dense">
                                <MoneyFormat value={model.result()} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        ) :
        null;
      
        return (
            <div className={classes.root}>
             <Typography variant="h5" align="center" gutterBottom>Car Loan</Typography>
               <Paper className={classes.paperContent}>
                    <div>
                        <MoneyInput
                            className={classes.formControl}
                            label="MSRP"
                            value={model.msrp()}
                            onChange={this.handleNumberChange("msrp")}
                            fullWidth
                            required
                        />
                        <MoneyInput
                            className={classes.formControl}
                            label="Down payment"
                            value={model.downpayment()}
                            onChange={this.handleNumberChange("downpayment")}
                            fullWidth
                            required
                        />
                        <FormControlLabel
                            control={<Checkbox  
                                        color="primary" 
                                        className={classes.formControl}
                                        checked={model.checkedTradeInBtn()} 
                                        onChange={this.handleCheckedChange('checkedTradeInBtn')} 
                                        value="checkedTradeInBtn" />}
                            label="I have tradein"
                        />
                        {tradeInChecked}
                    </div>
                        <Divider/>
                    <div className={classes.paperContent}>
                        <Typography gutterBottom variant="h6"  className={classes.formControl}>
                            Loan terms
                        </Typography>
                        {/* <Divider/> */}
                        <FormControl className={classes.formControl} fullWidth required>
                            <InputLabel htmlFor="calculator-month-in-loan">Loan terms</InputLabel>
                            <Select
                                className={classes.selectEmpty}
                                value={model.loanLenghtPeriods()}
                                onChange={this.handleNumberChange("loanLenghtPeriods")}
                                inputProps={{
                                    name: 'Loan terms',
                                    id: 'calculator-month-in-loan',
                                }}>
                                    <MenuItem value={6}>6 Month</MenuItem>
                                    <MenuItem value={12}>12 Month</MenuItem>
                                    <MenuItem value={24}>24 Month</MenuItem>
                                    <MenuItem value={36}>36 Month</MenuItem>
                                    <MenuItem value={48}>48 Month</MenuItem>
                            </Select>
                        </FormControl>
                        <MoneyInput
                            className={classes.formControl}
                            label="Monthly Payment"
                            value={model.monthlyPayment()}
                            onChange={this.handleNumberChange("monthlyPayment")}
                            fullWidth
                        />
                        <FormControlLabel
                            control={<Checkbox 
                                        color="primary" 
                                        className={classes.formControl}
                                        checked={model.checkedInterRateBtn()} 
                                        onChange={this.handleCheckedChange('checkedInterRateBtn')} 
                                        value="checkedInterRateBtn" />}
                            label="I know interest rate"
                        />
                        {intRateChecked}
                    </div>
                    <Divider/>
                    {summary}
               </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(CarLoanCalculator);