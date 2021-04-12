
/// <reference types="Cypress" />

context('Window', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.config().baseUrl}/calculators/mortgage-calculator`)
    })

    it("TestLoanType15Y", () => {
        cy.get("#totalNeed")
            .clear()
            .type(123456);
        cy.get("#interestRate")
            .clear()
            .type(4.725);
        cy.get("#downpaymentMode")
            .check();
        cy.get("#downpaymentPercent")
            .clear()
            .type(10);
        selectLoanType(1);

        checkSummary("$862.82", "$44,197.11", "$155,307.51");
    });

    it("TestLoanType30Y", () => {
        cy.get("#totalNeed")
            .clear()
            .type(123456);
        cy.get("#interestRate")
            .clear()
            .type(4.725);
        cy.get("#downpaymentMode")
            .check();
        cy.get("#downpaymentPercent")
            .clear()
            .type(10);

        selectLoanType(0);

        checkSummary("$577.93", "$96,944.87", "$208,055.27");
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
            }
        ];

        testData.forEach(testItem => {
            selectLoanType(testItem.loanType);

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

    it("DownpaymentAsPercentCheckedAndUnchecked", () => {
        // Setup other fields
        cy.get("#totalNeed")
            .clear()
            .type(250000);
        cy.get("#interestRate")
            .clear()
            .type(3.725);
        selectLoanType(1);

        // Dowpayment Percent

        cy.get("#downpaymentMode")
            .check();
        cy.get("#downpaymentPercent")
            .clear()
            .type(10);

        cy.get("#downpaymentPercent")
            .should("be.enabled")
            .should("have.value", "10%");
        cy.get("#downpaymentMoney")
            .should("not.be.enabled")
            .should("have.value", "$25,000");

        // Downpayment Money

        cy.get("#downpaymentMode")
            .uncheck();
        cy.get("#downpaymentMoney")
            .clear()
            .type(50000);

        cy.get("#downpaymentPercent")
            .should("not.be.enabled")
            .should("have.value", "20%");
        cy.get("#downpaymentMoney")
            .should("be.enabled")
            .should("have.value", "$50,000");

        // Dowpayment Percent

        cy.get("#downpaymentMode")
            .check();
        cy.get("#downpaymentPercent")
            .clear()
            .type(50);

        cy.get("#downpaymentPercent")
            .should("be.enabled")
            .should("have.value", "50%");
        cy.get("#downpaymentMoney")
            .should("not.be.enabled")
            .should("have.value", "$125,000");
    });

    it("DownpaymentIsCleared_SummaryIsStillCalculated", () => {
        // Setup other fields
        cy.get("#totalNeed")
            .clear()
            .type(300000);
        cy.get("#interestRate")
            .clear()
            .type(3.5);
        selectLoanType(0);

        // Clear Downpayment

        cy.get("#downpaymentMode")
            .check();
        cy.get("#downpaymentPercent")
            .clear();

        cy.get("#downpaymentPercent")
            .should("have.value", "");
        cy.get("#downpaymentMoney")
            .should("have.value", "");

        checkSummary("$1,347.13", "$184,968.26", "$484,968.26");
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