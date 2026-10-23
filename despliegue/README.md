# Ejecución con PM2 y nginx

Requisitos: Node.js, PM2 (`npm install -g pm2`), nginx y la base de datos con el script `backend/database/clinica.sql` cargado.

## 1. Compilar

```
cd backend
npm run build

cd ../frontend
npx ng build
```

## 2. Backend con PM2 (puerto 3100)

El archivo `backend/.env` debe existir (ver `backend/.env.example`).

```
pm2 start despliegue/ecosystem.config.cjs
pm2 status
pm2 logs clinica-backend
pm2 stop clinica-backend
```

## 3. Frontend con nginx (puerto 8080)

Desde la carpeta `despliegue`:

```
nginx -p "<ruta completa de la carpeta despliegue>" -c nginx.conf
```

Para detenerlo:

```
nginx -p "<ruta completa de la carpeta despliegue>" -c nginx.conf -s stop
```

## 4. Probar

- Sistema: http://localhost:8080
- Swagger: http://localhost:8080/api

nginx sirve el frontend compilado y envía todo lo que empieza con `/api` al backend que corre en PM2.

## Documentación con compodoc

```
cd backend
npm run compodoc
```

Se abre en http://localhost:8081

## Datos de prueba

Después de cargar `backend/database/clinica.sql`, se pueden agregar usuarios con clave conocida y algunas reservas de ejemplo:

```
psql -h localhost -p 5432 -U postgres -d Clinica -f backend/database/seed-datos-prueba.sql
```

Se puede ejecutar varias veces sin duplicar datos. Las fechas de las reservas se calculan a partir del día en que se ejecuta.

| Rol | Documento | Clave |
|---|---|---|
| Administrador | 8000 | clinica123 |
| Médico | 8100 y 8101 | clinica123 |
| Paciente | 8200, 8201 y 8202 | clinica123 |
