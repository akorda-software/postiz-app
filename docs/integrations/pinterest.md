# Pinterest — notas de integración (2026-09-06)

## Límite de Trial (verificado con la API real)

Respuesta literal de `POST https://api.pinterest.com/v5/pins` con app en Trial:

```json
{
  "code": 29,
  "message": "Apps with Trial access may not create Pins in production https://api.pinterest.com - use API Sandbox https://api-sandbox.pinterest.com instead."
}
```

Consecuencias:

- En Trial **sí** funciona: OAuth connect, `GET /v5/boards`, lectura de cuenta.
  (Verificado: `GET /v5/boards` → 200 con el tablero `Postiz API Review Test`.)
- En Trial **no** funciona: crear pins en producción (código 29).
- Postiz muestra este caso como `bad_body` / `Unknown Error` genérico porque
  el mensaje no está mapeado en `handleErrors` de `pinterest.provider.ts`.

## Modo Sandbox (`PINTEREST_SANDBOX=true`)

Implementado en `pinterest.provider.ts` (`getApiBaseUrl`, usa el helper
heredado `assetBoolean`, igual que el resto de flags del repo).
Con `PINTEREST_SANDBOX=true` **todas** las llamadas (OAuth token exchange,
user_account, boards, media, pins, analytics) van a
`https://api-sandbox.pinterest.com`. La authorize URL sigue en
`https://www.pinterest.com/oauth/` (así lo documenta Pinterest).
Sin la variable (o cualquier valor salvo `true`) todo sigue a producción:
los usuarios existentes no notan nada.

Secuencia Trial → Standard (los tokens de sandbox y producción NO son
intercambiables):

1. `PINTEREST_SANDBOX=true` en envs Dokploy + redeploy.
2. Desconectar y reconectar Pinterest en Postiz (token de sandbox).
3. Grabar OAuth + creación del pin en sandbox.
4. Solicitar Standard con ese vídeo (no enviar un vídeo con fallos).
5. Tras la aprobación: quitar la variable, redesplegar y reconectar
   (token de producción).

Limitación: en modo sandbox el `releaseURL` (`pinterest.com/pin/...`) no
resuelve (los datos de sandbox no son visibles en pinterest.com); no afecta
a la demo.

## Checklist para publicar vía Postiz (una vez en Standard)

1. Cuenta conectada en Postiz (OAuth completo, sin `refreshNeeded`).
2. Tablero elegido del desplegable (la API exige `board_id` numérico, no el nombre).
3. Imagen pública `https://...` descargable (verificado con `curl -sI`:
   200 + `content-type: image/*` + tamaño razonable).
4. Descripción ≤ 800 caracteres, título ≤ 100, link con `https://` si se usa.
5. Scopes del token: `boards:read,boards:write,pins:read,pins:write,user_accounts:read`.

## Depurar un `bad_body` de Pinterest

Reproducir a mano con el token de la BD (ver runbook) y leer `code`/`message`:

```bash
TOKEN='...'
curl -s "https://api.pinterest.com/v5/boards?page_size=10" -H "Authorization: Bearer $TOKEN"
curl -s -X POST "https://api.pinterest.com/v5/pins" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"board_id":"<ID>","description":"test","media_source":{"source_type":"image_url","url":"<URL>"}}'
```

Token en BD: tabla `"Integration"`, `providerIdentifier LIKE '%pinterest%'`,
columna `token` (texto plano). Rotarlo desconectando y reconectando en Postiz.
