// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "计算器");
  });
});

describe("Calculator", () => {
  it("calculate", () => {
    cy.visit("/");

    cy.get("#input").type("1+2");
    cy.get("#calculate-btn").click();

    cy.get(".el-table").contains("3");

    cy.get("#input")
      .clear()
      .type("bad");
    cy.get("#calculate-btn").click();

    cy.get(".el-table").contains("Error");
  });
});
