export function totalAccrued(principal, rate, period) {
    return principal * (1 + rate * period);
}

export function rate(totalAccrued, principal, period) {
    return (1 / period) * (totalAccrued / principal - 1);
}

export function interest(principal, rate, period) {
    return totalAccrued(principal, rate, period) - principal;
}

export class AmortizingFixedRateLoanModel {
    /**
     * 
     * @param {number} loanAmount 
     * @param {number} interestRate 
     * @param {number} loanLenghtPeriods 
     * @param {number} paymentsPerPeriod 
     */
    constructor(loanAmount, interestRate, loanLenghtPeriods, paymentsPerPeriod) {
        this.loanAmount = loanAmount;
        this.interestRate = interestRate;
        this.loanLenghtPeriods = parseInt(loanLenghtPeriods);
        this.paymentsPerPeriod = parseInt(paymentsPerPeriod);
    }

    /**
     * Calculates periodic payment for the model. for exmple for 30Y fixed load a perios is a month,
     * so the getPeriodicPaymentAmount() will return monthly payment.
     */
    getPeriodicPaymentAmount() {
        if (!this.isValid()) {
            return 0;
        }

        const numberOfPeriods = this.loanLenghtPeriods;
        const paymentsPerPeriod = this.paymentsPerPeriod;
        const periodicInterestRate = parseFloat(this.interestRate);
        const n = paymentsPerPeriod * numberOfPeriods;
        const i = periodicInterestRate / paymentsPerPeriod;
        const D = (Math.pow(1.0 + i, n) - 1.0) / (i * Math.pow(1.0 + i, n));
        const monthlyPayment = this.loanAmount / D;
        return monthlyPayment;
    }

    /**
     * Calculates payment schedule for the model
     */
    getPaymentSchedule() {
        if (!this.isValid()) {
            return [];
        }

        const paymentsPerPeriod = parseInt(this.paymentsPerPeriod);
        const numberOfPeriods = parseInt(this.loanLenghtPeriods);
        const totalPayments = numberOfPeriods * paymentsPerPeriod;
        const periodicInterestRate = this.interestRate;
        const i = periodicInterestRate / paymentsPerPeriod;
        const monthlyPayment = this.getPeriodicPaymentAmount();
        let startingBalance = this.loanAmount;
        let totalInterest = 0;
        let schedule = [];
        let paymentNo = 0;
        while (paymentNo < totalPayments) {
            const interestPayed = startingBalance * i;
            const principalPayed = monthlyPayment - interestPayed;
            const endingBalance = startingBalance > principalPayed ? startingBalance - principalPayed : 0;
            totalInterest = totalInterest + interestPayed;
            schedule.push({
                paymentNo: ++paymentNo,
                startingBalance: startingBalance,
                payment: monthlyPayment,
                interestPayed: interestPayed,
                principalPayed: monthlyPayment - interestPayed,
                endingBalance: endingBalance,
                totalInterest: totalInterest
            });
            startingBalance = endingBalance;
        }

        return schedule;
    }

    isValid() {
        if (isNaN(this.paymentsPerPeriod) || this.paymentsPerPeriod <= 0) {
            return false;
        }

        if (isNaN(this.loanLenghtPeriods) || this.loanLenghtPeriods <= 0) {
            return false;
        }

        return true;
    }
}