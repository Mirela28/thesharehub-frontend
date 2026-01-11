describe("User Signup - Success Flow", () => {
  it("should register a new user and authenticate automatically", () => {
    const timestamp = Date.now();

    const user = {
      name: "TestUser", 
      username: `user${timestamp.toString().slice(-6)}`,
      email: `user${timestamp}@gmail.com`,
      phone: "+3162551123",
      city: "Eindhoven",
      password: "Password123!",
      confirmPassword: "Password123!"
    };

    cy.visit("/register");

    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="phone"]').type(user.phone);
    cy.get('select[name="city"]').select(user.city);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.confirmPassword);

    cy.intercept("POST", "**/users").as("signup");
    cy.contains("Create an account").click();

    cy.wait("@signup")
      .its("response.statusCode")
      .should("eq", 201);

    cy.request({
      method: "GET",
      url: "http://localhost:8080/users/me",
      withCredentials: true
    }).then((res) => {
      expect(res.body.authenticated).to.eq(true);
      expect(res.body.user.username).to.eq(user.username);
    });

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

describe("User Signup - Duplicate User", () => {
  it("should reject duplicate username", () => {
    const username = `dup${Date.now().toString().slice(-6)}`;

    cy.request("POST", "http://localhost:8080/users", {
      name: "UserOne",
      username,
      email: `${username}@gmail.com`,
      phone: "+31620000001",
      city: "Eindhoven",
      password: "Password123!",
      confirmPassword: "Password123!"
    });

    cy.request({
      method: "POST",
      url: "http://localhost:8080/users",
      failOnStatusCode: false,
      body: {
        name: "UserTwo",
        username,
        email: `other_${username}@gmail.com`,
        phone: "+31620000002",
        city: "Eindhoven",
        password: "Password123!",
        confirmPassword: "Password123!"
      }
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});


describe("User Login & Session", () => {
  it("should login and return authenticated user", () => {
    cy.login();

    cy.request({
      method: "GET",
      url: "http://localhost:8080/users/me",
      withCredentials: true
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.authenticated).to.eq(true);
      expect(res.body.user).to.exist;
    });
  });
});
