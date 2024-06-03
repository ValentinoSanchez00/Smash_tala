/**
 * Este archivo incluye polyfills necesarios para Angular y se carga antes de la aplicación.
 * Puedes añadir tus propios polyfills adicionales a este archivo.
 *
 * Este archivo está dividido en 2 secciones:
 *   1. Polyfills de navegadores. Estos son aplicados antes de cargar ZoneJS y se ordenan por navegadores.
 *   2. Aplicaciones (ZoneJS). Importante para el soporte de Angular.
 *
 * Los polyfills son configurados por el CLI.
 */

/***************************************************************************************************
 * SECCIÓN 1: Polyfills de navegadores
 */

/** IE10 e IE11 requieren el siguiente polyfill para soportar ES2015. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';

/** IE10 e IE11 requieren el siguiente polyfill para el soporte de la API del DOM (para NgClass por ejemplo). **/
// import 'classlist.js';  // Ejecuta `npm install --save classlist.js`.

/** Evergreen navegadores requieren estas. **/
import 'core-js/es/reflect';
import 'zone.js';  // Incluido con Angular CLI.

/***************************************************************************************************
 * SECCIÓN 2: Polyfills de aplicaciones
 */

/***************************************************************************************************
 * ZONE.js es requerido por Angular mismo.
 */
import 'zone.js/dist/zone';  // Incluido con Angular CLI.

/***************************************************************************************************
 * Aquí puedes añadir otros polyfills que necesites para tu aplicación.
 */
