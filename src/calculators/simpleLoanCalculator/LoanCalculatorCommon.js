import PropTypes from 'prop-types';
import { round } from "../../math/Helpers";
import { AmortizingFixedRateLoanModel } from "../../math/InterestRate";
import { Validation } from "../../primitives/Validation";
import clone from "clone";

export const LOAN_TYPE = {
    Fixed30Years: 1,
    Fixed15Years: 2,
    Custom: 3
};

export const DOWNPAYMNET_ENTRY_MODE = {
    Percentage: 1,
    MoneyAmount: 2
};

export const SIMPLE_LOAN_CALCULATOR_DATA_PROP_TYPES = PropTypes.shape({
    totalNeed: PropTypes.number,
    downpaymentMode: PropTypes.number,
    downpayment: PropTypes.number,
    interestRate: PropTypes.number,
    loanType: PropTypes.number,
    loanLenghtPeriods: PropTypes.number,
    paymentsPerPeriod: PropTypes.number
});

export const ModelPropTypes = PropTypes.shape({
    totalNeed: PropTypes.func,
    downpaymentMode: PropTypes.func,
    downpayment: PropTypes.func,
    downpaymentPercent: PropTypes.func,
    interestRate: PropTypes.func,
    loanType: PropTypes.func,
    loanLenghtPeriods: PropTypes.func,
    paymentsPerPeriod: PropTypes.func,
    getTotalPaymnetForLoanLifetime: PropTypes.func,
    getTotalInterestAccrued: PropTypes.func,
    getMontlyPayment: PropTypes.func,
    getPaymentSchedule: PropTypes.func,
});

export const SIMPLE_LOAN_MODE = {
    SimpleLoan: 1,
    Mortgage: 2
};

// This shows 30 year fixed rate loan
const SIMPLE_LOAN_DEFAULT_DATA = {
    totalNeed: 100000,
    downpaymentMode: DOWNPAYMNET_ENTRY_MODE.Percentage,
    downpayment: 0,
    interestRate: 0.04725,
    loanType: LOAN_TYPE.Fixed30Years,
    loanLenghtPeriods: 0,
    paymentsPerPeriod: 0,
};

const MORTGAGE_DEFAULT_DATA = {
    totalNeed: 100000,
    downpaymentMode: DOWNPAYMNET_ENTRY_MODE.Percentage,
    downpayment: 20000,
    interestRate: 0.04725,
    loanType: LOAN_TYPE.Fixed30Years,
    loanLenghtPeriods: 0,
    paymentsPerPeriod: 0,
};

function numberOrZero(mayBeNumber) {
    mayBeNumber = parseFloat(mayBeNumber);
    return mayBeNumber ? mayBeNumber : 0;
}

function getDefaultData(mode) {
    return mode === SIMPLE_LOAN_MODE.Mortgage ? clone(MORTGAGE_DEFAULT_DATA) : clone(SIMPLE_LOAN_DEFAULT_DATA);
}

export class Model {
    constructor(data, mode) {
        this.mode = mode ? mode : SIMPLE_LOAN_MODE.SimpleLoan;
        this.data = data ? data : getDefaultData(this.mode);
        this.amortizingModel = this.createAmortizingModel();
        this.schedule = null;
    }

    createAmortizingModel() {
        switch (this.data.loanType) {
            case LOAN_TYPE.Fixed30Years:
                return new AmortizingFixedRateLoanModel(
                    numberOrZero(this.data.totalNeed) - numberOrZero(this.downpayment()),
                    numberOrZero(this.data.interestRate),
                    30,
                    12);
            case LOAN_TYPE.Fixed15Years:
                return new AmortizingFixedRateLoanModel(
                    numberOrZero(this.data.totalNeed) - numberOrZero(this.downpayment()),
                    numberOrZero(this.data.interestRate),
                    15,
                    12);
            case LOAN_TYPE.Custom:
                return new AmortizingFixedRateLoanModel(
                    numberOrZero(this.data.totalNeed) - numberOrZero(this.downpayment()),
                    numberOrZero(this.data.interestRate),
                    numberOrZero(this.data.loanLenghtPeriods),
                    numberOrZero(this.data.paymentsPerPeriod));
            default:
                throw Error(`Loan Type ${this.data.loanType} is not supported`);
        }
    }

    totalNeedValidation = fieldName => new Validation(
        this,
        (model) => {
            if (model.totalNeed() <= 0) {
                return false;
            }
            if (model.downpayment() >= model.totalNeed()) {
                return false;
            }
            return true;
        },
        (model) => {
            if (model.totalNeed() <= 0) {
                return fieldName + " is expected to be greater than 0.";
            }
            if (model.downpayment() >= model.totalNeed()) {
                return fieldName + " is expected to be greater than Downpayment";
            }
            return null;
        }
    );

    downpaymentValidation = totalNeedFieldName => new Validation(
        this,
        (model) => {
            if (model.data.downpaymentMode !== DOWNPAYMNET_ENTRY_MODE.MoneyAmount) {
                return true;
            }
            if (model.downpayment() < 0) {
                return false;
            }
            if (model.downpayment() >= model.totalNeed()) {
                return false;
            }
            return true;
        },
        (model) => {
            if (model.downpayment() < 0) {
                return "Downpayment is expected to be greater or equal to 0.";
            }
            if (model.downpayment() >= model.totalNeed()) {
                return "Downpayment is expected to be less than " + totalNeedFieldName;
            }
            return null;
        }
    );

    downpaymentPercentValidation = new Validation(
        this,
        (model) => {
            if (model.data.downpaymentMode !== DOWNPAYMNET_ENTRY_MODE.Percentage) {
                return true;
            }
            if (model.downpaymentPercent() < 0) {
                return false;
            }
            if (model.downpaymentPercent() >= 1) {
                return false;
            }
            return true;
        },
        (model) => {
            if (model.downpaymentPercent() < 0) {
                return "Downpayment Percent is expected to be greater or equal to 0.";
            }
            if (model.downpaymentPercent() >= 1) {
                return "Downpayment Percent is expected to be less than 100 %";
            }
            return null;
        }
    );

    interestRateValidation = new Validation(
        this,
        (model) => {
            if (model.interestRate() <= 0) {
                return false;
            }
            return true;
        },
        (model) => {
            if (model.interestRate() <= 0) {
                return "Interest Rate is expected to be greater than 0.";
            }
            return null;
        }
    );

    loanLengthValidation = new Validation(
        this,
        (model) => {
            if (model.loanLenghtPeriods() <= 0) {
                return false;
            }
            if (model.loanLenghtPeriods() > 1000) {
                return false;
            }
            return true;
        },
        (model) => {
            if (model.loanLenghtPeriods() <= 0) {
                return "Loan Length is expected to be greater than 0.";
            }
            if (model.loanLenghtPeriods() > 1000) {
                return "Loan Length is too large.";
            }
            return null;
        }
    );

    paymentsPerPeriodValidation = new Validation(
        this,
        (model) => {
            if (model.paymentsPerPeriod() <= 0) {
                return false;
            }
            if (model.paymentsPerPeriod() > 30) {
                return false;
            }
            return true;
        },
        (model) => {
            if (model.paymentsPerPeriod() <= 0) {
                return "It's expected to have more than 0 payments per period.";
            }
            if (model.paymentsPerPeriod() > 30) {
                return "Number of Payments per period is too large.";
            }
            return null;
        }
    );

    totalNeed() {
        return this.data.totalNeed;
    }

    setTotalNeed(totalNeed) {
        if (this.data.downpaymentMode === DOWNPAYMNET_ENTRY_MODE.Percentage) {
            this.data.downpayment = totalNeed * this.downpaymentPercent();
        }
        this.data.totalNeed = totalNeed;
    }

    downpaymentMode() {
        return this.data.downpaymentMode;
    }

    downpayment() {
        return this.data.downpayment;
    }

    setDownpayment(downpayment) {
        if (this.data.downpaymentMode === DOWNPAYMNET_ENTRY_MODE.MoneyAmount) {
            this.data.downpayment = downpayment;
        }
    }

    downpaymentPercent() {
        return this.data.totalNeed === 0 ? 0 : this.data.downpayment / this.data.totalNeed;
    }

    setDownpaymentPercent(downpaymentPercent) {
        if (this.data.downpaymentMode === DOWNPAYMNET_ENTRY_MODE.Percentage) {
            this.data.downpayment = this.data.totalNeed * downpaymentPercent;
        }
    }

    interestRate() {
        return this.data.interestRate;
    }

    loanType() {
        return this.data.loanType;
    }

    loanLenghtPeriods() {
        switch (this.data.loanType) {
            case LOAN_TYPE.Fixed30Years:
                return 30;
            case LOAN_TYPE.Fixed15Years:
                return 15;
            default:
                return this.data.loanLenghtPeriods;
        }
    }

    isModelValid() {
        return this.totalNeedValidation().isValid() &&
            this.downpaymentValidation().isValid() &&
            this.interestRateValidation.isValid() &&
            this.loanLengthValidation.isValid() &&
            this.paymentsPerPeriodValidation.isValid();
    }

    paymentsPerPeriod() {
        switch (this.data.loanType) {
            case LOAN_TYPE.Fixed30Years:
            case LOAN_TYPE.Fixed15Years:
                return 12;
            default:
                return this.data.paymentsPerPeriod;
        }
    }

    getTotalNeedValidation() {
        return this.totalNeedValidation(this.mode === SIMPLE_LOAN_MODE.Mortgage ? "Home Price" : "Loan Amount");
    }

    getDownpaymentValidation() {
        return this.downpaymentValidation(this.mode === SIMPLE_LOAN_MODE.Mortgage ? "Home Price" : "Loan Amount");
    }

    getDownpaymentPercentValidation() {
        return this.downpaymentPercentValidation;
    }

    getInterestRateValidation() {
        return this.interestRateValidation;
    }

    getLoanLengthValidation() {
        return this.loanLengthValidation;
    }

    getPaymentsPerPeriodValidation() {
        return this.paymentsPerPeriodValidation;
    }

    /**
     * Calculates total amount payed over loan lifetime
     */
    getTotalPaymnetForLoanLifetime() {
        return this.data.totalNeed - this.downpayment() + this.getTotalInterestAccrued();
    }

    /**
     * Calculates total interest accrued
     */
    getTotalInterestAccrued() {
        let schedule = this.getPaymentSchedule();
        if (!schedule || schedule.length < 1) {
            return 0;
        }
        return round(schedule[schedule.length - 1].totalInterest, 2);
    }

    /**
     * Calculated montly payment
     */
    getMontlyPayment() {
        if (!this.isModelValid()) {
            return 0;
        }
        return round(this.amortizingModel.getPeriodicPaymentAmount(), 2);
    }

    /**
     * Calculates and returns payment schedule
     */
    getPaymentSchedule() {
        if (!this.isModelValid()) {
            return [];
        }

        if (!this.schedule) {
            this.schedule = this.amortizingModel.getPaymentSchedule();
        }
        return this.schedule;
    }
}