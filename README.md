![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

![API DEPLOY](https://github.com/CodeCraft-Solutions-DREAM-Lab/Back-End/actions/workflows/dev_dreamlab-api.yml/badge.svg)

# Backend del DREAM Lab

## Proyectos relacionados

-   Se puede consultar el frontend que consume esta API en el repositorio de [Frontend](https://github.com/CodeCraft-Solutions-DREAM-Lab/Front-End).
-   Asimismo, la aplicación que permite la conexión con el chat de voz se puede encontrar en el repositorio de [RecomendacionesDreamLab](https://github.com/CodeCraft-Solutions-DREAM-Lab/RecomendacionesDreamLab).

## Despliegue

Este API se encuentra desplegado como un App Service de Azure en la siguiente liga: [dreamlab-api.azurewebsites.net](dreamlab-api.azurewebsites.net).

## Configuración

Para configurar el proyecto localmente puedes seguir los siguientes pasos:

1. Clona el repositorio utilizando Git. Si no tienes Git instalado, puedes descargarlo desde [https://git-scm.com/downloads](https://git-scm.com/downloads).

    Para clonar el repositorio, abre una terminal y ejecuta el siguiente comando:

    ```
    git clone https://github.com/CodeCraft-Solutions-DREAM-Lab/Back-End.git
    ```

2. Navega al directorio del proyecto:

    Usando la misma terminal con la que se clonó el repositorio, ejecuta el siguiente comando para cambiar el directorio activo en la terminal y que el resto de los comandos se corran dentro del proyecto:

    ```
     cd "Back-End"
    ```

3. Instala las dependencias de Node. Para poder correr este comando es necesario tener instalado Node con la versión `20.X`, puedes descargarlo desde [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager):

    ```
    npm install
    ```

4. Crea en la raiz del proyecto el archivo de las variables de entorno:

    4.1. Corre uno de estos dos comandos dependiendo de tu sistema operativo:

    > Unix (macOS, Linux):

    ```
    touch .env && nano .env
    ```

    > Windows

    ```
    echo. > .env && notepad .env
    ```

    4.2. Copia las siguientes variables en el archivo:

    ```
    # API
    AZURE_SQL_PORT=1433
    AZURE_SQL_AUTHENTICATIONTYPE=azure-active-directory-password

    # Autenticacion
    TOKEN_SECRET=<SECRET>

    # Correo
    SMTP_PASSWORD=<PASSWORD>
    SMTP_SERVER_EMAIL=<EMAIL_ADDRESS>

    # Base de datos
    AZURE_SQL_USER=<USER>
    AZURE_SQL_PASSWORD=<PASSWORD>
    AZURE_SQL_DATABASE=<DATABASE_NAME>
    AZURE_SQL_SERVER=<SERVER_URL>
    ```

> [!NOTE]
> Es necesario modificar los valores entre `< >` con los tuyos propios para que funcione la aplicación.
>
> ¿No cuentas con una base de datos? Sigue los pasos de la sección "[Creando una base de datos en Azure](#creando-una-base-de-datos-en-azure)".
>
> ¿No sabes cómo configurar un correo para que la API lo use? Sigue los pasos de la sección "[Configurando un correo](#configurando-un-correo)".

## Creando una base de datos en Azure

Para poder crear una base de datos SQL en azure, será necesario crear una Azure SQL Database junto con un Azure SQL Server.

Puedes seguir [este tutorial](https://learn.microsoft.com/es-mx/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal) de Microsoft Learn que te guiará en todos los pasos necesarios para crear una base de datos en Azure.

## Configurando un correo

1. Crear un correo gmail
2. Activar la autenticación de 2 pasos en este correo
3. Generar una contraseña de aplicación


   Se puede configurar desde Configuración > Seguridad > Contraseñas de Aplicación
5. Añadir estas 2 variables al entorno de la aplicación
```
    1. SMTP_PASSWORD=xxxx xxxx xxxx xxxx (Contraseña generada)
    2. SMTP_SERVER_EMAIL=ejemplo@gmail.com
```
    
## Inicio

Para iniciar el servidor, ejecuta:

```
npm start
```

## Consultar la documentación

Para consultar la documentación de swagger sobre los endpoints con los que cuenta esta API visita [esta URL](http://localhost:3000/docs) en tu navegador de preferencia:

```
http://localhost:3000/docs
```
