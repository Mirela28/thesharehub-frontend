describe("User Signup", () => {
  it("should register a new user successfully", () => {
    cy.visit("/register");

    const uniqueEmail = `user${Date.now()}@gmail.com`;
    const uniqueUsername = `user${Date.now()}`;

    const randomNum = Math.floor(Math.random() * 10000);
    const uniquePhone = `+3162${randomNum}123`

    cy.get('input[name="name"]').type("TestUser");
    cy.get('input[name="username"]').type(uniqueUsername);
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="phone"]').type(uniquePhone);
    cy.get('select[name="city"]').select("Eindhoven");
    cy.get('input[name="password"]').type("Password123!");
    cy.get('input[name="confirmPassword"]').type("Password123!");

    cy.contains("Create an account").click();

    cy.on("window:alert", (txt) => {
      expect(txt).to.equal("Registration successful!");
    });
  });
});
