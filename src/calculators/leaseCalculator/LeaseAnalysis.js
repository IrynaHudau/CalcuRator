import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HighlightBlock from '../../primitives/HighlightBlock';
import MoneyFormat from '../../primitives/MoneyFormat';
import { LEASE_CALCULATOR_DATA_PROP_TYPES, Model } from './LeaseCalculatorCommons';
import ResidualValueWarning from "./ResidualValueWarning";
import TitleTaxWarning from "./TitleTaxWarning";
import { makeCypressId } from "../../utils/cypressUtil";

const styles = () => ({
});

class LeaseAnalysis extends Component {
    render() {
        const model = new Model(this.props.data);
        const data = [
            { name: "Monthly Payment", your: model.monthlyPayment(), fair: model.calculateFairMonthlyPayment(), isTotal: true },
            { name: "Downpayment", your: model.downpayment(), fair: model.downpayment(), isTotal: true },
            { name: "Total for Lease", your: model.calculateTotalForLease(), fair: model.calculateFairTotalForLease(), isTotal: true }
        ]
        return (
            <div>
                {this.createConclusion(model)}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="none"> </TableCell>
                            <TableCell padding="none">Your Lease</TableCell>
                            <TableCell padding="none">Fair Lease</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(n => {
                            return (
                                <TableRow key={n.name}>
                                    <TableCell component="th" scope="row" padding="none">
                                        {n.name}
                                    </TableCell>
                                    <TableCell padding="none">
                                        <MoneyFormat id={makeCypressId(n.name, "your")} value={n.your} />
                                    </TableCell>
                                    <TableCell padding="none">
                                        <MoneyFormat id={makeCypressId(n.name, "fair")} value={n.fair} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }

    createConclusion(model) {
        return (model.isTitleTaxTooHigh() || model.isResidualValueTooLow())
            ? (<div>
                <TitleTaxWarning id="cy-titleTaxWarning" data={this.props.data} />
                <ResidualValueWarning id="cy-residualValueWarning" data={this.props.data} />
            </div>)
            : (model.isLeaseFair()
                ? (<HighlightBlock id="cy-positiveLease" type="positive">Lease appears to be  <em>fair</em>.</HighlightBlock>)
                : (<HighlightBlock id="cy-negativeLease" type="warning">We believe that <em>better deal</em> is possible.</HighlightBlock>)
            );
    }
}

LeaseAnalysis.propTypes = {
    data: LEASE_CALCULATOR_DATA_PROP_TYPES,
    onDataChanged: PropTypes.func,
}

export default withStyles(styles)(LeaseAnalysis);