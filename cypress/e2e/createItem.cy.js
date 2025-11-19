describe("Item creation", () => {
    beforeEach(() => {
        cy.login();

        cy.visit('/createitem');
    });

    it("should create an item successfully", () => {
        cy.get('input[name="name"]').type("Test Bike");
        cy.get('textarea[name="conditions"]').type("No rain riding");
        cy.get('select[name="category"]').select("Sport");
        cy.get('input[name="price"]').type("12");
        cy.get('textarea[name="description"]').type("A nice test bike");

        cy.get('input[type="file"]').selectFile("cypress/fixtures/bike.jpg", { force: true });

        cy.get('button[type="submit"]').click();

        cy.on("window:alert", (txt) => {
            expect(txt).to.equal("Item Created Successfully!");
        });
    });
})