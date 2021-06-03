# REST-API-Typescript

    Realizar un proyecto de REST API en NodeJS con Typescript.
    Utilizar express npm
    Agregar CORS
    Agregar morgan para logs
    Hacer conexión a bdd mongodb usando mongoose
    La api debe tener seguridad con JWT

1. Se debe crear un modelo llamado Users con los siguientes campos

   \_id -> objectID
   name -> string
   last_name -> string
   email -> array
   phones -> array
   updatedAt -> Date
   modifiedAt -> Date
   birthday -> Date
   password

2. Crear endpoints de Create, Update, Delete Users

3. Crear un endpoint para agregar emails (debe enviar el email que se quiere agregar, el email debe ser validado)

andres@ -> no válido

andres@asap -> no válido

andres@asap. -> no es válido

andres@asap.com válido

4. Crear un endpoint para borrar email (debe enviar el email a querer borrar)

5. Crear un endpoint que retorne los usuarios y ademas que calcule la edad actual, ejemplo 25 years 2 months 2 day.

6. Crear endpoint de autenticación que valide si el password y correo son correctos, una vez que evalúe, si es válido debe enviar el JWT y si no, retornar error 401.

7. Crear un endpoint que envíe correos, (puede usar cualquier servicio smtp que da cuentas gratuitas como Amazon SES, elasticMail, sendgrid)

   El endpoint debe recibir
   To
   From
   Body
   Subject
