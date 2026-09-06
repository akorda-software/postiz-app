# 2026-09-06 — 404 total en postiz.akorda.es tras redespliegue

Fecha: 2026-09-06 ~10:05–10:30 CEST.
Deploy implicado: commits `b9d3d81a` (legales ES/EN + borrado de tokens)
y `7eea9f0f` (envs Pinterest + TikTok Business en compose Dokploy).
Estado final: **resuelto** (smoke test 307/200/200/200). Causa raíz del
atasco del backend: **pendiente de confirmar** (ver §6).

## 1. Síntoma

`https://postiz.akorda.es/` → `404 page not found` (texto plano, 19 bytes),
cabeceras `server: cloudflare` + `via: 1.1 Caddy`. Logs del contenedor sanos
(pm2 con backend/frontend/orchestrator online, Prisma en sync).

## 2. Contexto del deploy

- Se añadieron al compose 4 variables (`PINTEREST_*`, `TIKTOK_BUSINESS_*`)
  con valores vacíos en Dokploy, más los valores reales de Pinterest/TikTok.
- Se hizo redeploy completo con rebuild.

## 3. Diagnóstico (evidencias, en orden)

1. `server: cloudflare` = respuesta generada antes de llegar al VPS.
   DNS → IPs anycast de Cloudflare (proxy activo).
2. Cuerpo + `via: 1.1 Caddy` = 404 de la cadena proxy, no de la app.
3. Prueba vecina decisiva (mismo Caddyfile, mismo `:80`):
   `kukapu.dev` → 200, `kaselles.com` → 200,
   `postiz.akorda.es` → 404, `postiz-elixir.akorda.es` → 404.
   → El camino Caddy→Traefik funciona; el fallo es específico de `postiz.*`.
   → `postiz-elixir` no se tocó en el deploy: **el deploy de código es inocente**.
4. `docker ps` (VPS Dokploy): `akorda-postiz-q7ytl2-postiz-1 Up (unhealthy)`,
   resto healthy. No existe ningún contenedor Caddy (vive en el otro VPS).
5. Test por puerto dentro del contenedor: `5000 → 307` (nginx vivo),
   `3000 → ECONNREFUSED` (backend muerto a efectos de red).
6. `pm2 list`: backend `online`, **0 restarts**; `pm2 logs backend`: solo la
   línea de arranque, cero logs de Nest (ni siquiera `Starting Nest application`).
   → Proceso vivo pero atascado antes del primer log, 8+ min.

## 4. Causas y fixes aplicados

- **Causa A — backend colgado pre-arranque.** Fix: `pm2 restart backend`.
  (Si fue transitorio del arranque en paralelo, con esto basta.)
- **Causa B — router Traefik del dominio.** Caddy ataca por `:80` en plano y el
  router vive en el `:443` TLS; al redesplegar, el router del dominio puede
  quedar sin registrar. Fix: re-salvar el dominio en Dokploy.
- Tras A + B: smoke test en verde.
- **Causa C (CONFIRMADA 10:25–10:48) — race en init de Mastra por backends
  duplicados.** `pm2 restart backend` mata solo el wrapper `pnpm`, no al nieto
  `node main.js` (doble envoltura `pm2 → pnpm → sh → dotenv → node`;
  evidencia: `failed to kill - retrying` + SIGKILL + PIDs 276/725/820 vivos
  a la vez). Los huérfanos concurrentes provocan dos cosas:
  (a) `MastraError: duplicate key ... (mastra_mcp_clients, 2200) already exists`
  en `PostgresStore.init` → crash con exit 1 (10:25:43);
  (b) `EADDRINUSE :::3000` en el siguiente arranque → proceso vivo pero sordo
  (`main.ts` captura el error de `listen` y no muere, 10:25:46 PID 820).
  Reinicio limpio del contenedor (10:48) → un solo backend (PID 259),
  boot en ~300ms, smoke test 307/200/200/200.

## 5. Descarte importante (no repetir)

Las variables vacías **no** cuelgan el arranque: el código solo lee
`TIKTOK_BUSINESS_*` / `PINTEREST_*` dentro de los métodos del provider
(al conectar/publicar), y vacía ≡ no definida en cualquier comprobación.
Verificado en `tiktok.business.provider.ts`, `tiktok.provider.ts`,
`pinterest.provider.ts`.

## 6. Pendiente / TODO

- [x] Causa raíz del backend colgado: CONFIRMADA (ver §4, Causa C).
      No era import-time: era concurrencia (huérfanos de pm2) + race en el DDL
      de Mastra + `EADDRINUSE` tragado por el try/catch de `main.ts`.
- [ ] Purga de tokens de canales borrados antes del fix `deleteChannel`
      (`prisma.integration.updateMany({ where: { deletedAt: { not: null } },
data: { token: '', refreshToken: null } })`) — no ejecutar en prod sin OK.
- [ ] `DISABLE_REGISTRATION=true` en Dokploy (instancia privada).
- [ ] Completar NIF/dirección en el aviso legal de akorda.es (TikTok puede pedirlo).

## 7. Lecciones para recordar

- Ante un 404 con `server: cloudflare` + `via: 1.1 Caddy`: leer la firma,
  probar los dominios testigo y mirar `docker ps` antes de tocar código.
- El `unhealthy` del contenedor lo provoca el puerto que falle (5000 o 3000);
  separarlos con el test por puerto ahorra una hora.
- `pm2 online` ≠ app escuchando: `online` solo dice que el proceso vive.
- Cada redeploy Dokploy cambia el sufijo del contenedor (`q7ytl2`):
  ajustar los comandos. Y re-salvar el dominio si el router no aparece.
- Este incidente "ya había pasado una vez": a partir de ahora, todo incidente
  con fix se documenta aquí con fecha antes de cerrarlo.
- REGLA: dentro del contenedor, NUNCA `pm2 restart <app>` (deja huérfanos que
  compiten por el puerto y por el DDL de Mastra). Recuperación = `docker restart`
  del contenedor entero y comprobar un solo `main.js` por app.
