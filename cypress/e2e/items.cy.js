describe("Items – End to End", () => {

  beforeEach(() => {
    cy.login();
  });

  it("should perform a search and display results", () => {
    cy.visit("/browseitems");

    const searchQuery = "bike";

    cy.get('input[placeholder="Search for textbooks, bikes, etc."]')
      .type(searchQuery);

    cy.get('button[type="submit"]').click();

    cy.url().should("include", `/browseitems?search=${encodeURIComponent(searchQuery)}`);

    cy.get('[data-cy="item-card"]', { timeout: 10000 })
      .should("exist");
  });

  it("should show 'No items found' when search yields no results", () => {
    cy.visit("/browseitems");

    cy.get('input[placeholder="Search for textbooks, bikes, etc."]')
      .type("nonexistentitem12345");

    cy.get('button[type="submit"]').click();

    cy.contains("No items found.").should("be.visible");
  });

});
