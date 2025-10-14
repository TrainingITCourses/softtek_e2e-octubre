describe("The application navigation links", () => {
  before(() => {
    cy.log("1 - Antes de todo el bloque");
  });
  beforeEach(() => {
    cy.log("2 - Antes de cada test");
    cy.visit("/");
  });
  it("Me lleva a registro", () => {
    cy.get('a[href="/user/register"]').click();
    //cy.url().should("include", "/user/register");
  });
  it("Los enlaces tienen la propiedad href", () => {
    cy.get("a").each((x) => {
      x.prop("href");
    });
  });
  afterEach(() => {
    cy.log("3 - Después de cada test");
  });
  after(() => {
    cy.log("4 - Después de todo el bloque");
  });
});
