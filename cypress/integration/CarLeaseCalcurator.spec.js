/// <reference types="Cypress" />

import { CREDIT_SCORE_LEVEL } from "../../src/calculators/leaseCalculator/LeaseCalculatorCommons";
import { makeCypressId } from "../../src/utils/cypressUtil";

context('Window', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.config().baseUrl}/calculators/lease-calculator`)
    })

    describe("MonthInLease varies - click to the end", function () {
        const tests = [
            {
                downpayment: 2000,
                monthlyPayment: 250,
                monthInLease: 12,
                msrp: 30000,
                residualValue: 26000,
                titleTax: 1000,
                interestRate: 5,
                expectedTotalForLease: "$5,000",
                expectedMonthlyPaymentIfNoDownpayment: "$416.67",
                expectedMonthlyPayment: "$250",
                expectedDownpayment: "$2,000",
                expectedFairLeaseMonthlyPayment: "$266.67",
                expectedFairDownpayment: "$2,000",
                expectedFairTotalForLease: "$5,200",
            },
            {
                downpayment: 2000,
                monthlyPayment: 300,
                monthInLease: 24,
                msrp: 30000,
                residualValue: 22000,
                titleTax: 1000,
                interestRate: 5,
                expectedTotalForLease: "$9,200",
                expectedMonthlyPaymentIfNoDownpayment: "$383.33",
                expectedMonthlyPayment: "$300",
                expectedDownpayment: "$2,000",
                expectedFairLeaseMonthlyPayment: "$308.33",
                expectedFairDownpayment: "$2,000",
                expectedFairTotalForLease: "$9,400",
            },
            {
                downpayment: 2000,
                monthlyPayment: 300,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 19000,
                titleTax: 1000,
                interestRate: 5,
                expectedTotalForLease: "$12,800",
                expectedMonthlyPaymentIfNoDownpayment: "$355.56",
                expectedMonthlyPayment: "$300",
                expectedDownpayment: "$2,000",
                expectedFairLeaseMonthlyPayment: "$293.06",
                expectedFairDownpayment: "$2,000",
                expectedFairTotalForLease: "$12,550",
            },
            {
                downpayment: 2000,
                monthlyPayment: 300,
                monthInLease: 48,
                msrp: 30000,
                residualValue: 16000,
                titleTax: 1000,
                interestRate: 5,
                expectedTotalForLease: "$16,400",
                expectedMonthlyPaymentIfNoDownpayment: "$341.67",
                expectedMonthlyPayment: "$300",
                expectedDownpayment: "$2,000",
                expectedFairLeaseMonthlyPayment: "$285.42",
                expectedFairDownpayment: "$2,000",
                expectedFairTotalForLease: "$15,700",
            },
        ];

        tests.forEach(function (test) {
            it(`MonthInLease ${test.monthInLease}`, function () {
                cy.get("#cy-downpayment")
                    .type(test.downpayment);

                cy.get("#cy-monthlyPayment")
                    .type(test.monthlyPayment);

                selectMonthInLease(test.monthInLease);

                cy.get("#cy-totalForLease")
                    .should("have.text", test.expectedTotalForLease);
                cy.get("#cy-monthlyPaymentIfNoDownpayment")
                    .should("have.text", test.expectedMonthlyPaymentIfNoDownpayment);

                clickNext();

                cy.get("#cy-msrp")
                    .type(test.msrp);
                cy.get("#cy-residualValue")
                    .type(test.residualValue);
                cy.get("#cy-titleTax")
                    .type(test.titleTax);

                clickNext();

                cy.get("#cy-rbInterestRate")
                    .click();

                cy.get("#cy-interestRate")
                    .type(test.interestRate);

                clickNext();

                cy.get("#cy-Monthly_Payment-your")
                    .should("have.text", test.expectedMonthlyPayment);
                cy.get("#cy-Downpayment-your")
                    .should("have.text", test.expectedDownpayment);
                cy.get("#cy-Total_for_Lease-your")
                    .should("have.text", test.expectedTotalForLease);
                cy.get("#cy-Monthly_Payment-fair")
                    .should("have.text", test.expectedFairLeaseMonthlyPayment);
                cy.get("#cy-Downpayment-fair")
                    .should("have.text", test.expectedFairDownpayment);
                cy.get("#cy-Total_for_Lease-fair")
                    .should("have.text", test.expectedFairTotalForLease);

                clickNext();

                clickReset();

                // Check that data has been reset

                cy.get("#cy-downpayment")
                    .should("have.text", "");

                cy.get("#cy-monthlyPayment")
                    .should("have.text", "");
            });
        });
    });

    describe("InterestRateMethod varies - click to the end", function () {
        const tests = [
            {
                name: "Credit Score - Fair",
                downpayment: 2000,
                monthlyPayment: 300,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 20000,
                titleTax: 1000,
                creditScoreTest: {
                    interestRateMethodSelectionId: "#cy-rbCreditScoreLevel",
                    creditScoreLevel: CREDIT_SCORE_LEVEL.Fair,
                },
                expectedTotalForLease: "$12,800",
                expectedMonthlyPaymentIfNoDownpayment: "$355.56",
                expectedMonthlyPayment: "$300",
                expectedDownpayment: "$2,000",
                expectedFairLeaseMonthlyPayment: "$288.89",
                expectedFairDownpayment: "$2,000",
                expectedFairTotalForLease: "$12,400",
            },
            {
                name: "Credit Score - Good",
                downpayment: 2000,
                monthlyPayment: 300,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 20000,
                titleTax: 1000,
                creditScoreTest: {
                    interestRateMethodSelectionId: "#cy-rbCreditScoreLevel",
                    creditScoreLevel: CREDIT_SCORE_LEVEL.Good,
                },
                expectedTotalForLease: "$12,800",
                expectedMonthlyPaymentIfNoDownpayment: "$355.56",
                expectedMonthlyPayment: "$300",
                expectedDownpayment: "$2,000",
                expectedFairLeaseMonthlyPayment: "$269.44",
                expectedFairDownpayment: "$2,000",
                expectedFairTotalForLease: "$11,700",
            },
            {
                name: "Credit Score - Very Good",
                downpayment: 2000,
                monthlyPayment: 300,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 20000,
                titleTax: 1000,
                creditScoreTest: {
                    interestRateMethodSelectionId: "#cy-rbCreditScoreLevel",
                    creditScoreLevel: CREDIT_SCORE_LEVEL.VeryGood,
                },
                expectedTotalForLease: "$12,800",
                expectedMonthlyPaymentIfNoDownpayment: "$355.56",
                expectedMonthlyPayment: "$300",
                expectedDownpayment: "$2,000",
                expectedFairLeaseMonthlyPayment: "$261.11",
                expectedFairDownpayment: "$2,000",
                expectedFairTotalForLease: "$11,400",
            },
            {
                name: "Credit Score - Exceptional",
                downpayment: 2000,
                monthlyPayment: 300,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 20000,
                titleTax: 1000,
                creditScoreTest: {
                    interestRateMethodSelectionId: "#cy-rbCreditScoreLevel",
                    creditScoreLevel: CREDIT_SCORE_LEVEL.Exceptional,
                },
                expectedTotalForLease: "$12,800",
                expectedMonthlyPaymentIfNoDownpayment: "$355.56",
                expectedMonthlyPayment: "$300",
                expectedDownpayment: "$2,000",
                expectedFairLeaseMonthlyPayment: "$255.56",
                expectedFairDownpayment: "$2,000",
                expectedFairTotalForLease: "$11,200",
            },
            {
                name: "Interest Rate",
                downpayment: 2000,
                monthlyPayment: 250,
                monthInLease: 12,
                msrp: 30000,
                residualValue: 26000,
                titleTax: 1000,
                interestRateTest: {
                    interestRateMethodSelectionId: "#cy-rbInterestRate",
                    interestRate: 5,
                },
                expectedTotalForLease: "$5,000",
                expectedMonthlyPaymentIfNoDownpayment: "$416.67",
                expectedMonthlyPayment: "$250",
                expectedDownpayment: "$2,000",
                expectedFairLeaseMonthlyPayment: "$266.67",
                expectedFairDownpayment: "$2,000",
                expectedFairTotalForLease: "$5,200",
            },
            {
                name: "Money Factor",
                downpayment: 2000,
                monthlyPayment: 300,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 24000,
                titleTax: 1000,
                moneyFactorTest: {
                    interestRateMethodSelectionId: "#cy-rbMoneyFactor",
                    moneyFactor: ".0399",
                },
                expectedTotalForLease: "$12,800",
                expectedMonthlyPaymentIfNoDownpayment: "$355.56",
                expectedMonthlyPayment: "$300",
                expectedDownpayment: "$2,000",
                expectedFairLeaseMonthlyPayment: "$298.49",
                expectedFairDownpayment: "$2,000",
                expectedFairTotalForLease: "$12,745.6",
            },
        ];

        tests.forEach(function (test) {
            it(`InterestRateMethod ${test.name}`, function () {
                cy.get("#cy-downpayment")
                    .type(test.downpayment);

                cy.get("#cy-monthlyPayment")
                    .type(test.monthlyPayment);

                selectMonthInLease(test.monthInLease);

                cy.get("#cy-totalForLease")
                    .should("have.text", test.expectedTotalForLease);
                cy.get("#cy-monthlyPaymentIfNoDownpayment")
                    .should("have.text", test.expectedMonthlyPaymentIfNoDownpayment);

                clickNext();

                cy.get("#cy-msrp")
                    .type(test.msrp);
                cy.get("#cy-residualValue")
                    .type(test.residualValue);
                cy.get("#cy-titleTax")
                    .type(test.titleTax);

                clickNext();

                const { creditScoreTest, interestRateTest, moneyFactorTest } = test;
                if (creditScoreTest) {
                    // Test different credit score levels
                    selectCreditScoreLevel(creditScoreTest.creditScoreLevel)
                }
                else if (interestRateTest) {
                    cy.get(interestRateTest.interestRateMethodSelectionId)
                        .click();
                    cy.get("#cy-interestRate")
                        .type(interestRateTest.interestRate);
                }
                else if (moneyFactorTest) {
                    cy.get(moneyFactorTest.interestRateMethodSelectionId)
                        .click();
                    cy.get("#cy-moneyFactor")
                        .clear()
                        .type(moneyFactorTest.moneyFactor);
                }

                clickNext();

                cy.get("#cy-Monthly_Payment-your")
                    .should("have.text", test.expectedMonthlyPayment);
                cy.get("#cy-Downpayment-your")
                    .should("have.text", test.expectedDownpayment);
                cy.get("#cy-Total_for_Lease-your")
                    .should("have.text", test.expectedTotalForLease);
                cy.get("#cy-Monthly_Payment-fair")
                    .should("have.text", test.expectedFairLeaseMonthlyPayment);
                cy.get("#cy-Downpayment-fair")
                    .should("have.text", test.expectedFairDownpayment);
                cy.get("#cy-Total_for_Lease-fair")
                    .should("have.text", test.expectedFairTotalForLease);

                clickNext();

                clickReset();

                // Check that data has been reset

                cy.get("#cy-downpayment")
                    .should("have.text", "");

                cy.get("#cy-monthlyPayment")
                    .should("have.text", "");
            });
        });
    });

    describe("Lease Terms warnings", function () {
        const tests = [
            {
                downpayment: 2000,
                monthlyPayment: 400,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 24000,
                titleTax: 1000,
                expectedResidualvalueWarning: false,
                expectedTitleTaxWarning: false,
            },
            {
                downpayment: 2000,
                monthlyPayment: 400,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 18000,
                titleTax: 1000,
                expectedResidualvalueWarning: true,
                expectedTitleTaxWarning: false,
            },
            {
                downpayment: 2000,
                monthlyPayment: 400,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 24000,
                titleTax: 5000,
                expectedResidualvalueWarning: false,
                expectedTitleTaxWarning: true,
            },
            {
                downpayment: 2000,
                monthlyPayment: 400,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 18000,
                titleTax: 5000,
                expectedResidualvalueWarning: true,
                expectedTitleTaxWarning: true,
            },
        ];

        tests.forEach(function (test) {
            it(`MonthInLease - ResidualvalueWarning: ${test.expectedResidualvalueWarning} TitleTaxWarning: ${test.expectedTitleTaxWarning}`, function () {
                cy.get("#cy-downpayment")
                    .type(test.downpayment);

                cy.get("#cy-monthlyPayment")
                    .type(test.monthlyPayment);

                selectMonthInLease(test.monthInLease);

                clickNext();

                cy.get("#cy-msrp")
                    .type(test.msrp);
                cy.get("#cy-residualValue")
                    .type(test.residualValue);
                cy.get("#cy-titleTax")
                    .type(test.titleTax);

                function testWarnings() {
                    if (test.expectedResidualvalueWarning) {
                        cy.get("#cy-residualValueWarning")
                            .should("be.visible");
                        // cy.get("#cy-residualValueWarning").text
                    }
                    else {
                        cy.get("#cy-residualValueWarning")
                            .should("not.exist");
                    }

                    if (test.expectedTitleTaxWarning) {
                        cy.get("#cy-titleTaxWarning")
                            .should("be.visible");
                    }
                    else {
                        cy.get("#cy-titleTaxWarning")
                            .should("not.exist");
                    }
                }

                testWarnings();

                clickNext();
                clickNext();

                // Analysis page has warnings dispalyed as well.
                testWarnings();
            });
        });
    });

    describe("Lease Analysis", function () {
        const tests = [
            {
                downpayment: 100,
                monthlyPayment: 300,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 22000,
                titleTax: 1000,
                interestRate: 3,
                expectedIsGoodLease: false,
            },
            {
                downpayment: 100,
                monthlyPayment: 200,
                monthInLease: 36,
                msrp: 30000,
                residualValue: 22000,
                titleTax: 1000,
                interestRate: 3,
                expectedIsGoodLease: true,
            }
        ];

        tests.forEach(function (test) {
            it(`Lease Analysis - Is good lease: ${test.expectedIsGoodLease}`, function () {
                cy.get("#cy-downpayment")
                    .type(test.downpayment);

                cy.get("#cy-monthlyPayment")
                    .type(test.monthlyPayment);

                selectMonthInLease(test.monthInLease);

                clickNext();

                cy.get("#cy-msrp")
                    .type(test.msrp);
                cy.get("#cy-residualValue")
                    .type(test.residualValue);
                cy.get("#cy-titleTax")
                    .type(test.titleTax);

                clickNext();

                cy.get("#cy-rbInterestRate")
                    .click();

                cy.get("#cy-interestRate")
                    .type(test.interestRate);

                clickNext();

                if (test.expectedIsGoodLease) {
                    cy.get("#cy-positiveLease")
                        .should("be.visible");
                    cy.get("#cy-negativeLease")
                        .should("not.exist");
                }
                else {
                    cy.get("#cy-negativeLease")
                        .should("be.visible");
                    cy.get("#cy-positiveLease")
                        .should("not.exist");
                }
            });
        });
    });

    function clickNext() {
        cy.get("#cy-buttonNext")
            .should("be.enabled")
            .click();
    }

    function clickBack() {
        cy.get("#cy-buttonBack")
            .should("be.enabled")
            .click();
    }

    function clickReset() {
        cy.get("#cy-buttonReset")
            .should("be.enabled")
            .click();
    }

    function selectMonthInLease(monthInLease) {
        cy.get("#cy-monthInLease")
            .click();
        cy.get("#" + makeCypressId("monthInLeaseValue", monthInLease))
            .click();
    }

    function selectCreditScoreLevel(creditScoreLevel) {
        cy.get("#cy-creditScore")
            .click();

        const id = makeCypressId("creditScore", creditScoreLevel);
        cy.get("#" + id)
            .click();
    }
});
