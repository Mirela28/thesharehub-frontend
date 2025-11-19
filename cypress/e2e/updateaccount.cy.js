describe("Account Page", () => {

  beforeEach(() => {
    cy.login();

    cy.visit("/account");
  });

  it("should update account details successfully", () => {
    cy.get('input[name="name"]').clear().type("Mirela");
    cy.get('input[name="phone"]').clear().type("+31612345678");
    cy.get('select[name="city"]').select("Amsterdam");

    cy.get("button[type='submit']").click({ force: true});

    cy.on("window:alert", (txt) => {
      expect(txt).to.equal("Account updated successfully");
    });

    cy.get('input[name="name"]').should("have.value", "Mirela");
    cy.get('input[name="phone"]').should("have.value", "+31612345678");
    cy.get('select[name="city"]').should("have.value", "Amsterdam");
  });

  it("should not allow submitting with no changes", () => {
    cy.get("button[type='submit']").should("be.disabled");
  });

});
