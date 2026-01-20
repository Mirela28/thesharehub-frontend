describe("Items E2E Tests", () => {

  beforeEach(() => {
    cy.setupLoggedUser();

    cy.createItem({
      name: "Mountain Bike",
      category: "TRANSPORT",
      price: 10,
      description: "Test bike for rental",
      conditions: "Must return in good condition"
    });
  });

  it("Searches and displays items", () => {
    cy.visit("/browseitems");

    const searchQuery = "bike";

    cy.get('input[placeholder="Search for textbooks, bikes, etc."]')
      .type(searchQuery);

    cy.get('button[type="submit"]').click();

    cy.url().should("include", `/browseitems?search=${encodeURIComponent(searchQuery)}`);

    cy.get('[data-cy="item-card"]').should("exist");
  });

  it("Shows 'No items found' when search yields no results", () => {
    cy.visit("/browseitems");

    cy.get('input[placeholder="Search for textbooks, bikes, etc."]')
      .type("nonexistentitem12345");

    cy.get('button[type="submit"]').click();

    cy.contains("No items found.").should("be.visible");
  });
});

