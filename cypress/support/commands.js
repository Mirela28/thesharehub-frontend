const API = "http://localhost:8080";

function randomUser() {
  const ts = Date.now().toString().slice(-6);
  return {
    name: "TestUser",
    username: `user_${ts}`,
    email: `user_${ts}@test.com`,
    phone: `+31${Math.floor(100000000 + Math.random() * 900000000)}`,
    city: "Eindhoven",
    password: "Password123!",
    confirmPassword: "Password123!"
  };
}

Cypress.Commands.add("registerUser", (user) => {
  return cy.request({
    method: "POST",
    url: `${API}/users`,
    body: user
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});

Cypress.Commands.add("loginUser", (user) => {
  return cy.request({
    method: "POST",
    url: `${API}/users/login`,
    body: {
      username: user.username,
      password: user.password
    },
    withCredentials: true
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("logout", () => {
  cy.request("POST", `${API}/users/logout`);
  cy.visit("/");
});

Cypress.Commands.add("createItem", (item) => {
  const ts = Date.now().toString().slice(-5);
  const itemData = {
    name: `${item.name}_${ts}`.substring(0, 20),
    description: item.description || "Test description",
    conditions: item.conditions || "Test conditions",
    category: item.category || "Technology",
    price: item.price || 10
  };

  return cy.request({
    method: "POST",
    url: `${API}/items/no-image`,
    body: itemData,
    withCredentials: true
  }).then((response) => {
    expect(response.status).to.eq(201);

  return cy.wrap(response.body);
  });
});

Cypress.Commands.add("setupLoggedUser", () => {
  const user = randomUser();

  return cy.registerUser(user)
  .then(() => cy.loginUser(user))
  .then(() => cy.wrap(user));

});

Cypress.Commands.add("loginUI", (user) => {
  cy.visit("/login");

  cy.get('input[name="username"]').type(user.username);
  cy.get('input[name="password"]').type(user.password);

  cy.get('button[type="submit"]').click();

  cy.url().should("eq", Cypress.config().baseUrl + "/");

});

