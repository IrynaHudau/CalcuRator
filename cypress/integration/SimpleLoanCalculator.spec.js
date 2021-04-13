/// <reference types="Cypress" />

import each from 'jest-each';

context('Window', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.config().baseUrl}/calculators/simple-loan-calculator`)
    })

    it("TestLoanTypeOther", () => {
        cy.get("#totalNeed")
            .clear()
            .type(40000);
        cy.get("#interestRate")
            .clear()
            .type(5.0);
        // Select type other
        selectLoanType(2);

        // Inputs to enter custom loan terms are visible
        cy.get("#loanLenghtPeriods")
            .should('be.visible')
            .type(10);
        cy.get("#paymentsPerPeriod")
            .should('be.visible')
            .type(12);

        checkSummary("$424.26", "$10,911.45", "$50,911.45");
    });

    it("TestLoanType15Y", () => {
        cy.get("#totalNeed")
            .clear()
            .type(123456);
        cy.get("#interestRate")
            .clear()
            .type(4.55);
        selectLoanType(1);

        // Inputs to enter custom loan terms are NOT visible
        cy.get("#loanLenghtPeriods")
            .should('not.exist');
        cy.get("#paymentsPerPeriod")
            .should('not.exist');

        checkSummary("$947.59", "$47,109.83", "$170,565.83");
    });

    it("TestLoanType30Y", () => {
        cy.get("#totalNeed")
            .clear()
            .type(123456);
        cy.get("#interestRate")
            .clear()
            .type(4.55);
        selectLoanType(0);

        // Inputs to enter custom loan terms are NOT visible
        cy.get("#loanLenghtPeriods")
            .should('not.exist');
        cy.get("#paymentsPerPeriod")
            .should('not.exist');

        checkSummary("$629.21", "$103,058.34", "$226,514.34");
    });

    it("SwitchLoanTypes", () => {
        cy.get("#totalNeed")
            .clear()
            .type(50000);
        cy.get("#interestRate")
            .clear()
            .type(4.1);

        const testData = [
            {
                loanType: "0",
                showSeeCustomLoanTerms: false
            },
            {
                loanType: "1",
                showSeeCustomLoanTerms: false
            },
            {
                loanType: "2",
                showSeeCustomLoanTerms: true
            }
        ];

        testData.forEach(testItem => {
            selectLoanType(testItem.loanType);

            if (testItem.showSeeCustomLoanTerms) {
                cy.get("#loanLenghtPeriods")
                    .should('be.visible')
                    .type(10);
                cy.get("#paymentsPerPeriod")
                    .should('be.visible')
                    .type(12);
            } else {
                // Inputs to enter custom loan terms are visible
                cy.get("#loanLenghtPeriods")
                    .should('not.exist');
                cy.get("#paymentsPerPeriod")
                    .should('not.exist');
            }

            cy.get("#montlyPayment")
                .invoke("text")
                .should("to.be.ok");
            cy.get("#totalInterestAccrued")
                .invoke("text")
                .should("to.be.ok");
            cy.get("#totalPaymnetForLoanLifetime")
                .invoke("text")
                .should("to.be.ok");
            cy.get("#resultsChart")
                .should('be.visible');
        });
    });

    it("ShowDetailsCheckedAndUnchecked", () => {
        cy.get("#showDetailsCheck")
            .check();
        cy.get("#simpleLoanResultsWithData")
            .should("be.visible");
        cy.get("#showDetailsCheck")
            .uncheck();
        cy.get("#simpleLoanResultsWithData")
            .should("not.exist");
        cy.get("#showDetailsCheck")
            .check();
        cy.get("#simpleLoanResultsWithData")
            .should("be.visible");
    });
});

function selectLoanType(loanType) {
    cy.get("#loanType")
        .click();
    cy.get(`#loanTypeOption${loanType}`)
        .click();
}

function checkSummary(montlyPayment, totalInterestAccrued, totalPaymnetForLoanLifetime) {
    cy.get("#montlyPayment")
        .should("have.text", montlyPayment);
    cy.get("#totalInterestAccrued")
        .should("have.text", totalInterestAccrued);
    cy.get("#totalPaymnetForLoanLifetime")
        .should("have.text", totalPaymnetForLoanLifetime);
    cy.get("#resultsChart")
        .should('be.visible');
}