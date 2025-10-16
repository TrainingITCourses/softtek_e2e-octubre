# 4 Comunicaciones y API con Cypress

## Conexión 

### ¿Pruebas de principio a fin?

- Probar todo el flujo de la aplicación, desde la interfaz de usuario hasta el backend y viceversa.

- Es costoso y frágil, pero necesario para garantizar que todo funciona correctamente... y muy satisfactorio cuando todo pasa.

- Pero ante un fallo tampoco no sabremos a quién culpar, si es un problema del front, del back, de la red...

### ¿Están el front y back desacoplados?

- Las aplicaciones modernas suelen tener el front y el back desacoplados, comunicándose a través de APIs.

- Esto facilita el desarrollo y las pruebas, ya que cada parte puede ser probada de forma independiente.

- Cypress puede ayudar a probar ambas partes, aumentando la velocidad y fiabilidad de las pruebas.

## Conceptos

### Interceptores de red

- Permiten interceptar y modificar las solicitudes y respuestas de red entre el front y el back.

### Stubs y Spies

Los stubs permiten simular respuestas específicas para ciertas solicitudes, mientras que los spies permiten monitorear las solicitudes sin modificarlas.

### Comandos reutilizables

- Un poco off-topic, pero util llegados a este punto...

- Es imprescindible crear comandos personalizados en Cypress para encapsular lógica repetitiva y mejorar la legibilidad de las pruebas.

## Concreción práctica

### Simulación de respuestas

Usar fixtures para reutilizar respuestas comunes en las pruebas.

```ts
cy.intercept('POST', '/api/register', { fixture: 'register-success' }).as('registerUser');

cy.intercept('POST', '/api/register', { statusCode: 400 ,fixture: 'bad-request' }).as('registerUserFail');
```

Aumentar la legibilidad de Cypress con comandos reutilizables.
```ts
declare global {
  namespace Cypress {
    interface Chainable {
      register(name:string, email:string, password:string): Chainable<void>;
    }
  }
}
Cypress.Commands.add('register', (name, email, password) => {
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});
```
### El API users

Aprovechar el entorno de cypress para probar también el API.

```ts
cy.request('POST', '/api/users', {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
}).as('newUser');
cy.get('@newUser').its('status').should('eq', 201);
```
## Conclusión

### ¿Qué hemos aprendido?

- La importancia de las pruebas de extremo a extremo (E2E) para garantizar la funcionalidad completa de la aplicación.
- La necesidad de desacoplar el front y el back para facilitar las pruebas y el desarrollo.

### ¿Qué sigue?

- Diferenciar entre pruebas de comportamiento, de aceptación y de regresión.
- Profundizar en la sintaxis de Cypress para la creación de pruebas más efectivas.
- Incorporar inteligencia artificial para mejorar la productividad.

