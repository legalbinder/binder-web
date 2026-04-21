# Binder Web

Sitio web comercial de Binder construido con React 18, TypeScript y Vite.

## Stack

- React 18
- TypeScript
- Vite 5
- React Router DOM 7
- react-helmet-async
- Framer Motion

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Estado tecnico

- `npm run lint`: debe pasar
- `npm run build`: debe pasar
- analytics y LinkedIn tracking estan controlados por consentimiento
- no existen defaults silenciosos a endpoints Bubble legacy

## Variables de entorno

Ver [.env.example](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\.env.example).

Principales:

```env
VITE_HOME_CONTACT_WEBHOOK_URL=
VITE_EVENTS_WEBHOOK_URL=
VITE_WEBHOOK_URL=
VITE_GA_MEASUREMENT_ID=
VITE_GOOGLE_ADS_ID=
VITE_LINKEDIN_PARTNER_ID=
```

## Arquitectura resumida

### App shell

- [src/App.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\App.tsx)

Responsable de:

- providers
- rutas
- tracking
- banner de cookies
- navegacion global

### Contenido

- `src/content/*`

El sitio usa archivos de contenido para textos y metadata de landings, incluyendo eventos.

### Formularios

Lead forms compartidos:

- [src/hooks/useLeadCaptureForm.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\hooks\useLeadCaptureForm.ts)
- [src/utils/leadCapture.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\leadCapture.ts)
- [src/utils/eventoCierreBubble.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\eventoCierreBubble.ts)
- [src/utils/bubbleWorkflowRequest.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\bubbleWorkflowRequest.ts)

Rutas/formularios relevantes:

- home: [src/components/sections/Contact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\Contact.tsx)
- casos: [src/components/sections/CasesContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\CasesContact.tsx)
- deals: [src/components/sections/DealsContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\DealsContact.tsx)
- expediente: [src/components/sections/ExpedienteContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\ExpedienteContact.tsx)
- diagnostico: [src/pages/DiagnosticoLegalOpsPageGateStart.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\DiagnosticoLegalOpsPageGateStart.tsx)
- eventos: [src/pages/eventos/EventPage.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\eventos\EventPage.tsx)

### Tracking y consentimiento

- [src/components/layout/GoogleAnalytics.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\layout\GoogleAnalytics.tsx)
- [src/components/layout/LinkedInInsightTag.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\layout\LinkedInInsightTag.tsx)
- [src/utils/tracking.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\tracking.ts)
- [src/context/CookieContext.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\context\CookieContext.tsx)

Notas:

- GA se carga solo despues del consentimiento analitico
- LinkedIn Insight Tag solo se activa en paginas de eventos y con consentimiento
- `index.html` no debe volver a inyectar `gtag.js` manualmente

## Estructura funcional

Rutas principales:

- `/`
- `/casos-uso/*`
- `/eventos/:slug`
- `/diagnostico-legal-ops-formulario-inicio`
- `/gracias`
- `/legal/*`

La landing de eventos toma su metadata desde:

- [src/content/eventos.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\content\eventos.ts)

## Deployment

- Vercel SPA con rewrite definido en [vercel.json](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\vercel.json)
- DNS puede seguir administrado fuera de Vercel; no es requisito mover nameservers

## Documentacion relacionada

- [DOCUMENTACION_FORMULARIO_BUBBLE.md](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\DOCUMENTACION_FORMULARIO_BUBBLE.md)
- [AWS_WEBHOOK_BRIEF.md](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\AWS_WEBHOOK_BRIEF.md)
- [TESTING.md](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\TESTING.md)

## Notas

- `swiper` ya no forma parte de las dependencias directas del proyecto.
- Si se introduce un nuevo evento, actualizar `src/content/eventos.ts`, no hardcodear fecha/hora en la pagina.
