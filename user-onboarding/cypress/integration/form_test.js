describe("Testing User Sign Up Form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });
  it("Add test to inputs and submit form", function() {
    cy.get('input[name="name"]')
      .type("Luke Skywalker")
      .should("have.value", "Luke Skywalker");
    cy.get('input[name="email"]')
      .type("email@email.com")
      .should("have.value", "email@email.com");
  });
});
