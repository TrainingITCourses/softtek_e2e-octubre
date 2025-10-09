describe("El laboratorio de Angular", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  // it("Tiene pie de página", () => {
  //   cy.get("footer");
  // });
  it("Tiene pie de página con Copyright", () => {
    cy.log("Verificando el pie de página");
    cy.get("footer").contains("rights");
  });
  it("No tiene formulario", () => {
    cy.log("Verificando la ausencia de formulario");
    cy.get("form").should("not.exist");
  });
  it("Tiene un enlace a la página https://albertobasalo.dev", () => {
    cy.log("Verificando el enlace a mi web");
    cy.get('a[href="https://albertobasalo.dev"]');
  });
  it("Tiene un enlace al home de la aplicación con la clase logo", () => {
    cy.log("Verificando el logo de la aplicación");
    cy.get("a.logo[href='/']");
  });
  it("Tiene una sección de navegación con enlaces", () => {
    cy.log("Verificando la sección de navegación");
    //cy.get("nav a");
    //cy.get("nav a").should("have.length.above", 1);
    //cy.get("nav").find("a").should("have.length.above", 1);
    cy.get("nav").as("cabecera");
    cy.get("@cabecera").find("a").its("length").should("be.gte", 1);
  });
  it("Tiene el año actual en el pie de página", () => {
    const year = new Date().getFullYear();
    cy.log("Verificando el año actual en el pie de página");
    cy.get("footer").contains(year);
  });
  it("Tiene un link a la página de registro con el texto 'Register'", () => {
    cy.log("Verificando el enlace a la página de registro");
    cy.get('a[href="/user/register"]').contains("Register");
  });
});
