describe("Rents E2E Tests", () => {
  let itemId;
  let owner;
  let renter;

  beforeEach(() => {
    cy.setupLoggedUser().then((owner) => {
      return cy.createItem({
        name: "Camping Tent",
        category: "OTHER",
        price: 15,
        description: "Spacious tent for 4 people",
        conditions: "Clean and dry upon return"
      });
    }).then((item) => {
      itemId = item.id;

      return cy.logout();
    }).then(() => {
      return cy.setupLoggedUser();
    }).then((createdRenter) => {
      renter = createdRenter;

      return cy.logout();
    }).then(() => {
      cy.loginUI(renter);
    });
  });

  it("Should create a rent request", () => {
    cy.visit(`/itempost/${itemId}`); //fixed url

    cy.contains("Request to Rent").should("be.visible");

    cy.get(".react-datepicker__input-container input")
      .first()
      .click();

    cy.get(".react-datepicker__day")
      .not(".react-datepicker__day--outside-month")
      .not(".react-datepicker__day--disabled")
      .eq(1)
      .click();

    cy.get(".react-datepicker__day")
      .not(".react-datepicker__day--outside-month")
      .not(".react-datepicker__day--disabled")
      .eq(3)
      .click();

    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alert");
    });

    cy.contains("Request to Rent(Pay with Stripe)")
      .click();

    cy.get("@alert").should("have.been.calledWith", "Rent Requested Successfully!");

  });
});
