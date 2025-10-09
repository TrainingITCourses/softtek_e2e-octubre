# 1 Introducción a Cypress

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
cy.visit('https://example.cypress.io'); 
cy.get('button').click();
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

```bash
npm install cypress 
npm install typescript --save-dev
```

- lanzar el SUT [angular spa / v20](https://github.com/AlbertoBasaloLabs/Angular)
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
- [ ] Contenido del footer: Verifica que el footer contenga el texto "rights".
- [ ] Enlace externo: Confirma que haya un enlace (elemento `<a>`) con href apuntando a https://albertobasalo.dev.
- [ ] Navegación: Verifica que exista un elemento `<nav>` que contenga al menos un enlace `<a>`.

#### Instrucciones:

- Utiliza la estructura describe e it de Cypress para organizar las pruebas.
- Ejecuta las pruebas en un entorno donde la aplicación esté corriendo en localhost:4200.
- Asegúrate de que las pruebas sean independientes y reutilicen la visita a la página cuando sea necesario.
- Corrige cualquier error tipográfico o lógico en las descripciones (por ejemplo, "should contains" debería ser "should contain", y "un link" debería ser "a link").

## Conclusión

### ¿Qué hemos aprendido?

A instalar, ejecutar y escribir pruebas básicas con Cypress.

### ¿Qué sigue?

Organización de pruebas, buenas prácticas y patrones de diseño.