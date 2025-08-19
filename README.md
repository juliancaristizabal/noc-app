# Proyecto NOC

El objetivo fue crear una serie de tareas usando Arquitectura Limpia (o Hexagonal) con TypeScript.

# dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```
PORT=3000
MAILER_EMAIL=correo@gmail.com
MAILER_SECRET_KEY=12345
PROD=false
```

3. Ejecuta el comando:
```
npm install
```

4. Levantar las bases de datos con el comando (debes tener Docker instalado):
```
docker compose up -d
```

5. Para iniciar la aplicación ejecutar el comando:
```
npm run dev
```