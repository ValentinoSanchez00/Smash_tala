# Smash Tala Backend

Este repositorio contiene el backend del proyecto Smash Tala, una aplicación de comida rápida que gestiona pedidos de hamburguesas de manera centralizada a través de una web.

## Descripción del Proyecto

Smash Tala es un proyecto de TFG que simula un restaurante de comida rápida especializado en hamburguesas. La aplicación permite gestionar pedidos desde una única plataforma web, optimizando la experiencia del usuario.

## Tecnologías Utilizadas

- Node.js con Express (Backend)
- MySQL (Base de datos)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js y npm](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)


### Instalación General

1. Clona el repositorio:
    ```sh
    git clone https://github.com/ValentinoSanchez00/Smash_tala.git
    cd Smash_tala/backend
    ```

2. Instala las dependencias del backend:
    ```sh
    npm i
    ```

3. Configura la base de datos:
    - Crea una base de datos en MySQL.
    - Renombra el archivo `.env.example` a `.env` y actualiza las variables de entorno con tu configuración de MySQL.

4. Inicia el servidor del backend:
    ```sh
    npm start / npm run dev 
    ```
    El servidor se ejecutará en `http://localhost:3000`.

## Uso del Backend

Asegúrate de que el servidor de MySQL está en funcionamiento. Inicia el servidor del backend como se indicó en los pasos de instalación. El backend proporciona varias rutas para gestionar los pedidos y otros recursos. Puedes utilizar herramientas como Postman para interactuar con estas rutas.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto:

Autor: Valentino Sánchez  
Email: valentinosanchezraverta@gmail.com

## Licencia

Este proyecto está bajo la Licencia MIT.
