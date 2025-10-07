describe("El laboratorio de Angular", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });
  // it("Tiene pie de página", () => {
  //   cy.get("footer");
  // });
  it("Tiene pie de página con Copyright", () => {
    cy.get("footer").contains("rights");
  });
  it("No tiene formulario", () => {
    cy.get("form").should("not.exist");
  });
});
