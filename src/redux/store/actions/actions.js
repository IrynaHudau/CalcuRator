import * as actionType from './actionTypes';

export const createLeaseCalculatorDataChanged = (leaseCalculatorData) => {
    return {
        type: actionType.LeaseCalculatorDataChanged,
        payload: leaseCalculatorData
    };
};

export const createSimpleLoanCalculatorDataChanged = (simpleLoanCalculatorData) => {
    return {
        type: actionType.SimpleLoanCalculatorDataChanged,
        payload: simpleLoanCalculatorData
    };
};

export const createMortgageCalculatorDataChanged = (mortgageCalculatorData) => {
    return {
        type: actionType.MortgageCalculatorDataChanged,
        payload: mortgageCalculatorData
    };
};

export const createCarLoanCalculatorDataChanged = (carLoanCalculatorData) => {
    return{
        type: actionType.CarLoanCalculatorDataChanged,
        payload: carLoanCalculatorData
    };
};