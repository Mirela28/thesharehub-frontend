describe("Item Search", () => {

    beforeEach(() => {
        cy.login();

        cy.visit("/browseitems");
    });

    it("should perform a search and display results", () => {
        const searchQuery = "bike";

        cy.get('input[placeholder="Search for textbooks, bikes, etc."]')
            .type(searchQuery);

        cy.get('button[type="submit"]').click();

        cy.url().should("include", `/browseitems?search=${encodeURIComponent(searchQuery)}`);

        cy.get('[data-cy="item-card"]', { timeout: 10000 }).should('exist');
    });

    it("should show 'No items found' message when search yields no results", () => {
        const searchQuery = "nonexistentitem12345";

        cy.get('input[placeholder="Search for textbooks, bikes, etc."]')
            .type(searchQuery);

        cy.get('button[type="submit"]').click();

        cy.contains("No items found.").should('be.visible');
    });
});

