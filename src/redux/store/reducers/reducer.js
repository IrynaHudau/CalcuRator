import * as actionType from '../actions/actionTypes';

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LeaseCalculatorDataChanged:
            return {
                ...state,
                leaseCalculatorData: action.payload
            }
        case actionType.SimpleLoanCalculatorDataChanged:
            return {
                ...state,
                simpleLoanCalculatorData: action.payload
            }
        case actionType.MortgageCalculatorDataChanged:
            return {
                ...state,
                mortgageCalculatorData: action.payload
            }
        case actionType.CarLoanCalculatorDataChanged:
            return {
                ...state,
                carLoanCalculatorData: action.payload
            }
        default: return state;
    }
};

export default reducer;