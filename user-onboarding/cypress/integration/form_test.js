describe("Testing User Sign Up Form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });
  it("Add test to inputs and submit form", function() {
    cy.get('input[name="name"]')
      .type("Diana")
      .clear()
      .invoke("val")
      .should("be.empty")
    cy.get('input[name="name"]')
      .type("Luke Skywalker")
      .should("have.value", "Luke Skywalker");
    
    cy.get('input[name="email"]')
      .type("emailatemail.com")
      .clear()
      .invoke("val")
      .should("be.empty")
    cy.get('input[name="email"]')
      .type("email@email.com")
      .should("have.value", "email@email.com");
    
    cy.get('input[name="password"]')
      .type("1234")
      .clear()
      .should("be.empty")
    cy.get('input[name="password"]')
      .type("123456")
      .should("have.value", "123456");
    
    cy.get('[type="checkbox"]')
      .check()
      .uncheck()
    cy.get('[type="checkbox"]')
      .check()
      .should("be.checked");
      
    cy.get("Button")
      .click();
  });
});
