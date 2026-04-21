# Testing Guide - Binder Web

## Gates tecnicos

Antes de desplegar:

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] revisar variables de entorno requeridas

## Smoke checks funcionales

### Home

- [ ] `/` carga correctamente
- [ ] la navegacion funciona
- [ ] el formulario de [src/components/sections/Contact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\Contact.tsx) valida nombre, empresa, email corporativo y consentimiento
- [ ] envio exitoso redirige a `/gracias`

### Casos de uso

- [ ] formularios de `CasesContact`, `DealsContact` y `ExpedienteContact` envian al webhook general
- [ ] si falta `VITE_WEBHOOK_URL`, la UI muestra error explicito
- [ ] `/gracias` muestra `name`, `company`, `email`

### Diagnostico Legal Ops

- [ ] gate inicial valida `name`, `company`, `email`, `role`
- [ ] dominios personales son rechazados
- [ ] el resultado final envia el payload del diagnostico
- [ ] exito redirige a `/gracias`

### Eventos

- [ ] `/eventos/:slug` carga sin nav global
- [ ] fecha/hora visible coincide con [src/content/eventos.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\content\eventos.ts)
- [ ] registro valida nombre, apellido, email corporativo, cargo, empresa y consentimiento
- [ ] exito muestra estado de registro correcto

## Tracking y cookies

### Consentimiento

- [ ] sin consentimiento, no se carga GA
- [ ] al rechazar cookies, no se activa tracking analitico
- [ ] al aceptar cookies, GA se carga y registra page view
- [ ] LinkedIn Insight Tag solo se activa en paginas de eventos y solo con consentimiento

### Verificacion manual sugerida

- [ ] abrir DevTools Network y confirmar que `gtag/js` no aparece antes de aceptar
- [ ] abrir una pagina que no sea evento y confirmar que no se carga LinkedIn
- [ ] abrir `/eventos/:slug`, aceptar cookies y confirmar carga de LinkedIn

## Formularios y webhooks

### Variables de entorno

- [ ] `VITE_HOME_CONTACT_WEBHOOK_URL` configurada para home
- [ ] `VITE_EVENTS_WEBHOOK_URL` configurada para eventos
- [ ] `VITE_WEBHOOK_URL` configurada para casos de uso y diagnostico

### Casos de prueba

- [ ] URL Bubble con `/initialize` sigue funcionando por normalizacion
- [ ] URL Bubble sin `/initialize` funciona igual
- [ ] error Bubble con `body.message` se muestra correctamente en UI
- [ ] si un webhook falta, no se usa ningun endpoint legacy

## UI y contenido

- [ ] no hay texto mojibake visible
- [ ] `WhyBinder` rota correctamente
- [ ] `CasesStats` y `DealsStats` no rompen hooks
- [ ] fondos/animaciones no dejan warnings de lint

## Paginas legales

- [ ] `CookiesPage` refleja el tracking real actual
- [ ] no hardcodea un GA ID distinto al configurado

## Responsive

- [ ] desktop
- [ ] tablet
- [ ] mobile

Verificar especialmente:

- [ ] landing de eventos
- [ ] formularios
- [ ] banner de cookies

## Audit

- [ ] `npm audit --omit=dev`

Objetivo actual:

- 0 vulnerabilidades productivas

## Referencias utiles

- [README.md](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\README.md)
- [DOCUMENTACION_FORMULARIO_BUBBLE.md](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\DOCUMENTACION_FORMULARIO_BUBBLE.md)
- [AWS_WEBHOOK_BRIEF.md](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\AWS_WEBHOOK_BRIEF.md)
