describe("User E2E", () => {
  let user;

  beforeEach(() => {
    const ts = Date.now().toString().slice(-6);

    user = {
      name: "TestUser",
      username: `user_${ts}`,
      email: `user_${ts}@gmail.com`,
      phone: `+31${Math.floor(100000000 + Math.random() * 900000000)}`,
      city: "Eindhoven",
      password: "Password123!",
      confirmPassword: "Password123!"
    };
  });

  it("Registers a new user and authenticates them", () => {
    cy.visit("/register");

    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="phone"]').type(user.phone);
    cy.get('select[name="city"]').select(user.city);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.confirmPassword);

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");

    cy.request({
      method: "GET",
      url: "http://localhost:8080/users/me",
      withCredentials: true
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.authenticated).to.eq(true);
      expect(res.body.user.username).to.eq(user.username);
    });
  });

  it("Rejects duplicate username registration", () => {
    cy.registerUser(user);

    cy.visit("/register");

    cy.get('input[name="name"]').type("UserTwo");
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="email"]').type(`other_${user.username}@gmail.com`);
    cy.get('input[name="phone"]').type(`+316${Math.floor(Math.random() * 10000000)}`);
    cy.get('select[name="city"]').select("Eindhoven");
    cy.get('input[name="password"]').type("Password123!");
    cy.get('input[name="confirmPassword"]').type("Password123!");

    cy.get('button[type="submit"]').click();

    cy.get("p.text-red-500")
      .should("be.visible")
      .and("contain", "already");
  });

  it("Logs in and returns authenticated user", () => {
    cy.registerUser(user);

    cy.visit("/login");

    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");

    cy.request({
      method: "GET",
      url: "http://localhost:8080/users/me",
      withCredentials: true
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.authenticated).to.eq(true);
      expect(res.body.user.username).to.eq(user.username);
    });
  });
});
