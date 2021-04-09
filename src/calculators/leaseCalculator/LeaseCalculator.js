import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BaselineStep from './BaselineStep';
import LeaseAnalysis from './LeaseAnalysis';
import { LEASE_CALCULATOR_DATA_PROP_TYPES, Model, STEP } from './LeaseCalculatorCommons';
import LeaseCredit from './LeaseCredit';
import LeaseTermStep from "./LeaseTermStep";
import { copyApply } from '../../utils/apply';

const styles = theme => ({
    root: {
        //width: '100%',
        //...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    stepContent: {
        padding: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 3,
    },
    backButton: {
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
    },
    nextButton: {
        marginTop: theme.spacing.unit * 2,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

class LeaseCalculator extends React.Component {

    handleNext = () => {
        const model = new Model(this.props.data);
        let stepMove = 1;
        model.markActiveStepVisited();
        switch (model.activeStep()) {
            case STEP.BaseLine:
                if (!model.getMonthlyPaymentValidation().isValid()) {
                    stepMove = 0;
                }
                break;
            case STEP.LeaseTerm:
                if (!model.getMsrpValidation().isValid() || !model.getResidualValueValidation().isValid()) {
                    stepMove = 0;
                }
                break;
            // case STEP.LeaseAnalysis:
            //     model.reset();
            //     stepMove = 0;
            //     break;
            default:
                break;
        }
        this.props.onDataChanged(copyApply(model.data, { activeStep: model.activeStep() + stepMove }));
    };

    handleBack = () => {
        const model = new Model(this.props.data);
        this.props.onDataChanged(copyApply(model.data, { activeStep: model.activeStep() - 1 }));
    };

    handleReset = () => {
        const model = new Model(this.props.data);
        model.reset();
        this.props.onDataChanged(model.data);
    };

    componentWillUnmount() {
        // Clean up state data before destroying the component
        // so next time it will be opened fresh.
        const model = new Model(this.props.data);
        model.reset();
        this.props.onDataChanged(model.data);
    }

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const model = new Model(this.props.data);
        const activeStep = model.activeStep();
        const stepContent = activeStep === steps.length ? (
            <div>
                <Typography className={classes.instructions}>
                    Thanks for using CalcuRaptor!
                </Typography>
                <Typography className={classes.instructions}>
                    Press "Reset" to start over.
                    {/* TODO: Place for ADDS */}
                </Typography>
                <Button id="cy-buttonReset" onClick={this.handleReset}>Reset</Button>
            </div>) : (
                <div>
                    {this.getStepContent(activeStep)}
                    <div>
                        <Button id="cy-buttonBack" variant="outlined" color="primary" disabled={activeStep === 0} onClick={this.handleBack} className={classes.backButton}>
                            Back
                        </Button>
                        <Button id="cy-buttonNext" variant="contained" color="primary" onClick={this.handleNext} className={classes.nextButton}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>);
        return (
            <div className={classes.root}>
                <Typography variant="h5" align="center" gutterBottom>Car Lease</Typography>
                <Paper>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map(label => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div className={classes.stepContent}>{stepContent}</div>
                </Paper>
            </div>
        );
    }

    getSteps() {
        return ['Lease Basics', 'Lease Terms', 'Credit', 'Analysis'];
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case STEP.BaseLine:
                return <BaselineStep data={this.props.data} onDataChanged={this.props.onDataChanged} />;
            case STEP.LeaseTerm:
                return <LeaseTermStep data={this.props.data} onDataChanged={this.props.onDataChanged} />;
            case STEP.Credit:
                return <LeaseCredit data={this.props.data} onDataChanged={this.props.onDataChanged} />
            case STEP.LeaseAnalysis:
                return <LeaseAnalysis data={this.props.data} onDataChanged={this.props.onDataChanged} />;
            default:
                return 'Uknown stepIndex';
        }
    }
}

LeaseCalculator.propTypes = {
    onDataChanged: PropTypes.func,
    data: LEASE_CALCULATOR_DATA_PROP_TYPES,
    classes: PropTypes.object,
};

export default withStyles(styles)(LeaseCalculator);
