# API Posts – Backend

Backend en **Node.js + Express (TypeScript)** que consume un API público, normaliza los datos y expone:

- `GET /api/posts` – Lista de posts (filtro opcional `?name=`)
- `GET /api/posts/summary` – Resumen `[{ name, postCount }]` (filtro opcional `?name=`)

Incluye Helmet, CORS, logger (duración por request) y manejador de errores consistente.

---

## Stack

- Node **v22.12.0**
- Express + TypeScript
- Zod (validación / coerción)
- Axios
- Docker (multi-stage) + Docker Compose

---

## Variables de entorno

Crea tu archivo `.env` a partir de `.env.template`:

## Levantar en desarrollo (sin docker)
1) Instalar dependencias
npm ci

2) Copiar .env de ejemplo y ajustar valores

3) Levantar en dev (ts-node-dev)
npm run dev

## Ejecutar con docker

Asegúrate de tener **Docker** y **Docker Compose** instalados.  
El proyecto incluye un `Dockerfile` multi-stage y un `docker-compose.yml`.

> **Nota:** El archivo `.env` **no se copia** dentro de la imagen. Se inyecta en tiempo de ejecución con `--env-file` o `env_file`.

---

1) docker compose build --no-cache
2) docker compose up -d

---
### Visualizacion de logs
docker compose logs -f api
