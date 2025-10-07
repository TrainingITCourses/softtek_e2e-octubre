describe("Las páginas de Alberto", () => {
  it("Es visitable la de developer", () => {
    cy.visit("https://albertobasalo.dev");
  });
  it("Es visitable la de la academia", () => {
    cy.visit("https://aicode.academy");
  });
});

describe("La página de AIDDbot", () => {
  it("Es visitable", () => {
    cy.visit("https://aiddbot.com");
  });
});
