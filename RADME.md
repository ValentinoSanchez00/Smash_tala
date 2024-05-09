<<<<<<<<<<<<<<  ✨ Codeium Command ⭐ >>>>>>>>>>>>>>>>
# Aplicacion de Angular y Spring Boot

Esta aplicación consta de dos partes:

## Front-end

El front-end esta implementado en Angular, está estructurado en módulos y componetes.

El módulo principal es `app` y contiene los componentes `app.component`, `header.component` y `footer.component`.

El componente `app.component` es el componente principal de la aplicación y maneja la navegación, mientras que los componentes `header.component` y `footer.component` son simples componentes que muestran la cabecera y el pie de página de la aplicación.

## Back-end

El back-end esta implementado en Spring Boot, y consta de un controlador, un servicio y un repositorio.

El controlador `UserController` maneja las solicitudes HTTP de tipo GET, POST, PUT y DELETE para la entidad `User`.

El servicio `UserService` maneja la lógica de negocio de la entidad `User`, y utiliza el repositorio para acceder a la base de datos.

El repositorio `UserRepository` hereda de `JpaRepository` y proporciona los métodos necesarios para acceder a la base de datos.

## Ejecución de la aplicación

Para ejecutar la aplicación, se debe ejecutar el siguiente comando en la terminal:
$ ng s -o

<<<<<<<  ec77c851-8f91-4411-a4ed-c4738cd098bb  >>>>>>>