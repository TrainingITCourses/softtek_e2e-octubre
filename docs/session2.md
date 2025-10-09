# 2 Buenas prácticas con Cypress

> Softtek 9 de Octubre 2025

## Conexión

### ¿Cómo organizar las pruebas?

Las aplicaciones web pueden crecer en complejidad, y es fundamental mantener las pruebas organizadas para facilitar su mantenimiento y comprensión. 

### ¿Cómo lanzar las pruebas?

Cypress ofrece varias formas de ejecutar pruebas, ya sea a través de su interfaz gráfica (Test Runner) o mediante la línea de comandos para integraciones continuas.

### ¿Cómo mantener la trazabilidad?

La trazabilidad en las pruebas es esencial para asegurar que cada requisito del sistema esté cubierto por al menos una prueba. Esto facilita la identificación de qué pruebas validar en caso de cambios en los requisitos.

## Conceptos

### Organización de pruebas

- Un archivo por funcionalidad: Cada archivo de prueba debe centrarse en una funcionalidad específica de la aplicación.

- Agrupa los archivos en carpetas según módulos, características, épicas, etc.

- Prefiere un único bloque `describe` por archivo para mejorar la claridad.

### Escenarios de prueba

- Agrupa los escenarios relacionados dentro de un bloque `describe` usando bloques `context` para sub-categorías.

```ts
describe('Registro de usuario', () => {
  beforeEach(() => {
    // Código de configuración común
  });
  context('Con las credenciales correctas', () => {
    beforeEach(() => {
      // Código de configuración
    });
    it('Debería permitir el registro', () => {
      // Código de prueba
    });
  });

  context('Con datos inválidos', () => {
    beforeEach(() => {
      // Código de configuración
    });
    it('Debería mostrar un mensaje de error', () => {
      // Código de prueba
    });
  });
});
```

### Scripts

- Usa scripts en `package.json` para simplificar comandos complejos.

```json
{
  "scripts": {
    "start": "cypress open --e2e --browser chrome",
    "test": "npm run cypress:run",
    "test:feature1": "cypress run --spec 'cypress/e2e/feature1/**' ",
  }
}
```

### Trazabilidad

- En modo interactivo, usa `cy.log()` para seguir la ejecución de las pruebas.
- Usa alias con `cy.get().as()` para marcar y reutilizar elementos clave.
- Aprovecha los textos descriptivos en `describe`, `context` e `it` para documentar el propósito de cada prueba.
- Configura el reporter en `cypress.config.ts` para obtener reportes detallados.

## Concreción práctica

### 1. Refactorización (demo)

- Usar `beforeEach` para evitar repetir `cy.visit`.
- Usar configuración global en `cypress.config.ts` para establecer la baseUrl.
- Usar Pasos, Alias, Logs y Consola para la trazabilidad interactiva.
- Scripts en `package.json` para simplificar comandos.

### 2. Rutas, navegación y esperas (demo)

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
- Hooks: `before`, `beforeEach`, `after`, `afterEach`.
- Activa y desactiva pruebas mediante `.only` y `.skip`.
- Esperas implícitas y explícitas.
- Should de uno, dos y tres argumentos.
- Expresiones de evaluación con funciones flecha.

### 3. Formularios

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

Organizar y depurar pruebas.

### ¿Qué sigue?

Trabajo con servidores, APIs y datos.