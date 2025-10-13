# 3 Formularios e interacciones con Cypress

> Softtek 14 de Octubre 2025

## Conexión 

### ¿Cómo interactuar?

Además de navegar, los usuarios interactúan con la aplicación mediante formularios, botones, enlaces, etc. Cypress proporciona comandos específicos para simular estas interacciones de manera efectiva.

### ¿Cómo gestionar datos?

Al rellenar formularios, es común necesitar datos específicos. Cypress permite el uso de fixtures y constantes para gestionar estos datos de manera organizada.

## Conceptos

### Interacciones

```ts
cy.get('input[name="email"]').type('user@example.com');
cy.get('input[name="password"]').type('password123');
cy.get('form').submit();
```
### Constantes 

```ts
const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'password123';
```

### Page Object Model (POM)

- Abstracción de la interfaz de usuario en clases o módulos.

```ts
class LoginPage { 
  visit() {
    cy.visit('/login');
  }

  fillEmail(email: string) {
    cy.get('input[name="email"]').type(email);
  }

  fillPassword(password: string) {
    cy.get('input[name="password"]').type(password);
  }

  submit() {
    cy.get('form').submit();
  }
}
``` 


### Fixtures


- Archivos JSON u otros formatos para almacenar datos de prueba.

```json
{
  "validUser": {
    "email": "user@example.com",
    "password": "password123"
  }
}
```

Uso en pruebas. ATENCIÓN: este código es asíncrono.

```ts
cy.fixture('users').then((users) => {
  cy.get('input[name="email"]').type(users.validUser.email);
  cy.get('input[name="password"]').type(users.validUser.password);
  cy.get('form').submit();
});
```

## Concreción práctica

### Formularios

```ts
/**
 * The register form
 *   should have a form with 5 clean inputs and a submit button disabled
 *   when the users fills the form correctly
 *     should allow to submit the form
 *   when the user fills the form incorrectly
 *     should disabled the submit button when start
 *     should not mark the email as invalid if it is empty, but list in error section
 *     should mark the email as invalid if it is not an email
 *   when the user resets the form
 *     should clear the form when the reset button is clicked
 */
```
- Comandos `type`, `clear`, `check`, `uncheck`, `select`, `submit`, `reset`.
- Afirmaciones sobre formularios y sus elementos.
- Patrón : Arrange - Act - Assert.
  
- To Do: Variables de entorno y fixtures


## Conclusión

### ¿Qué hemos aprendido?

Interactuar con formularios y gestionar datos en Cypress.

### ¿Qué sigue?

Trabajo con servidores, APIs y datos.