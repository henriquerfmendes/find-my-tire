describe("Tire Filters", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="tire-list"]').should("exist");
    cy.get('[data-cy="tire-card"]').should("have.length.gt", 0);
  });

  it("should filter tires by manufacturer", () => {
    cy.get('[data-cy="filter-make"]').type("Continental");

    cy.get('[data-cy="apply-filters-button"]').click();

    cy.wait(2000);

    cy.get('[data-cy="tire-card"]').should("exist");

    cy.contains("Continental").should("exist");
  });

  it("should clear filters when clicking the clear button", () => {
    cy.get('[data-cy="filter-make"]').type("Continental");

    cy.get('[data-cy="apply-filters-button"]').click();

    cy.wait(2000);

    cy.get('[data-cy="clear-filters-button"]').click();

    cy.wait(2000);

    cy.get('[data-cy="filter-make"]').should("have.value", "");

    cy.get('[data-cy="tire-card"]').should("exist");
  });
});
