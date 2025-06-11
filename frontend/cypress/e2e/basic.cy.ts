describe("Basic Application", () => {
  it("should load the home page", () => {
    cy.visit("/");
    cy.get("body").should("be.visible");
    cy.contains("Tire Catalog").should("be.visible");
  });
});
