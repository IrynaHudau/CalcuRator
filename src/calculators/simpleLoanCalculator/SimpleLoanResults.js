import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import MoneyFormat from '../../primitives/MoneyFormat';
import { ModelPropTypes } from "./LoanCalculatorCommon";
import MUIDataTable from "mui-datatables";

const styles = theme => ({
    noData: {
        padding: theme.spacing.unit * 2,
    },
    tableCell: {
        padding: 1
    }
});

class SimpleLoanResults extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderNoData(classes) {
        return (
            <Typography id="simpleLoanResultsNoData" color="secondary" align="center" variant="button" className={classes.noData}>
                Unable to calculate Payments Breakdown. Please, complete required fields.
            </Typography>
        );
    }

    renderTable(data, classes) {
        const columns = [
            {
                name: "paymentNo",
                label: "#",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "startingBalance",
                label: "Balance",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "payment",
                label: "Payment",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "principalPayed",
                label: "Principal",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "interestPayed",
                label: "Interest",
                options: {
                    filter: false,
                    sort: false,
                }
            },
        ];

        data = data.map(p => [
            p.paymentNo,
            <MoneyFormat className={classes.tableCell} prefix="" fixedDecimalScale value={p.startingBalance} />,
            <MoneyFormat className={classes.tableCell} prefix="" fixedDecimalScale value={p.payment} />,
            <MoneyFormat className={classes.tableCell} prefix="" fixedDecimalScale value={p.principalPayed} />,
            <MoneyFormat className={classes.tableCell} prefix="" fixedDecimalScale value={p.interestPayed} />
        ]);

        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            pagination: true,
            sort: false,
            filter: false,
            download: false,
            selectableRows: false
        };

        return (
            <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    title={"Paments Breakdown"}
                    data={data}
                    columns={columns}
                    options={options}>
                </MUIDataTable>
            </MuiThemeProvider>
        );
    }

    render() {
        const { model, classes } = this.props;
        const data = model.getPaymentSchedule();
        return (
            <div id="simpleLoanResultsWithData">
                {(data && data.length > 0) ? this.renderTable(data, classes) : this.renderNoData(classes)}
            </div>
        );
    }


    getMuiTheme() {
        return createMuiTheme({
            overrides: {
                // Override paddings so that cell will not take excessive space
                // and will fit into the screen without horisontal scroll.
                MuiTableCell: {
                    root: {
                        padding: "4px 12px 4px 12px"
                    }
                }
            }
        });
    }
}

SimpleLoanResults.propTypes = {
    model: ModelPropTypes
}

export default withStyles(styles)(SimpleLoanResults);