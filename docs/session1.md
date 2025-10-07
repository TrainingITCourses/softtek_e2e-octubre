# Introducción a Cypress

> Softtek 7 de Octubre 2025

## Conexión

### ¿Qué es Cypress?

Cypress es un potente framework de pruebas integral que permite a los desarrolladores escribir pruebas para aplicaciones web fácilmente. 

### ¿Por qué Cypress?

Ofrece una interfaz intuitiva, recarga en tiempo real y un amplio conjunto de funciones que hacen que las pruebas sean más eficientes y agradables.

### ¿Cómo funciona Cypress?

Cypress ejecuta pruebas en el navegador, lo que permite a los desarrolladores interactuar con la aplicación como lo haría un usuario.

## Conceptos

### Ejecutor de pruebas

Una interfaz interactiva que permite ejecutar y depurar pruebas en tiempo real. Proporciona una representación visual de la ejecución de la prueba, lo que facilita la identificación de problemas.

### El SUT

El Sistema Bajo Prueba (SUT) es la aplicación o sitio web que se está probando. Cypress interactúa con el SUT simulando las acciones del usuario y verificando el comportamiento esperado.

### Marco de pruebas

Cypress proporciona una estructura para escribir y organizar pruebas. Mocha permite definir conjuntos de pruebas y casos de prueba individuales mediante los bloques `describe` e `it`.

```ts
describe('Mi página de destino', () => {
  it('Tiene un título', () => {
    // El código de prueba va aquí
  });
});
```

### Comandos

Cypress proporciona un amplio conjunto de comandos que permiten interactuar con la aplicación que se está probando. Los comandos se ofrecen a partir de la variable global `cy` y son _encadenables_, lo que significa que pueden ser utilizados para realizar múltiples acciones en una sola línea. 

```ts
cy.visit('https://example.cypress.io'); cy.get('button').click();
cy.get('input').type('¡Hola, Cypress!');
cy.contains('Submit').should('be.visible');
```

### Afirmaciones

Las afirmaciones se utilizan para verificar que la aplicación se comporta como se espera. Cypress utiliza afirmaciones Chai, que proporcionan diversos métodos para comprobar condiciones.


```ts
cy.get('h1').should('have.text', 'Bienvenido a Cypress');
cy.get('button').should('be.enabled');
cy.get('input').should('have.value', '¡Hola, Cypress!');
// Implícitamente cada comando de Cypress incluye una afirmación.
cy.get('title'); // existencia implícita
```

## Concreción práctica

### 0. Inicio (demo)

- lanzar el SUT [AI code Academy / archetype angular spa](https://github.com/AIDDbot/ArchetypeAngularSPA)
- `cypress open` para abrir el Test Runner.
- Escoger e2e y chrome.
- Crear una prueba de ejemplo.
- Ejecutarla y ver el resultado.
- Explorar la interfaz y las herramientas de depuración.
- Explorar la estructura de carpeta `cypress`.

### 1. Home page

#### Objetivo:

Escribe un conjunto de pruebas end-to-end (E2E) utilizando Cypress para verificar los elementos básicos de la página de inicio de una aplicación web alojada en http://localhost:4200/. Las pruebas deben cubrir la accesibilidad de la página, la presencia de un footer, el contenido del footer, enlaces específicos y elementos de navegación.

#### Requisitos específicos:

- [ ] Visita la página: Crea una prueba que visite la URL http://localhost:4200/ y verifique que sea accesible.
- [ ] Footer presente: Asegúrate de que exista un elemento `<footer>` en la página.
- [ ] Contenido del footer: Verifica que el footer contenga el texto "Archetype".
- [ ] Enlace externo: Confirma que haya un enlace (elemento `<a>`) con href apuntando a https://albertobasalo.dev.
- [ ] Navegación: Verifica que exista un elemento `<nav>` que contenga al menos un enlace `<a>`.

#### Instrucciones:

- Utiliza la estructura describe e it de Cypress para organizar las pruebas.
- Ejecuta las pruebas en un entorno donde la aplicación esté corriendo en localhost:4200.
- Asegúrate de que las pruebas sean independientes y reutilicen la visita a la página cuando sea necesario.
- Corrige cualquier error tipográfico o lógico en las descripciones (por ejemplo, "should contains" debería ser "should contain", y "un link" debería ser "a link").

### 2. Refactorización (demo)

- Usar `beforeEach` para evitar repetir `cy.visit`.
- Usar configuración global en `cypress.config.ts` para establecer la baseUrl.
- Usar Logs para la trazabilidad interactiva.
- Scripts en `package.json` para simplificar comandos.


### 3. Rutas, navegación y esperas (demo)

```ts
/**
 * The Application navigation links
 *   should have a link to the repository page
 *   should have a header link with 'register' text
 *   should have a header link to user/register url
 *   should navigate to the register page
 *   should not have broken links
 */
```

### 4. Formularios

```ts
/**
 * The register form
 *     should have a form with 5 clean inputs and a submit button disabled
 *   when the users fills the form correctly
 *     should allow to submit the form
 *     should mark all inputs as valid
 *   when the user fills the form incorrectly
 *     should disabled the submit button when start
 *     should mark the name as invalid if it is empty
 *     should mark the name as invalid after clear it
 *     should not show an error message to the user before interaction
 *     should show an error message to the user after typing invalid data
 *     should mark the name as valid if it is not empty
 *     should mark the email as invalid if it is not an email
 *  when the user resets the form
 *     should clear the form when the reset button is clicked
 */
```

### 5. Escenarios de error

```ts
/**
 * Given The Application home page
 *  When no API server is available
 *   Then should display an error message,
 *    And not a busy message
 *    And not the data
 */
```

### 6. Ejecución en CI/CD (demo)

- `cypress run`
- `cypress run --browser chrome --spec cypress/1-start/*.spec.ts`

## Conclusión

### ¿Qué hemos aprendido?

A instalar, ejecutar y escribir pruebas básicas con Cypress.

### ¿Qué sigue?

Organización de pruebas, buenas prácticas y patrones de diseño.