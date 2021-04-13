import { AmortizingFixedRateLoanModel} from "../math/InterestRate";
import { round } from "../math/Helpers";

function testPaymentSceduleRelative(paymentSchedule) {
    for (let i = 0; i < paymentSchedule.length - 1; i++) {
        let currentPayment = paymentSchedule[i];
        let nextPayment = paymentSchedule[i + 1];
        expect(currentPayment.startingBalance > nextPayment.startingBalance).toEqual(true);
        expect(currentPayment.interestPayed > nextPayment.interestPayed).toEqual(true);
        expect(currentPayment.principalPayed < nextPayment.principalPayed).toEqual(true);
        expect(currentPayment.endingBalance > nextPayment.endingBalance).toEqual(true);
        expect(currentPayment.totalInterest < nextPayment.totalInterest).toEqual(true);
    }
}

test('getPeriodicPaymentAmount for valid numbers', () => {
    let model = new AmortizingFixedRateLoanModel(100000, 0.06, 30, 12);
    expect(round(model.getPeriodicPaymentAmount(), 2)).toEqual(599.55);
});

test('getPeriodicPaymentAmount for zeroes', () => {
    let model = new AmortizingFixedRateLoanModel(100000, 0.06, 0, 0);
    expect(model.getPeriodicPaymentAmount()).toEqual(0);
});

test('getPeriodicPaymentAmount for zero loan length', () => {
    let model = new AmortizingFixedRateLoanModel(100000, 0.06, 0, 12);
    expect(model.getPeriodicPaymentAmount()).toEqual(0);
});

test('getPeriodicPaymentAmount for zero payments per period', () => {
    let model = new AmortizingFixedRateLoanModel(100000, 0.06, 30, 0);
    expect(model.getPeriodicPaymentAmount()).toEqual(0);
});

test('getPaymentSchedule 30Y 6%', () => {
    const expectedPayment = 599.55;
    let model = new AmortizingFixedRateLoanModel(100000, 0.06, 30, 12);
    let paymentSchedule = model.getPaymentSchedule();
    expect(paymentSchedule.length).toEqual(360);
    let first = paymentSchedule[0];
    expect(first.paymentNo).toEqual(1);
    expect(round(first.startingBalance, 2)).toEqual(100000);
    expect(round(first.payment, 2)).toEqual(expectedPayment);
    expect(round(first.interestPayed, 2)).toEqual(500);
    expect(round(first.principalPayed, 2)).toEqual(99.55);
    expect(round(first.endingBalance, 2)).toEqual(99900.45);
    expect(round(first.totalInterest, 2)).toEqual(500);

    let last = paymentSchedule[paymentSchedule.length - 1];
    expect(last.paymentNo).toEqual(360);
    expect(round(last.startingBalance, 2)).toEqual(596.57);
    expect(round(last.payment, 2)).toEqual(expectedPayment);
    expect(round(last.interestPayed, 2)).toEqual(2.98);
    expect(round(last.principalPayed, 2)).toEqual(596.57);
    expect(round(last.endingBalance, 2)).toEqual(0);
    expect(round(last.totalInterest, 2)).toEqual(115838.19);

    for (let i = 0; i < paymentSchedule.length; i++) {
        let payment = paymentSchedule[i];
        expect(payment.paymentNo).toEqual(i + 1);
        expect(round(payment.payment, 2)).toEqual(expectedPayment);
    }

    testPaymentSceduleRelative(paymentSchedule);
});


test('getPaymentSchedule 30Y 5%', () => {
    const expectedPayment = 536.82;
    let model = new AmortizingFixedRateLoanModel(100000, 0.05, 30, 12);
    let paymentSchedule = model.getPaymentSchedule();
    expect(paymentSchedule.length).toEqual(360);
    let first = paymentSchedule[0];
    expect(first.paymentNo).toEqual(1);
    expect(round(first.startingBalance, 2)).toEqual(100000);
    expect(round(first.payment, 2)).toEqual(expectedPayment);
    expect(round(first.interestPayed, 2)).toEqual(416.67);
    expect(round(first.principalPayed, 2)).toEqual(120.15);
    expect(round(first.endingBalance, 2)).toEqual(99879.85);
    expect(round(first.totalInterest, 2)).toEqual(416.67);

    let last = paymentSchedule[paymentSchedule.length - 1];
    expect(last.paymentNo).toEqual(360);
    expect(round(last.startingBalance, 2)).toEqual(534.59);
    expect(round(last.payment, 2)).toEqual(expectedPayment);
    expect(round(last.interestPayed, 2)).toEqual(2.23);
    expect(round(last.principalPayed, 2)).toEqual(534.59);
    expect(round(last.endingBalance, 2)).toEqual(0);
    expect(round(last.totalInterest, 2)).toEqual(93255.78);

    for (let i = 0; i < paymentSchedule.length; i++) {
        let payment = paymentSchedule[i];
        expect(payment.paymentNo).toEqual(i + 1);
        expect(round(payment.payment, 2)).toEqual(expectedPayment);
    }

    testPaymentSceduleRelative(paymentSchedule);
});

test('getPaymentSchedule 15Y 5%', () => {
    const expectedPayment = 790.79;
    let model = new AmortizingFixedRateLoanModel(100000, 0.05, 15, 12);
    let paymentSchedule = model.getPaymentSchedule();
    expect(paymentSchedule.length).toEqual(180);
    let first = paymentSchedule[0];
    expect(first.paymentNo).toEqual(1);
    expect(round(first.startingBalance, 2)).toEqual(100000);
    expect(round(first.payment, 2)).toEqual(expectedPayment);
    expect(round(first.interestPayed, 2)).toEqual(416.67);
    expect(round(first.principalPayed, 2)).toEqual(374.13);
    expect(round(first.endingBalance, 2)).toEqual(99625.87);
    expect(round(first.totalInterest, 2)).toEqual(416.67);

    let last = paymentSchedule[paymentSchedule.length - 1];
    expect(last.paymentNo).toEqual(180);
    expect(round(last.startingBalance, 2)).toEqual(787.51);
    expect(round(last.payment, 2)).toEqual(expectedPayment);
    expect(round(last.interestPayed, 2)).toEqual(3.28);
    expect(round(last.principalPayed, 2)).toEqual(787.51);
    expect(round(last.endingBalance, 2)).toEqual(0);
    expect(round(last.totalInterest, 2)).toEqual(42342.85);

    for (let i = 0; i < paymentSchedule.length; i++) {
        let payment = paymentSchedule[i];
        expect(payment.paymentNo).toEqual(i + 1);
        expect(round(payment.payment, 2)).toEqual(expectedPayment);
    }

    testPaymentSceduleRelative(paymentSchedule);
});