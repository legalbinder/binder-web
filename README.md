# Binder Web

Sitio web comercial de Binder construido con React, TypeScript y Vite. La app funciona como SPA en Vercel y cubre landing principal, paginas comerciales, casos de uso, eventos, diagnostico Legal Ops, formularios de captacion y paginas legales.

## Stack

- React 18
- TypeScript
- Vite 5
- React Router DOM 7
- Framer Motion
- react-helmet-async
- ESLint

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Variables de entorno

Las variables se configuran en Vercel como Environment Variables. Los webhooks estan documentados en [WEBHOOKS.md](WEBHOOKS.md).

```env
VITE_BUBBLE_HOME_CONTACT_WEBHOOK_URL=
VITE_BUBBLE_EVENT_REGISTRATION_WEBHOOK_URL=
VITE_BUBBLE_USE_CASES_AND_DIAGNOSIS_WEBHOOK_URL=
VITE_BUBBLE_COMPLAINT_BOOK_WEBHOOK_URL=

VITE_GA_MEASUREMENT_ID=
VITE_GOOGLE_ADS_ID=
VITE_LINKEDIN_PARTNER_ID=
```

## Vistas y rutas

| Ruta | Vista | Descripcion resumida |
| --- | --- | --- |
| `/` | Landing principal | Home comercial con propuesta de valor, razones para usar Binder, soluciones, apps y formulario de contacto. |
| `/porquebinder` | Por que Binder | Pagina interna sobre beneficios, centralizacion, automatizacion y visibilidad para equipos legales. |
| `/sobrebinder` | Sobre Binder | Presentacion de la empresa, enfoque, mision y vision de producto. |
| `/funcionalidades` | Funcionalidades | Resumen de capacidades de la plataforma: contratos, procesos, expediente digital, IA y gestion legal. |
| `/soluciones` | Soluciones | Vista general de soluciones Binder por necesidad operativa legal. |
| `/testimonios` | Testimonios | Casos y referencias de clientes. |
| `/contacto` | Contacto | Pagina interna de contacto y solicitud de informacion/demo. |
| `/gracias` | Gracias | Confirmacion posterior a formularios que usa datos guardados en `sessionStorage`. |
| `/diagnostico-legal-ops-formulario-inicio` | Diagnostico Legal Ops | Gate de lead, quiz de madurez, resultado por nivel y envio a Bubble. |
| `/diagnostico-legal-ops` | Redirect | Redirige a `/diagnostico-legal-ops-formulario-inicio`. |
| `/casos-uso/clm` | CLM con IA | Landing de gestion de contratos: ciclo de vida contractual, automatizacion, trazabilidad e IA. |
| `/casos-uso/gestion-procesos` | Gestion de procesos legales | Landing para procesos judiciales/administrativos, expedientes, oficios y control operativo. |
| `/casos-uso/expediente-digital` | Expediente digital | Landing para mesa de partes online, expediente digital y trazabilidad documental. |
| `/cases` | Redirect | Redirige a `/casos-uso/gestion-procesos`. |
| `/eventos/:slug` | Landing de evento | Landing independiente para eventos/webinars. El contenido sale de `src/content/eventos.ts`. |
| `/legal/privacidad` | Politica de privacidad | Pagina legal de privacidad. |
| `/legal/cookies` | Politica de cookies | Pagina legal de cookies alineada con consentimiento de tracking. |
| `/legal/terminos` | Terminos y condiciones | Pagina legal de terminos de uso. |
| `/legal/aviso` | Aviso legal | Pagina de aviso legal. |
| `/legal/seguridad` | Seguridad de datos | Pagina de seguridad y cumplimiento. |
| `/legal/reclamaciones` | Libro de reclamaciones | Formulario de reclamos/quejas con validacion local y envio dedicado a Bubble. |
| `/docs/prep-reunion-oka-ciberseguridad` | Documento interno | Vista interna para preparacion de reunion/ciberseguridad. |
| `/hito2/anexos` | Anexos Hito 2 | Hub de anexos internos. |
| `/hito2/anexos/onboarding/anexo-1` | Anexo onboarding 1 | Estructura estandar de carpeta de onboarding. |
| `/hito2/anexos/onboarding/anexo-2` | Anexo onboarding 2 | Documento escaneado y texto OCR. |
| `/hito2/anexos/onboarding/anexo-3` | Anexo onboarding 3 | Output estructurado por IA en JSON. |
| `/hito2/anexos/onboarding/anexo-4` | Anexo onboarding 4 | Pantalla de revision documental con QA y flags. |
| `/hito2/anexos/onboarding/anexo-5` | Anexo onboarding 5 | Pipeline completo de onboarding. |
| `/gentle-waves` | Vista visual interna | Playground visual/fondo. |
| `/canyon-flows` | Vista visual interna | Playground visual/fondo. |
| `/flow-pattern` | Vista visual interna | Playground visual/fondo. |
| `/test/antigravity` | Test visual | Pantalla de prueba de animacion/hero. |

## Formularios

| Formulario | Ubicacion | Webhook |
| --- | --- | --- |
| Contacto home | `src/components/sections/Contact.tsx` + `src/shared/forms/lead-capture/LeadCaptureSection.tsx` | `VITE_BUBBLE_HOME_CONTACT_WEBHOOK_URL` |
| Casos de uso | `CasesContact`, `DealsContact`, `ExpedienteContact` + `LeadCaptureSection` | `VITE_BUBBLE_USE_CASES_AND_DIAGNOSIS_WEBHOOK_URL` |
| Diagnostico Legal Ops | `src/pages/DiagnosticoLegalOpsPageGateStart.tsx` | `VITE_BUBBLE_USE_CASES_AND_DIAGNOSIS_WEBHOOK_URL` |
| Registro de eventos | `src/pages/eventos/EventPage.tsx` | `VITE_BUBBLE_EVENT_REGISTRATION_WEBHOOK_URL` |
| Libro de reclamaciones | `src/pages/legal/ReclamacionesPage.tsx` | `VITE_BUBBLE_COMPLAINT_BOOK_WEBHOOK_URL` |

## Estructura principal

```text
src/
  app/
    App.tsx                       # Entrada de app
    AppLayout.tsx                 # Layout global: nav, footer, tracking, cookies
    providers.tsx                 # Providers globales
    routes.tsx                    # Mapa de rutas
  components/
    layout/                       # Navegacion, SEO global, tracking, paginas internas
    sections/                     # Secciones visuales y wrappers por landing
    ui/                           # UI transversal: botones, cookies, backgrounds
    seo/                          # PageHead y SchemaMarkup
  content/                        # Contenido editable de home, soluciones, eventos, footer, etc.
  context/                        # Theme, background y consentimiento de cookies
  data/                           # Paises y dominios bloqueados
  hooks/                          # Hooks visuales/transversales
  pages/                          # Paginas por ruta
  shared/
    forms/lead-capture/           # Formulario reusable de leads y payloads
    integrations/bubble/          # Resolucion de webhooks, POST y errores Bubble
    utils/                        # Utilidades compartidas de email y sessionStorage
  tracking/                       # Configuracion y carga runtime de tracking
```

## Tracking y cookies

- Google Analytics y Google Ads se cargan solo si el usuario acepta cookies analiticas.
- LinkedIn Insight Tag se activa solo en paginas de eventos y solo con consentimiento analitico.
- `index.html` no debe inyectar scripts de tracking directamente.
- La configuracion vive en `src/tracking/config.ts` y la carga runtime en `src/tracking/tracking.ts`.

## Contenido editable

- Eventos: `src/content/eventos.ts`.
- Home y secciones comerciales: `src/content/home.ts`, `src/content/porquebinder.ts`, `src/content/soluciones.ts`, `src/content/apps.ts`, `src/content/contacto.ts`.
- Casos de uso: `src/content/cases.ts`, `src/content/deals.ts`, `src/content/expedienteDigital.ts`.
- Footer: `src/content/footer.ts`.

## Checklist antes de publicar

```bash
npm run lint
npm run build
```

Revisar tambien:

- Variables `VITE_BUBBLE_*_WEBHOOK_URL` configuradas en Vercel.
- Formularios probados contra workflows reales de Bubble.
- Consentimiento de cookies validado antes de activar tracking.
- `/legal/reclamaciones` probado en desktop y mobile.
