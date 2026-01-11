describe("Rents – End to End", () => {

    beforeEach(() => {
        cy.login();
    });

    it("should create a rent request successfully (API)", () => {

        cy.request("http://localhost:8080/items/top-rentals")
            .then(res => {
                const item = res.body.content.find(i => i.ownerId !== 1);
                if (!item) return;

                cy.request({
                    method: "POST",
                    url: "http://localhost:8080/rents",
                    body: {
                        itemId: item.id,
                        startDate: new Date(Date.now() + 86400000).toISOString(),
                        endDate: new Date(Date.now() + 172800000).toISOString()
                    },
                    withCredentials: true
                }).then(rentRes => {
                    expect(rentRes.status).to.eq(201);
                    expect(rentRes.body.status).to.eq("PENDING");
                });
            });
    });

    it("should request a rent via UI", () => {
        cy.loginAsOtherUser();

        cy.visit("/browseitems");

        cy.get('[data-cy="item-card"]').first().click();

        cy.contains("Request to Rent").should("exist");

        cy.get('input[type="checkbox"]').should("exist").check();

        cy.get('input[placeholder="No dates selected"]').click();
        cy.get('.react-datepicker__day').not('.react-datepicker__day--disabled').eq(1).click();
        cy.get('.react-datepicker__day').not('.react-datepicker__day--disabled').eq(5).click();

        cy.intercept("POST", "http://localhost:8080/rents").as("createRent");
        cy.contains("Request to Rent").click();

        cy.wait("@createRent").its("response.statusCode").should("eq", 201);
    });


    it("should fetch approved rent dates for an item", () => {
        cy.request("http://localhost:8080/items/top-rentals")
            .then(res => {
                if (res.body.content.length === 0) return;

                const itemId = res.body.content[0].id;

                cy.request(`http://localhost:8080/rents/approvedrents/${itemId}`)
                    .then(datesRes => {
                        expect(datesRes.status).to.eq(200);
                        expect(datesRes.body).to.be.an("array");
                    });
            });
    });

    it("should approve a rent request", () => {
        cy.request("http://localhost:8080/rents/receivedrequests")
            .then(res => {
                const pending = res.body.content.find(r => r.status === "PENDING");
                if (!pending) return;

                cy.request({
                    method: "PUT",
                    url: "http://localhost:8080/rents",
                    body: {
                        id: pending.id,
                        status: "APPROVED"
                    }
                }).then(updateRes => {
                    expect(updateRes.status).to.eq(200);
                    expect(updateRes.body.status).to.eq("APPROVED");
                });
            });
    });

    it("should reject a rent request", () => {
        cy.request("http://localhost:8080/rents/receivedrequests")
            .then(res => {
                const pending = res.body.content.find(r => r.status === "PENDING");
                if (!pending) return;

                cy.request({
                    method: "PUT",
                    url: "http://localhost:8080/rents",
                    body: {
                        id: pending.id,
                        status: "REJECTED"
                    }
                }).then(updateRes => {
                    expect(updateRes.status).to.eq(200);
                    expect(updateRes.body.status).to.eq("REJECTED");
                });
            });
    });

});
