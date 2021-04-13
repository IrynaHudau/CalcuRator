import { Model,CREDIT_SCORE_LEVEL,INTEREST_RATE_METHOD,STEP } from "../calculators/leaseCalculator/LeaseCalculatorCommons";
import each from "jest-each";

function checkModelHasDefaultValues(model) {
    expect(model.activeStep()).toEqual(0);
    expect(model.downpayment()).toEqual(0);
    expect(model.monthlyPayment()).toEqual(0);
    expect(model.monthInLease()).toEqual(36);
    expect(model.msrp()).toEqual(0);
    expect(model.residualValue()).toEqual(0);
    expect(model.titleTax()).toEqual(0);
    expect(model.interestRateMethod()).toEqual(INTEREST_RATE_METHOD.CreditScoreLevel);
    expect(model.creditScoreLevel()).toEqual(CREDIT_SCORE_LEVEL.Good);
    expect(model.interestRate()).toBeGreaterThan(0);
    expect(model.moneyFactor()).toEqual(0);
}

function getDefaultData() {
    return {
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
}

test("resetTest", () => {
    let model = new Model({
        activeStep: STEP.Credit,
        downpayment: 2000,
        monthlyPayment: 200,
        monthInLease: 24,
        msrp: 20000,
        residualValue: 13000,
        titleTax: 987,
        visitedSteps: [STEP.BaseLine, STEP.Credit],
        interestRateMethod: INTEREST_RATE_METHOD.InterestRate,
        creditScoreLevel: CREDIT_SCORE_LEVEL.Fair,
        interestRate: 0.06,
        moneyFactor: 0.009
    });
    expect(model.activeStep()).toEqual(STEP.Credit);
    expect(model.downpayment()).toEqual(2000);
    expect(model.monthlyPayment()).toEqual(200);
    expect(model.monthInLease()).toEqual(24);
    expect(model.msrp()).toEqual(20000);
    expect(model.residualValue()).toEqual(13000);
    expect(model.titleTax()).toEqual(987);
    expect(model.interestRateMethod()).toEqual(INTEREST_RATE_METHOD.InterestRate);
    expect(model.creditScoreLevel()).toEqual(CREDIT_SCORE_LEVEL.Fair);
    expect(model.interestRate()).toEqual(0.06);
    expect(model.moneyFactor()).toEqual(0.009);
    model.reset();
    checkModelHasDefaultValues(model);
});

each([
    [[], STEP.BaseLine, false],
    [[], STEP.Credit, false],
    [[], STEP.LeaseAnalysis, false],
    [[], STEP.LeaseTerm, false],
    [[STEP.BaseLine], STEP.BaseLine, true],
    [[STEP.Credit], STEP.Credit, true],
    [[STEP.LeaseAnalysis], STEP.LeaseAnalysis, true],
    [[STEP.LeaseTerm], STEP.LeaseTerm, true],
    [[STEP.Credit, STEP.LeaseAnalysis, STEP.LeaseTerm,], STEP.BaseLine, false],
    [[STEP.BaseLine, STEP.LeaseAnalysis, STEP.LeaseTerm,], STEP.Credit, false],
    [[STEP.BaseLine, STEP.Credit, STEP.LeaseTerm,], STEP.LeaseAnalysis, false],
    [[STEP.BaseLine, STEP.Credit, STEP.LeaseAnalysis], STEP.LeaseTerm, false],
    [[STEP.BaseLine, STEP.Credit, STEP.LeaseAnalysis, STEP.LeaseTerm,], STEP.BaseLine, true],
    [[STEP.BaseLine, STEP.Credit, STEP.LeaseAnalysis, STEP.LeaseTerm,], STEP.Credit, true],
    [[STEP.BaseLine, STEP.Credit, STEP.LeaseAnalysis, STEP.LeaseTerm,], STEP.LeaseAnalysis, true],
    [[STEP.BaseLine, STEP.Credit, STEP.LeaseAnalysis, STEP.LeaseTerm,], STEP.LeaseTerm, true],
]).test("isStepVisited", (visitedSteps, stepToCheck, result) => {
    let data = getDefaultData();
    data.visitedSteps = visitedSteps;
    let model = new Model(data);
    expect(model.isStepVisited(stepToCheck)).toEqual(result);
});

each([
    [STEP.BaseLine, null, true],
    [STEP.Credit, null, true],
    [STEP.LeaseAnalysis, null, true],
    [STEP.LeaseTerm, null, true],
    [STEP.BaseLine, [], true],
    [STEP.Credit, [], true],
    [STEP.LeaseAnalysis, [], true],
    [STEP.LeaseTerm, [], true],
    [STEP.BaseLine, [STEP.BaseLine], true],
    [STEP.Credit, [STEP.Credit], true],
    [STEP.LeaseAnalysis, [STEP.LeaseAnalysis], true],
    [STEP.LeaseTerm, [STEP.LeaseTerm], true],
    [STEP.BaseLine, [STEP.Credit, STEP.LeaseAnalysis, STEP.LeaseTerm,], true],
    [STEP.Credit, [STEP.BaseLine, STEP.LeaseAnalysis, STEP.LeaseTerm,], true],
    [STEP.LeaseAnalysis, [STEP.BaseLine, STEP.Credit, STEP.LeaseTerm,], true],
    [STEP.LeaseTerm, [STEP.BaseLine, STEP.Credit, STEP.LeaseAnalysis,], true],
    [STEP.BaseLine, [STEP.BaseLine, STEP.Credit, STEP.LeaseAnalysis, STEP.LeaseTerm,], true],
    [STEP.Credit, [STEP.BaseLine, STEP.Credit, STEP.LeaseAnalysis, STEP.LeaseTerm,], true],
    [STEP.LeaseAnalysis, [STEP.BaseLine, STEP.Credit, STEP.LeaseAnalysis, STEP.LeaseTerm,], true],
    [STEP.LeaseTerm, [STEP.BaseLine, STEP.Credit, STEP.LeaseAnalysis, STEP.LeaseTerm,], true],
]).test("markActiveStepVisited", (activeStep, visitedSteps, shouldBeVisited) => {
    let data = getDefaultData();
    data.visitedSteps = visitedSteps;
    data.activeStep = activeStep;
    if (visitedSteps !== null) {
        data.visitedSteps = visitedSteps;
    }
    let model = new Model(data);
    model.markActiveStepVisited();
    expect(model.isStepVisited(activeStep)).toEqual(shouldBeVisited);
    if (shouldBeVisited && model.visitedSteps) {
        expect(model.visitedSteps.filter(s => s == activeStep).length).toEqual(1);
    }
});

describe("Calculate Methods", () => {
    test("calculateTotalForLease", () => {
        let data = getDefaultData();
        data.downpayment = 1248;
        data.residualValue = 12000;
        data.monthInLease = 24;
        data.monthlyPayment = 217;
        let model = new Model(data);
        expect(model.calculateTotalForLease()).toEqual(1248 + (24 * 217));
    });

    each([
        [24, (24 * 217 + 1248) / 24],
        [0, 0],
    ]).test("calculateMonthlyPaymentIfNoDownpayment", (monthInLease, result) => {
        let data = getDefaultData();
        data.downpayment = 1248;
        data.residualValue = 12000;
        data.monthInLease = monthInLease;
        data.monthlyPayment = 217;
        data.interestRate = 0;
        let model = new Model(data);
        expect(model.calculateMonthlyPaymentIfNoDownpayment()).toEqual(result);
    });

    each([
        [INTEREST_RATE_METHOD.CreditScoreLevel, CREDIT_SCORE_LEVEL.Exceptional, null, null, 0.02],
        [INTEREST_RATE_METHOD.CreditScoreLevel, CREDIT_SCORE_LEVEL.VeryGood, null, null, 0.04],
        [INTEREST_RATE_METHOD.CreditScoreLevel, CREDIT_SCORE_LEVEL.Good, null, null, 0.07],
        [INTEREST_RATE_METHOD.CreditScoreLevel, CREDIT_SCORE_LEVEL.Fair, null, null, 0.14],
        [INTEREST_RATE_METHOD.CreditScoreLevel, "Non Existing Level", null, null, 0.07],
        [INTEREST_RATE_METHOD.InterestRate, null, 0.10, null, 0.10],
        [INTEREST_RATE_METHOD.InterestRate, null, 0, null, 0],
        [INTEREST_RATE_METHOD.MoneyFactor, null, null, 0.003, 0.003 * 24],
        [INTEREST_RATE_METHOD.MoneyFactor, null, null, 0, 0],
        ["Non Existing Method", CREDIT_SCORE_LEVEL.Exceptional, 0.023, 0.0098, 0],
    ]).test("interesetRate", (interestRateMethod, creditScoreLevel, interestRate, moneyFactor, result) => {
        let data = getDefaultData();
        data.interestRateMethod = interestRateMethod;
        data.creditScoreLevel = creditScoreLevel;
        data.interestRate = interestRate;
        data.moneyFactor = moneyFactor;
        let model = new Model(data);
        expect(model.interestRate()).toEqual(result);
    });

    test("calculateFairTotalForLease", () => {
        let data = getDefaultData();
        data.msrp = 27198;
        data.residualValue = 14051;
        data.interestRateMethod = INTEREST_RATE_METHOD.InterestRate;
        data.interestRate = 0.02;
        data.titleTax = 964;
        let model = new Model(data);
        expect(model.calculateFairTotalForLease()).toEqual(
            (27198 - 14051) +
            (27198 - 14051) * 0.02 +
            964);
    });

    each([
        [24, ((27198 - 14051) + (27198 - 14051) * 0.02 + 964) / 24],
        [36, ((27198 - 14051) + (27198 - 14051) * 0.02 + 964) / 36],
        [72, ((27198 - 14051) + (27198 - 14051) * 0.02 + 964) / 72],
        [0, 0],
    ]).test("calculateFairMonthlyPayment", (monthInLease, result) => {
        let data = getDefaultData();
        data.msrp = 27198;
        data.residualValue = 14051;
        data.interestRateMethod = INTEREST_RATE_METHOD.InterestRate;
        data.interestRate = 0.02;
        data.titleTax = 964;
        data.monthInLease = monthInLease;
        let model = new Model(data);
        expect(model.calculateFairMonthlyPayment()).toEqual(result);
    });

    each([
        [0, 0, 0, false],
        [1, 0, 0, false],
        [0, 1, 0, false],
        [0, 0, 1, false],
        [1, 1, 0, false],
        [1, 0, 1, false],
        [0, 1, 1, false],
        [20000, 10000, 1700, false],
        [20000, 10001, 1700, true],
        [20000, 10000, 1701, true],
        [20000, 20001, 1701, false],
        [20000, 10000, 1, false],
    ]).test("isTitleTaxTooHigh", (msrp, residualValue, titleTax, result) => {
        let data = getDefaultData();
        data.msrp = msrp;
        data.residualValue = residualValue;
        data.titleTax = titleTax;
        let model = new Model(data);
        expect(model.isTitleTaxTooHigh()).toEqual(result);
    });

    each([
        [20000, 10000, 1700, 220, true],
        [20000, 10000, 1700, 327, true],
        [20000, 10000, 1700, 328, false],
        [20000, 10000, 1700, 400, false],
    ]).test("isLeaseFair", (msrp, residualValue, titleTax, monthlyPayment, result) => {
        let data = getDefaultData();
        data.msrp = msrp;
        data.residualValue = residualValue;
        data.titleTax = titleTax;
        data.downpayment = 1000;
        data.interestRateMethod = INTEREST_RATE_METHOD.InterestRate;
        data.interestRate = 0.05;
        data.monthInLease = 36;
        data.monthlyPayment = monthlyPayment;
        let model = new Model(data);
        expect(model.isLeaseFair()).toEqual(result);
    });

    each([
        [0, 0, 36, false],
        [1, 0, 36, false],
        [0, 1, 36, false],
        [20000, 1, 36, true],
        [20000, 12282, 36, true],
        [20000, 12283, 36, false],
        [20000, 13000, 36, false],
        [20000, 1, 24, true],
        [20000, 14449, 24, true],
        [20000, 14450, 24, false],
        [20000, 14451, 24, false],
        [20000, 15000, 24, false],
    ]).test("isResidualValueTooLow", (msrp, residualValue, monthInLease, result) => {
        let data = getDefaultData();
        data.msrp = msrp;
        data.residualValue = residualValue;
        data.monthInLease = monthInLease;
        let model = new Model(data);
        expect(model.isResidualValueTooLow()).toEqual(result);
    });

    each([
        [0, 0, 0],
        [0, 10000, 0],
        [20000, 0, 100],
        [20000, 10000, 50],
    ]).test("calculateValueLossPercentile", (msrp, residualValue, result) => {
        let data = getDefaultData();
        data.msrp = msrp;
        data.residualValue = residualValue;
        let model = new Model(data);
        expect(model.calculateValueLossPercentile()).toEqual(result);
    });

    each([
        [0, 0, 1000],
        [20000, 0, 2400],
        [20000, 10000, 1700],
        // This should not happen, but just in case.
        [0, 10000, 300],
    ]).test("calculateFairTitleTaxValue", (msrp, residualValue, result) => {
        let data = getDefaultData();
        data.msrp = msrp;
        data.residualValue = residualValue;
        let model = new Model(data);
        expect(Math.round(model.calculateFairTitleTaxValue())).toEqual(result);
    });
});

describe("Validation", () => {
    each([
        [[STEP.Credit], 200, true],
        [[STEP.BaseLine], 200, true],
        [[STEP.Credit], 0, true],
        [[STEP.BaseLine], 0, false],
        [[STEP.Credit], -1, true],
        [[STEP.BaseLine], -1, false],
    ]).test("getMonthlyPaymentValidation", (visitedSteps, monthlyPayment, result) => {
        let data = getDefaultData();
        data.monthlyPayment = monthlyPayment;
        data.visitedSteps = visitedSteps;
        let model = new Model(data);
        let validation = model.getMonthlyPaymentValidation();
        const isValid = validation.isValid();
        expect(isValid).toEqual(result);
        if (!isValid) {
            expect(validation.getErrorText()).toBeTruthy();
        }
    });

    each([
        [[STEP.Credit], 200, true],
        [[STEP.LeaseTerm], 200, true],
        [[STEP.Credit], 0, true],
        [[STEP.LeaseTerm], 0, false],
        [[STEP.Credit], -1, true],
        [[STEP.LeaseTerm], -1, false],
    ]).test("getMsrpValidation", (visitedSteps, msrp, result) => {
        let data = getDefaultData();
        data.msrp = msrp;
        data.visitedSteps = visitedSteps;
        let model = new Model(data);
        let validation = model.getMsrpValidation();
        const isValid = validation.isValid();
        expect(isValid).toEqual(result);
        if (!isValid) {
            expect(validation.getErrorText()).toBeTruthy();
        }
    });

    each([
        [[STEP.Credit], 200, 100, true, undefined],
        [[STEP.Credi], 200, 200, true, undefined],
        [[STEP.Credi], 200, 201, true, undefined],
        [[STEP.Credi], 0, 300, true, undefined],
        [[STEP.Credi], -1, 300, true, undefined],
        [[STEP.Credi], 400, 0, true, undefined],
        [[STEP.Credi], 400, -1, true, undefined],
        [[STEP.Credi], 0, 0, true, undefined],
        [[STEP.LeaseTerm], 200, 100, true, undefined],
        [[STEP.LeaseTerm], 200, 200, false, true],
        [[STEP.LeaseTerm], 200, 201, false, true],
        [[STEP.LeaseTerm], 0, 300, true, true],
        [[STEP.LeaseTerm], -1, 300, true, true],
        [[STEP.LeaseTerm], 400, 0, false, true],
        [[STEP.LeaseTerm], 400, -1, false, true],
        [[STEP.LeaseTerm], 0, 0, false, true],
    ]).test("getResidualValueValidation", (visitedSteps, msrp, residualValue, result, resultMessageNonEmpty) => {
        let data = getDefaultData();
        data.msrp = msrp;
        data.visitedSteps = visitedSteps;
        data.residualValue = residualValue;
        let model = new Model(data);
        let validation = model.getResidualValueValidation();
        const isValid = validation.isValid();
        expect(isValid).toEqual(result);
        if (!isValid) {
            if (resultMessageNonEmpty) {
                expect(validation.getErrorText()).toBeTruthy();
            }
            else {
                expect(validation.getErrorText()).toBeFalsy();
            }
        }
    });

    each([
        [0.01, true, undefined],
        [0, true, undefined],
        [1, true, undefined],
        [-0.01, false, true],
        [1.01, false, true],
    ]).test("getInterestRateValidation-Method-InterestRate", (interestRate, result, resultMessageNonEmpty) => {
        let data = getDefaultData();
        data.interestRateMethod = INTEREST_RATE_METHOD.InterestRate;
        data.interestRate = interestRate;
        let model = new Model(data);
        let validation = model.getInterestRateValidation();
        const isValid = validation.isValid();
        expect(isValid).toEqual(result);
        if (!isValid) {
            if (resultMessageNonEmpty) {
                expect(validation.getErrorText()).toBeTruthy();
            }
            else {
                expect(validation.getErrorText()).toBeFalsy();
            }
        }
    });

    each([
        [CREDIT_SCORE_LEVEL.Exceptional, true, undefined],
        [CREDIT_SCORE_LEVEL.VeryGood, true, undefined],
        [CREDIT_SCORE_LEVEL.Good, true, undefined],
        [CREDIT_SCORE_LEVEL.Fair, true, undefined],
        ["Invalid Credit Score Level", true, undefined],
    ]).test("getInterestRateValidation-Method-CreditScoreLevel", (creditScoreLevel, result, resultMessageNonEmpty) => {
        let data = getDefaultData();
        data.interestRateMethod = INTEREST_RATE_METHOD.CreditScoreLevel;
        data.creditScoreLevel = creditScoreLevel;
        let model = new Model(data);
        let validation = model.getInterestRateValidation();
        const isValid = validation.isValid();
        expect(isValid).toEqual(result);
        if (!isValid) {
            if (resultMessageNonEmpty) {
                expect(validation.getErrorText()).toBeTruthy();
            }
            else {
                expect(validation.getErrorText()).toBeFalsy();
            }
        }
    });

    each([
        [0.1 / 24, true, undefined],
        [0, true, undefined],
        [1 / 24, true, undefined],
        // Interest Rate property validation will kick in only if
        // Interest Rate Method is INTEREST_RATE_METHOD.InterestRate
        [-0.1 / 24, true, true],
        [1.1 / 24, true, true],
    ]).test("getInterestRateValidation-Method-MoneyFactor", (moneyFactor, result, resultMessageNonEmpty) => {
        let data = getDefaultData();
        data.interestRateMethod = INTEREST_RATE_METHOD.MoneyFactor;
        data.moneyFactor = moneyFactor;
        let model = new Model(data);
        let validation = model.getInterestRateValidation();
        const isValid = validation.isValid();
        expect(isValid).toEqual(result);
        if (!isValid) {
            if (resultMessageNonEmpty) {
                expect(validation.getErrorText()).toBeTruthy();
            }
            else {
                expect(validation.getErrorText()).toBeFalsy();
            }
        }
    });

    each([
        [INTEREST_RATE_METHOD.MoneyFactor, 0.01 / 24, true, undefined],
        [INTEREST_RATE_METHOD.MoneyFactor, 0, true, undefined],
        [INTEREST_RATE_METHOD.MoneyFactor, 1 / 24, true, undefined],
        [INTEREST_RATE_METHOD.MoneyFactor, -0.01 / 24, false, true],
        [INTEREST_RATE_METHOD.MoneyFactor, 1.01 / 24, false, true],
        // Money Factor property validation will kick in only if
        // Interest Rate Method is INTEREST_RATE_METHOD.MoneyFactor
        [INTEREST_RATE_METHOD.CreditScoreLevel, 0.01 / 24, true, undefined],
        [INTEREST_RATE_METHOD.CreditScoreLevel, 0, true, undefined],
        [INTEREST_RATE_METHOD.CreditScoreLevel, 1 / 24, true, undefined],
        [INTEREST_RATE_METHOD.CreditScoreLevel, -0.01 / 24, true, undefined],
        [INTEREST_RATE_METHOD.CreditScoreLevel, 1.01 / 24, true, undefined],
        [INTEREST_RATE_METHOD.InterestRat, 0.01 / 24, true, undefined],
        [INTEREST_RATE_METHOD.InterestRat, 0, true, undefined],
        [INTEREST_RATE_METHOD.InterestRat, 1 / 24, true, undefined],
        [INTEREST_RATE_METHOD.InterestRat, -0.01 / 24, true, undefined],
        [INTEREST_RATE_METHOD.InterestRate, 1.01 / 24, true, undefined],
    ]).test("getMoneyFactorValidation", (interestRateMethod, moneyFactor, result, resultMessageNonEmpty) => {
        let data = getDefaultData();
        data.interestRateMethod = interestRateMethod;
        data.moneyFactor = moneyFactor;
        let model = new Model(data);
        let validation = model.getMoneyFactorValidation();
        const isValid = validation.isValid();
        expect(isValid).toEqual(result);
        if (!isValid) {
            if (resultMessageNonEmpty) {
                expect(validation.getErrorText()).toBeTruthy();
            }
            else {
                expect(validation.getErrorText()).toBeFalsy();
            }
        }
    });
});