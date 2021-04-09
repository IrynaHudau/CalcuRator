import clone from 'clone';
import PropTypes from 'prop-types';
import { Validation } from "../../primitives/Validation";


export const CREDIT_SCORE_LEVEL = {
    Fair: "Fair",
    Good: "Good",
    VeryGood: "VeryGood",
    Exceptional: "Exceptional"
};

export const INTEREST_RATE_METHOD = {
    CreditScoreLevel: "CreditScoreLevel",
    InterestRate: "InterestRate",
    MoneyFactor: "MoneyFactor"
};

export const STEP = {
    BaseLine: 0,
    LeaseTerm: 1,
    Credit: 2,
    LeaseAnalysis: 3
};

const DEFAULT_DATA = {
    activeStep: 0,
    downpayment: 0,
    monthlyPayment: 0,
    monthInLease: 36,
    msrp: 0,
    residualValue: 0,
    titleTax: 0,
    visitedSteps: [],
    interestRateMethod: INTEREST_RATE_METHOD.CreditScoreLevel,
    creditScoreLevel: CREDIT_SCORE_LEVEL.Good,
    interestRate: 0,
    moneyFactor: 0
};

// const DEFAULT_DATA = {
//     activeStep: STEP.Credit,
//     downpayment: 3000,
//     monthlyPayment: 325,
//     monthInLease: 36,
//     msrp: 36000,
//     residualValue: 24000,
//     titleTax: 1800,
//     visitedSteps: [STEP.BaseLine, STEP.LeaseTerm, STEP.Credit],
//     interestRateMethod: INTEREST_RATE_METHOD.CreditScoreLevel,
//     creditScoreLevel: CREDIT_SCORE_LEVEL.Good,
//     interestRate: 0.035,
//     moneyFactor: 0.00145
// };

const STRING_OR_NUMBER_PROP_TYPES = PropTypes.number;

export const LEASE_CALCULATOR_DATA_PROP_TYPES = PropTypes.shape({
    activeStep: PropTypes.number,
    downpayment: STRING_OR_NUMBER_PROP_TYPES,
    monthlyPayment: STRING_OR_NUMBER_PROP_TYPES,
    monthInLease: STRING_OR_NUMBER_PROP_TYPES,
    msrp: STRING_OR_NUMBER_PROP_TYPES,
    residualValue: STRING_OR_NUMBER_PROP_TYPES,
    titleTax: STRING_OR_NUMBER_PROP_TYPES,
    visitedSteps: PropTypes.arrayOf(PropTypes.number),
    interestRateMethod: PropTypes.string,
    creditScoreLevel: PropTypes.string,
    interestRate: PropTypes.number,
    moneyFactor: PropTypes.number
});

// Assume tax is 7%
const TAX_FAIR_RATE = 0.07;
// Assume title fee is about $1000
const TITLE_FEE = 1000;

function calculateDepreciation(msrpOfNew, yearsOld) {
    let value = msrpOfNew;
    // 15% per year
    const DEPRECIATION_RATE_PER_YEAR = 0.15;
    for (let year = 0; year < yearsOld; year++) {
        value = value - value * DEPRECIATION_RATE_PER_YEAR;
    }
    return value;
}

/**
 * @function getInterestRateByCreditScoreLevel
 * @param  {string} creditScoreLevel CREDIT_SCORE_LEVEL
 * @return {number} Interest rate in %
 */
function getInterestRateByCreditScoreLevel(creditScoreLevel) {
    switch (creditScoreLevel) {
        case CREDIT_SCORE_LEVEL.Exceptional:
            return 0.02;
        case CREDIT_SCORE_LEVEL.VeryGood:
            return 0.04;
        case CREDIT_SCORE_LEVEL.Good:
            return 0.07;
        case CREDIT_SCORE_LEVEL.Fair:
            return 0.14;
        default:
            return 0.07;
    }
}

export class Model {
    constructor(data) {
        this.data = data ? data : clone(DEFAULT_DATA);
    }

    activeStep() {
        return this.data.activeStep;
    }

    downpayment() {
        return this.data.downpayment;
    }

    monthlyPayment() {
        return this.data.monthlyPayment;
    }

    monthInLease() {
        return this.data.monthInLease;
    }

    msrp() {
        return this.data.msrp;
    }

    residualValue() {
        return this.data.residualValue;
    }

    titleTax() {
        return this.data.titleTax;
    }

    interestRateMethod() {
        return this.data.interestRateMethod;
    }

    creditScoreLevel() {
        return this.data.creditScoreLevel;
    }

    moneyFactor() {
        return this.data.moneyFactor;
    }

    calculateTotalForLease() {
        return this.monthInLease() * this.monthlyPayment() + this.downpayment()
    }

    calculateMonthlyPaymentIfNoDownpayment() {
        return this.monthInLease()
            ? this.calculateTotalForLease() / this.monthInLease()
            : 0;
    }

    calculateFairTotalForLease() {
        const total = this.msrp() - this.residualValue();
        const interest = total * this.interestRate();
        return total + interest + this.titleTax();
    }

    calculateFairMonthlyPayment() {
        return this.monthInLease() > 0
            ? (this.calculateFairTotalForLease() - this.downpayment()) / this.monthInLease()
            : 0;
    }

    isLeaseFair() {
        const totalForLease = this.calculateTotalForLease();
        const totalFairForLease = this.calculateFairTotalForLease();
        const diffPercentOfMsrpAndTax = (totalForLease - totalFairForLease) / this.msrp() * 100;
        // Let's consider lease fair if difference between lowest lease and current is less than 3% of MSRP.
        return diffPercentOfMsrpAndTax < 3;
    }

    isTitleTaxTooHigh() {
        if (this.msrp() <= 0 || this.residualValue() <= 0 || this.titleTax() <= 0) {
            return false;
        }
        const tax = this.titleTax() - TITLE_FEE;
        const msrpLessResidual = this.msrp() - this.residualValue();
        if (tax < 0 || msrpLessResidual < 0) {
            return false;
        }

        const taxRate = tax / msrpLessResidual;
        // We expect tax be lower than 7% of the difference between MSRP and Residual value.
        return taxRate > TAX_FAIR_RATE;
    }

    isResidualValueTooLow() {
        if (this.msrp() <= 0 || this.residualValue() <= 0) {
            return false;
        }
        const remainingValueAfterLease = calculateDepreciation(this.msrp(), this.monthInLease() / 12);
        return this.residualValue() < remainingValueAfterLease;
    }

    calculateValueLossPercentile() {
        return this.msrp() > 0
            ? (this.msrp() - this.residualValue()) / this.msrp() * 100
            : 0;
    }

    interestRate() {
        switch (this.data.interestRateMethod) {
            case INTEREST_RATE_METHOD.CreditScoreLevel:
                return getInterestRateByCreditScoreLevel(this.data.creditScoreLevel);
            case INTEREST_RATE_METHOD.InterestRate:
                return this.data.interestRate;
            case INTEREST_RATE_METHOD.MoneyFactor:
                // Money Factor = Interest Rate % / 2400 OR
                // Money Factor = Interest Rate / 24
                return this.data.moneyFactor * 24;
            default:
                return 0;
        }
    }

    getMonthlyPaymentValidation() {
        return new Validation(
            this,
            (model) => !model.isStepVisited(STEP.BaseLine) || model.monthlyPayment() > 0,
            (model) => "Monthly Payment is required."
        )
    }

    getMsrpValidation() {
        return new Validation(
            this,
            (model) => !model.isStepVisited(STEP.LeaseTerm) || model.msrp() > 0,
            (model) => "MSRP or Base Payment is required."
        )
    }

    getResidualValueValidation() {
        return new Validation(
            this,
            (model) => {
                if (!model.isStepVisited(STEP.LeaseTerm)) {
                    return true;
                }
                if (model.residualValue() <= 0) {
                    return false;
                }
                return model.msrp() <= 0 || model.residualValue() < model.msrp()
            },
            (model) => {
                if (model.residualValue() <= 0) {
                    return "Residual Value is required.";
                }
                if (model.residualValue() >= model.msrp()) {
                    return "Residual Value should be less than MSRP."
                }
            }
        )
    }

    getInterestRateValidation() {
        return new Validation(
            this,
            (model) => {
                if (model.interestRateMethod() !== INTEREST_RATE_METHOD.InterestRate) {
                    return true;
                }
                const interestRate = model.interestRate();
                return 0 <= interestRate && interestRate <= 1;
            },
            (model) => {
                if (model.interestRate() < 0) {
                    return "Interest Rate should be a positive number.";
                }
                if (model.interestRate() > 1) {
                    return "Interest Rate is too high."
                }
            }
        )
    }

    getMoneyFactorValidation() {
        return new Validation(
            this,
            (model) => {
                if (model.interestRateMethod() !== INTEREST_RATE_METHOD.MoneyFactor) {
                    return true;
                }
                const moneyFactor = model.moneyFactor();
                return 0 <= moneyFactor && moneyFactor <= 1 / 24;
            },
            (model) => {
                if (model.moneyFactor() < 0) {
                    return "Money Factor should be a positive number.";
                }
                if (model.moneyFactor() > 1 / 24) {
                    return "Money Factor is too large. It should be a small decimal number, e.g. 0.002187. If on your lease you see number larger than 1, then devide it by a 1,000."
                }
            }
        )
    }

    calculateFairTitleTaxValue() {
        return (this.msrp() - this.residualValue()) * TAX_FAIR_RATE + TITLE_FEE;
    }

    isStepVisited(step) {
        return this.data.visitedSteps !== null && this.data.visitedSteps.includes(step);
    }

    markActiveStepVisited() {
        if (this.data.visitedSteps === null) {
            this.data.visitedSteps = [];
        }
        if (!this.data.visitedSteps.includes(this.activeStep())) {
            this.data.visitedSteps.push(this.activeStep());
        }
    }

    reset() {
        this.data = clone(DEFAULT_DATA);
    }
}