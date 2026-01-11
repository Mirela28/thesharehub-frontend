Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:8080/users/login",
    body: {
      username: "mirela28",
      password: "Mparola28!"
    },
    withCredentials: true
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("loginAsOtherUser", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:8080/users/login",
    body: {
      username: "otheruser",
      password: "OtherPassword123!"
    },
    withCredentials: true
  });
});

