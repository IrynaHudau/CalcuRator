import { Model, LOAN_TYPE, SIMPLE_LOAN_MODE, DOWNPAYMNET_ENTRY_MODE } from "../calculators/simpleLoanCalculator/LoanCalculatorCommon";
import each from "jest-each";

test("createWithNoData", () => {
    let model = new Model();
    expect(model.getMontlyPayment()).toBeGreaterThan(0);
    expect(model.getTotalInterestAccrued()).toBeGreaterThan(0);
    expect(model.getTotalPaymnetForLoanLifetime()).toBeGreaterThan(0);
    expect(model.downpaymentMode()).toEqual(DOWNPAYMNET_ENTRY_MODE.Percentage);
    const paymentSchedule = model.getPaymentSchedule();
    expect(paymentSchedule.length).toBeGreaterThan(0);
    paymentSchedule.forEach(pmt => {
        expect(pmt.paymentNo).toBeGreaterThan(0);
    });

    let totalExpected = model.totalNeed() * 10;
    model.setTotalNeed(totalExpected);
    expect(model.totalNeed()).toEqual(totalExpected);
});

each([
    [DOWNPAYMNET_ENTRY_MODE.Percentage],
    [DOWNPAYMNET_ENTRY_MODE.MoneyAmount]
]).test("createWithDataButNoMode", (downpaymentMode) => {
    let data = {
        totalNeed: 100000,
        downpaymentMode: downpaymentMode,
        downpayment: 5000,
        interestRate: 0.05,
        loanType: LOAN_TYPE.Fixed30Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0
    };
    const model = new Model(data);
    expect(model.totalNeed()).toEqual(100000);
    expect(model.downpayment()).toEqual(5000);
    expect(model.downpaymentPercent()).toEqual(0.05);
    expect(model.interestRate()).toEqual(0.05);
    expect(model.loanType()).toEqual(LOAN_TYPE.Fixed30Years);
    expect(model.loanLenghtPeriods()).toEqual(30);
    expect(model.paymentsPerPeriod()).toEqual(12);
    expect(model.getMontlyPayment()).toBeGreaterThan(0);
    expect(model.getTotalInterestAccrued()).toBeGreaterThan(0);
    expect(model.getTotalPaymnetForLoanLifetime()).toBeGreaterThan(0);
    expect(model.getTotalPaymnetForLoanLifetime()).toEqual(100000 - 5000 + model.getTotalInterestAccrued());
    const paymentSchedule = model.getPaymentSchedule();
    expect(paymentSchedule.length).toEqual(360);
    paymentSchedule.forEach(pmt => {
        expect(pmt.paymentNo).toBeGreaterThan(0);
    });
});

each([
    [SIMPLE_LOAN_MODE.SimpleLoan, DOWNPAYMNET_ENTRY_MODE.Percentage],
    [SIMPLE_LOAN_MODE.SimpleLoan,DOWNPAYMNET_ENTRY_MODE.MoneyAmount],
    [SIMPLE_LOAN_MODE.Mortgage, DOWNPAYMNET_ENTRY_MODE.Percentage],
    [SIMPLE_LOAN_MODE.Mortgage,DOWNPAYMNET_ENTRY_MODE.MoneyAmount],
]).test("createWithFixed30Y", (mode, downpaymentMode) => {
    let data = {
        totalNeed: 100000,
        downpaymentMode: downpaymentMode,
        downpayment: 5000,
        interestRate: 0.05,
        loanType: LOAN_TYPE.Fixed30Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0,
    };
    const model = new Model(data, mode);
    expect(model.totalNeed()).toEqual(100000);
    expect(model.downpayment()).toEqual(5000);
    expect(model.downpaymentPercent()).toEqual(0.05);
    expect(model.interestRate()).toEqual(0.05);
    expect(model.loanType()).toEqual(LOAN_TYPE.Fixed30Years);
    expect(model.loanLenghtPeriods()).toEqual(30);
    expect(model.paymentsPerPeriod()).toEqual(12);
    expect(model.getMontlyPayment()).toBeGreaterThan(0);
    expect(model.getTotalInterestAccrued()).toBeGreaterThan(0);
    expect(model.getTotalPaymnetForLoanLifetime()).toBeGreaterThan(0);
    expect(model.getTotalPaymnetForLoanLifetime()).toEqual(100000 - 5000 + model.getTotalInterestAccrued());
    const paymentSchedule = model.getPaymentSchedule();
    expect(paymentSchedule.length).toEqual(360);
    paymentSchedule.forEach(pmt => {
        expect(pmt.paymentNo).toBeGreaterThan(0);
    });
});

each([
    [SIMPLE_LOAN_MODE.SimpleLoan, DOWNPAYMNET_ENTRY_MODE.Percentage],
    [SIMPLE_LOAN_MODE.SimpleLoan,DOWNPAYMNET_ENTRY_MODE.MoneyAmount],
    [SIMPLE_LOAN_MODE.Mortgage,DOWNPAYMNET_ENTRY_MODE.Percentage],
    [SIMPLE_LOAN_MODE.Mortgage,DOWNPAYMNET_ENTRY_MODE.MoneyAmount]
]).test("createWithFixed15Y", (mode, downpaymentMode) => {
    let data = {
        totalNeed: 200000,
        downpaymentMode: downpaymentMode,
        downpayment: 0,
        interestRate: 0.07,
        loanType: LOAN_TYPE.Fixed15Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0
    };
    const model = new Model(data, mode);
    expect(model.totalNeed()).toEqual(200000);
    expect(model.downpayment()).toEqual(0);
    expect(model.downpaymentPercent()).toEqual(0);
    expect(model.interestRate()).toEqual(0.07);
    expect(model.loanType()).toEqual(LOAN_TYPE.Fixed15Years);
    expect(model.loanLenghtPeriods()).toEqual(15);
    expect(model.paymentsPerPeriod()).toEqual(12);
    expect(model.getMontlyPayment()).toBeGreaterThan(0);
    expect(model.getTotalInterestAccrued()).toBeGreaterThan(0);
    expect(model.getTotalPaymnetForLoanLifetime()).toBeGreaterThan(0);
    expect(model.getTotalPaymnetForLoanLifetime()).toEqual(200000 + model.getTotalInterestAccrued());
    const paymentSchedule = model.getPaymentSchedule();
    expect(paymentSchedule.length).toEqual(180);
    paymentSchedule.forEach(pmt => {
        expect(pmt.paymentNo).toBeGreaterThan(0);
    });
});

each([
    [SIMPLE_LOAN_MODE.SimpleLoan, DOWNPAYMNET_ENTRY_MODE.Percentage],
    [SIMPLE_LOAN_MODE.SimpleLoan,DOWNPAYMNET_ENTRY_MODE.MoneyAmount],
    [SIMPLE_LOAN_MODE.Mortgage,DOWNPAYMNET_ENTRY_MODE.Percentage],
    [SIMPLE_LOAN_MODE.Mortgage,DOWNPAYMNET_ENTRY_MODE.MoneyAmount]
]).test("createWithCustom", (mode, downpaymentMode) => {
    let data = {
        totalNeed: 300000,
        downpaymentMode: downpaymentMode,
        downpayment: 1,
        interestRate: 0.001,
        loanType: LOAN_TYPE.Custom,
        loanLenghtPeriods: 10,
        paymentsPerPeriod: 5
    };
    const model = new Model(data, mode);
    expect(model.totalNeed()).toEqual(300000);
    expect(model.downpayment()).toEqual(1);
    expect(model.downpaymentPercent()).toEqual(1 / 300000);
    expect(model.interestRate()).toEqual(0.001);
    expect(model.loanType()).toEqual(LOAN_TYPE.Custom);
    expect(model.loanLenghtPeriods()).toEqual(10);
    expect(model.paymentsPerPeriod()).toEqual(5);
    expect(model.getMontlyPayment()).toBeGreaterThan(0);
    expect(model.getTotalInterestAccrued()).toBeGreaterThan(0);
    expect(model.getTotalPaymnetForLoanLifetime()).toBeGreaterThan(0);
    expect(model.getTotalPaymnetForLoanLifetime()).toEqual(300000 - 1 + model.getTotalInterestAccrued());
    const paymentSchedule = model.getPaymentSchedule();
    expect(paymentSchedule.length).toEqual(50);
    paymentSchedule.forEach(pmt => {
        expect(pmt.paymentNo).toBeGreaterThan(0);
    });
});

each([
    [SIMPLE_LOAN_MODE.SimpleLoan, DOWNPAYMNET_ENTRY_MODE.Percentage],
    [SIMPLE_LOAN_MODE.SimpleLoan,DOWNPAYMNET_ENTRY_MODE.MoneyAmount],
    [SIMPLE_LOAN_MODE.Mortgage,DOWNPAYMNET_ENTRY_MODE.Percentage],
    [SIMPLE_LOAN_MODE.Mortgage,DOWNPAYMNET_ENTRY_MODE.MoneyAmount]
]).test("createWithCustomAndZeroParams", (mode, downpaymentMode) => {
    let data = {
        totalNeed: 300000,
        downpaymentMode: downpaymentMode,
        downpayment: 0,
        interestRate: 0.001,
        loanType: LOAN_TYPE.Custom,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0
    };
    const model = new Model(data, mode);
    expect(model.totalNeed()).toEqual(300000);
    expect(model.downpayment()).toEqual(0);
    expect(model.downpaymentPercent()).toEqual(0);
    expect(model.interestRate()).toEqual(0.001);
    expect(model.loanType()).toEqual(LOAN_TYPE.Custom);
    expect(model.loanLenghtPeriods()).toEqual(0);
    expect(model.paymentsPerPeriod()).toEqual(0);
    expect(model.getMontlyPayment()).toEqual(0);
    expect(model.getTotalInterestAccrued()).toEqual(0);
    expect(model.getTotalPaymnetForLoanLifetime()).toEqual(300000);
    expect(model.getTotalPaymnetForLoanLifetime()).toEqual(300000 + model.getTotalInterestAccrued());
    const paymentSchedule = model.getPaymentSchedule();
    expect(paymentSchedule.length).toEqual(0);
});

test("switchDownpaymentType", () => {
    let data = {
        totalNeed: 200000,
        downpaymentMode: DOWNPAYMNET_ENTRY_MODE.Percentage,
        downpayment: 20000,
        interestRate: 0.07,
        loanType: LOAN_TYPE.Fixed15Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0,
    };

    let model = new Model(data, SIMPLE_LOAN_MODE.Mortgage);
    expect(model.downpaymentMode()).toEqual(DOWNPAYMNET_ENTRY_MODE.Percentage);
    expect(model.downpayment()).toEqual(20000);
    expect(model.downpaymentPercent()).toEqual(0.1);

    model.setDownpaymentPercent(0.05);

    data = model.data;
    data.downpaymentMode = DOWNPAYMNET_ENTRY_MODE.MoneyAmount;
    model = new Model(data, SIMPLE_LOAN_MODE.Mortgage);
    expect(model.downpaymentMode()).toEqual(DOWNPAYMNET_ENTRY_MODE.MoneyAmount);
    expect(model.downpayment()).toEqual(10000);
    expect(model.downpaymentPercent()).toEqual(0.05);

    model.setDownpayment(40000);

    data = model.data;
    data.downpaymentMode = DOWNPAYMNET_ENTRY_MODE.Percentage;
    model = new Model(data, SIMPLE_LOAN_MODE.Mortgage);
    expect(model.downpaymentMode()).toEqual(DOWNPAYMNET_ENTRY_MODE.Percentage);
    expect(model.downpayment()).toEqual(40000);
    expect(model.downpaymentPercent()).toEqual(0.2);
});

test("set downpayment when downpayment entry mode is MoneyAmount", () => {
    let data = {
        totalNeed: 200000,
        downpaymentMode: DOWNPAYMNET_ENTRY_MODE.MoneyAmount,
        downpayment: 20000,
        interestRate: 0.07,
        loanType: LOAN_TYPE.Fixed15Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0,
    };

    let model = new Model(data, SIMPLE_LOAN_MODE.Mortgage);
    expect(model.downpaymentMode()).toEqual(DOWNPAYMNET_ENTRY_MODE.MoneyAmount);
    expect(model.downpayment()).toEqual(20000);
    expect(model.downpaymentPercent()).toEqual(0.1);

    model.setDownpayment(40000);
    expect(model.downpayment()).toEqual(40000);
    expect(model.downpaymentPercent()).toEqual(0.2);
});

test("set downpayment when downpayment entry mode is Percentage takes no affect", () => {
    let data = {
        totalNeed: 200000,
        downpaymentMode: DOWNPAYMNET_ENTRY_MODE.Percentage,
        downpayment: 20000,
        interestRate: 0.07,
        loanType: LOAN_TYPE.Fixed15Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0,
    };

    let model = new Model(data, SIMPLE_LOAN_MODE.Mortgage);
    expect(model.downpaymentMode()).toEqual(DOWNPAYMNET_ENTRY_MODE.Percentage);
    expect(model.downpayment()).toEqual(20000);
    expect(model.downpaymentPercent()).toEqual(0.1);

    model.setDownpayment(40000);
    expect(model.downpayment()).toEqual(20000);
    expect(model.downpaymentPercent()).toEqual(0.1);
});

test("set total need when downpayment entry mode is Percentage does not change percentage", () => {
    let data = {
        totalNeed: 200000,
        downpaymentMode: DOWNPAYMNET_ENTRY_MODE.Percentage,
        downpayment: 20000,
        interestRate: 0.07,
        loanType: LOAN_TYPE.Fixed15Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0,
    };

    let model = new Model(data, SIMPLE_LOAN_MODE.Mortgage);
    expect(model.downpaymentMode()).toEqual(DOWNPAYMNET_ENTRY_MODE.Percentage);
    expect(model.downpayment()).toEqual(20000);
    expect(model.downpaymentPercent()).toEqual(0.1);

    model.setTotalNeed(400000);
    expect(model.downpayment()).toEqual(40000);
    expect(model.downpaymentPercent()).toEqual(0.1);
});

test("set downpayment percent when downpayment entry mode is Percentage", () => {
    let data = {
        totalNeed: 200000,
        downpaymentMode: DOWNPAYMNET_ENTRY_MODE.Percentage,
        downpayment: 20000,
        interestRate: 0.07,
        loanType: LOAN_TYPE.Fixed15Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0,
    };

    let model = new Model(data, SIMPLE_LOAN_MODE.Mortgage);
    expect(model.downpaymentMode()).toEqual(DOWNPAYMNET_ENTRY_MODE.Percentage);
    expect(model.downpaymentPercent()).toEqual(0.1);
    expect(model.downpayment()).toEqual(20000);

    model.setDownpaymentPercent(0.2);
    expect(model.downpaymentPercent()).toEqual(0.2);
    expect(model.downpayment()).toEqual(40000);
});

test("set downpayment percent when entry mode is MoneyAmount takes no affect", () => {
    let data = {
        totalNeed: 200000,
        downpaymentMode: DOWNPAYMNET_ENTRY_MODE.MoneyAmount,
        downpayment: 20000,
        interestRate: 0.07,
        loanType: LOAN_TYPE.Fixed15Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0,
    };

    let model = new Model(data, SIMPLE_LOAN_MODE.Mortgage);
    expect(model.downpaymentMode()).toEqual(DOWNPAYMNET_ENTRY_MODE.MoneyAmount);
    expect(model.downpaymentPercent()).toEqual(0.1);
    expect(model.downpayment()).toEqual(20000);

    model.setDownpaymentPercent(0.2);
    expect(model.downpaymentPercent()).toEqual(0.1);
    expect(model.downpayment()).toEqual(20000);
});

test("set total need when entry mode is MoneyAmount does not change downpayment", () => {
    let data = {
        totalNeed: 200000,
        downpaymentMode: DOWNPAYMNET_ENTRY_MODE.MoneyAmount,
        downpayment: 20000,
        interestRate: 0.07,
        loanType: LOAN_TYPE.Fixed15Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0,
    };

    let model = new Model(data, SIMPLE_LOAN_MODE.Mortgage);
    expect(model.downpaymentMode()).toEqual(DOWNPAYMNET_ENTRY_MODE.MoneyAmount);
    expect(model.downpaymentPercent()).toEqual(0.1);
    expect(model.downpayment()).toEqual(20000);

    model.setTotalNeed(400000);
    expect(model.downpaymentPercent()).toEqual(0.05);
    expect(model.downpayment()).toEqual(20000);
});

each([
    [SIMPLE_LOAN_MODE.SimpleLoan, DOWNPAYMNET_ENTRY_MODE.Percentage],
    [SIMPLE_LOAN_MODE.SimpleLoan,DOWNPAYMNET_ENTRY_MODE.MoneyAmount],
    [SIMPLE_LOAN_MODE.Mortgage, DOWNPAYMNET_ENTRY_MODE.Percentage],
    [SIMPLE_LOAN_MODE.Mortgage,DOWNPAYMNET_ENTRY_MODE.MoneyAmount],
]).test("clear and set total need. After lear all numbers should look good", (mode, downpaymentMode) => {
    let data = {
        totalNeed: 100000,
        downpaymentMode: downpaymentMode,
        downpayment: 0,
        interestRate: 0.05,
        loanType: LOAN_TYPE.Fixed30Years,
        loanLenghtPeriods: 0,
        paymentsPerPeriod: 0,
    };
    const model = new Model(data, mode);

    model.setTotalNeed(0);
    expect(model.totalNeed()).toEqual(0);
    expect(model.downpayment()).toEqual(0);
    expect(model.downpaymentPercent()).toEqual(0);
    expect(model.getTotalInterestAccrued()).toEqual(0);

    model.setTotalNeed(100000);
    expect(model.totalNeed()).toEqual(100000);
    expect(model.downpayment()).toEqual(0);
    expect(model.downpaymentPercent()).toEqual(0);
    expect(model.getTotalInterestAccrued()).toBeGreaterThan(0);
});
