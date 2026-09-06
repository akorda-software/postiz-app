# Runbook — Postiz Akorda

Instancia privada y autoalojada de Postiz en `https://postiz.akorda.es`,
operada por Albert Álvarez Estellés (Akorda). Rama de deploy: `main-kukapu`.

## 1. Topología (2 VPS, no olvidar)

```
Internet
  → Cloudflare (DNS + proxy; las respuestas traen `server: cloudflare`)
  → VPS Caddy (binario systemd, SIN docker)
      Caddyfile: /etc/caddy/Caddyfile
      postiz.akorda.es → reverse_proxy 192.168.0.121:80  (VPS Dokploy, plano)
  → VPS Dokploy
      dokploy-traefik (puertos 80/443 del host)
      → postiz:5000 (nginx dentro del contenedor)
          → frontend: `next start -p 4200`
          → backend: Nest en puerto 3000 (interno, nunca expuesto fuera)
      → orquestador + postgres + redis + temporal (internos)
```

A recordar:

- El router Traefik del dominio vive en el **443 TLS**; Caddy ataca por el **80**.
  Si Traefik no tiene ruta en el 80, devuelve su `404 page not found`
  (texto plano, 19 bytes) y Caddy lo reenvía añadiendo `via: 1.1 Caddy`.
  Esa firma = problema de ruta, NO de código de la app.
- Healthcheck del contenedor exige **5000 (nginx) y 3000 (backend)** < 500.
  Sin ambos, el contenedor figura `unhealthy` y Traefik deja de enrutarle.
- Dominios testigo en el mismo Caddyfile y mismo `:80`
  (`kukapu.dev`, `kaselles.com`): si ellos van y postiz no,
  el fallo es específico de postiz (router/dominio/backend), nunca de Caddy/Cloudflare.

## 2. Variables de entorno (Dokploy → compose `environment:`)

| Proveedor       | Variables (todas opcionales, `:-` = vacío por defecto)                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| TikTok legacy   | `TIKTOK_CLIENT_ID`, `TIKTOK_CLIENT_SECRET`                                                                                        |
| TikTok Business | `TIKTOK_BUSINESS_CLIENT_ID`, `TIKTOK_BUSINESS_CLIENT_SECRET`                                                                      |
| Pinterest       | `PINTEREST_CLIENT_ID`, `PINTEREST_CLIENT_SECRET`, `PINTEREST_SANDBOX` (`true` = api-sandbox, Trial; ausente/`false` = producción) |
| Otros           | `YOUTUBE_*`, `FACEBOOK_*`, `INSTAGRAM_*`, `LINKEDIN_*`, `X_*`, `OPENAI_*`, email, Cloudflare R2…                                  |

A recordar:

- Vacía ≡ no definida para el arranque (el código solo lee estas vars
  al conectar/publicar, nunca en el boot). Añadirlas vacías no puede colgar nada.
- Sin `TIKTOK_BUSINESS_*` con valor, TikTok Business no autentica.
- `DISABLE_REGISTRATION=true` para mantener la instancia privada sin registro abierto.
- Scopes reales que pide el código (legacy):
  `user.info.basic, user.info.profile, user.info.stats, video.list, video.upload, video.publish`
  (`video.create` NO existe; business cambia `profile` por `username`).

## 3. Procedimiento de deploy

1. Commit + push a `main-kukapu`.
2. En Dokploy: revisar/añadir valores de entorno necesarios.
3. **Redeploy completo con rebuild** (no basta reiniciar: el build compila
   frontend+backend y el compose reinterpola envs).
4. Smoke test sin login (ver §5 si algo falla):
   - `https://postiz.akorda.es/` → 307 (redirige a `/auth`)
   - `https://postiz.akorda.es/auth/login` → 200
   - `https://postiz.akorda.es/terms-of-service` → 200
   - `https://postiz.akorda.es/privacy-policy` → 200
5. Entrar con usuario y publicar una prueba si se tocó alguna integración.

## 4. Diagnóstico (comandos por máquina)

VPS Dokploy (ajustar `akorda-postiz-<id>-postiz-1` al deployment actual):

```bash
docker ps --format '{{.Names}} {{.Status}} {{.Ports}}'
docker logs akorda-postiz-<id>-postiz-1 --tail 40
docker exec akorda-postiz-<id>-postiz-1 pm2 list
docker exec akorda-postiz-<id>-postiz-1 pm2 logs backend --lines 60 --nostream
docker inspect akorda-postiz-<id>-postiz-1 --format '{{json .State.Health}}'
# ¿qué puerto falla? (5000 nginx / 3000 backend)
docker exec akorda-postiz-<id>-postiz-1 node -e "const h=require('http');const t=(p)=>new Promise((ok)=>{const r=h.get('http://127.0.0.1:'+p+'/',x=>{x.resume();console.log(p,x.statusCode);ok()});r.on('error',e=>{console.log(p,'ERR',e.code||e.message);ok()});r.setTimeout(4000,()=>{console.log(p,'TIMEOUT');r.destroy();ok()})});(async()=>{await t(5000);await t(3000)})()"
```

VPS Caddy (sin docker):

```bash
systemctl status caddy --no-pager
journalctl -u caddy -n 40 --no-pager
cat /etc/caddy/Caddyfile
```

Separar Cloudflare del origen (IP pública del VPS Dokploy):

```bash
curl -sk --resolve postiz.akorda.es:443:<IP-VPS-DOKPLOY> \
  https://postiz.akorda.es/auth/login -o /dev/null -w "%{http_code}\n"
```

## 5. Incidentes

- [2026-09-06 — 404 tras redespliegue](2026-09-06-404-tras-redespliegue.md)
