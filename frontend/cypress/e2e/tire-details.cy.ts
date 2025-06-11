describe("Tire Details Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="tire-list"]').should("exist");
    cy.get('[data-cy="tire-card"]').should("have.length.gt", 0);
  });

  it("should navigate to the tire details page when clicking on a tire", () => {
    let tireSerialNumber: string;
    cy.get('[data-cy="tire-card"]')
      .first()
      .find(".MuiTypography-subtitle1")
      .invoke("text")
      .then((text) => {
        tireSerialNumber = text.trim();

        cy.get('[data-cy="tire-card"]').first().click();

        cy.url().should("include", "/tire/");

        cy.get('[data-cy="tire-details"]').should("exist");

        cy.contains("Manufacturer").should("exist");
        cy.contains("Model").should("exist");
        cy.contains("Status").should("exist");
        cy.contains("Size").should("exist");
        cy.contains("Serial Number").should("exist");
        cy.contains(tireSerialNumber).should("exist");
      });
  });

  it("should display detailed tire information", () => {
    cy.get('[data-cy="tire-card"]').first().click();

    cy.get('[data-cy="tire-details"]').should("exist");

    cy.contains("Basic Information").should("exist");
    cy.contains("Technical Information").should("exist");
  });

  it("should allow navigating back to the list", () => {
    cy.get('[data-cy="tire-card"]').first().click();

    cy.get('[data-cy="tire-details"]').should("exist");

    cy.get('[data-cy="back-button"]').click();

    cy.url().should("not.include", "/tire/");

    cy.get('[data-cy="tire-list"]').should("exist");
  });
});
