import PropTypes from 'prop-types';

const STRING_OR_NUMBER_PROP_TYPES = PropTypes.number;

export const CAR_LOAN_CALCULATOR_DATA_PROP_TYPES = PropTypes.shape({
    msrp: STRING_OR_NUMBER_PROP_TYPES,
    downpayment: STRING_OR_NUMBER_PROP_TYPES,
    tradeIn: STRING_OR_NUMBER_PROP_TYPES,
    loanLenghtPeriods: PropTypes.number,
    monthlyPayment: STRING_OR_NUMBER_PROP_TYPES,
    interestRate: PropTypes.number,
    otherPayments: STRING_OR_NUMBER_PROP_TYPES,
});

const DEFAULT_DATA = {
    msrp: 0,
    downpayment: 0,
    checkedTradeInBtn: false,
    tradeIn:0,
    loanLenghtPeriods: 36,
    monthlyPayment: 0,
    checkedInterRateBtn: false,
    interestRate: 0,
    otherPayments: 0,
};

export class Model{
    constructor(data) {
        this.data = data ? data : DEFAULT_DATA
    }

    msrp() {
        return this.data.msrp;
    }

    downpayment() {
        return this.data.downpayment;
    }

    checkedTradeInBtn(){
        return this.data.checkedTradeInBtn;
    }

    tradeIn() {
        return this.data.tradeIn;
    }

    loanLenghtPeriods() {
        return this.data.loanLenghtPeriods;
    }

    monthlyPayment() {
        return this.data.monthlyPayment;
    }

    checkedInterRateBtn(){
        return this.data.checkedInterRateBtn;
    }

    interestRate() {
        return this.data.interestRate;
    }

    otherPayments() {
        return this.data.otherPayments;
    }

    totalPayment(){
        return this.downpayment() + this.tradeIn() + (12 * this.loanLenghtPeriods()* this.monthlyPayment())
    }

    totalPaymentPlusMSRP(){
        return this.totalPayment() - this.msrp()
    }

    totalInterestAcc(){
        return this.loanLenghtPeriods() * this.monthlyPayment() + this.downpayment()
    }

   result(){
       return (this.totalPayment()  - this.msrp()) - this.totalInterestAcc()
   }
}