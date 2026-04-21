# Documentacion: Formularios del sitio -> Bubble

## Resumen

El proyecto ya no usa un solo formulario ni una sola variable de entorno para todos los envios.
Hoy existen tres contratos de webhook:

- `VITE_HOME_CONTACT_WEBHOOK_URL`: formulario principal del home.
- `VITE_EVENTS_WEBHOOK_URL`: registro de eventos en `/eventos/:slug`.
- `VITE_WEBHOOK_URL`: formularios de casos de uso y diagnostico.

Todos los webhooks se resuelven desde [src/utils/eventoCierreBubble.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\eventoCierreBubble.ts) y fallan de forma explicita si falta configuracion. Ya no existen defaults silenciosos a endpoints legacy.

---

## Flujo actual

### 1. Formularios de leads del sitio

Aplica a:

- [src/components/sections/Contact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\Contact.tsx)
- [src/components/sections/CasesContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\CasesContact.tsx)
- [src/components/sections/DealsContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\DealsContact.tsx)
- [src/components/sections/ExpedienteContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\ExpedienteContact.tsx)

Flujo:

```text
[Formulario React]
  -> useLeadCaptureForm
  -> leadCapture.ts (validacion + payload)
  -> bubbleWorkflowRequest.ts
  -> Bubble workflow
  -> sessionStorage(formSubmission)
  -> /gracias
```

### 2. Registro de eventos

Aplica a:

- [src/pages/eventos/EventPage.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\eventos\EventPage.tsx)

Flujo:

```text
[Landing de evento]
  -> validacion local
  -> getBubbleWebhookUrl('eventRegistration')
  -> bubbleWorkflowRequest.ts
  -> Bubble workflow de evento
  -> tracking generate_lead
```

### 3. Diagnostico Legal Ops

Aplica a:

- [src/pages/DiagnosticoLegalOpsPageGateStart.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\DiagnosticoLegalOpsPageGateStart.tsx)

Flujo:

```text
[Gate form]
  -> quiz
  -> resultado
  -> Bubble general lead workflow
  -> sessionStorage(formSubmission)
  -> /gracias
```

---

## Variables de entorno vigentes

Definidas en:

- [.env.example](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\.env.example)
- [src/vite-env.d.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\vite-env.d.ts)

### Requeridas segun el formulario que se despliegue

```env
VITE_HOME_CONTACT_WEBHOOK_URL=https://your-bubble-app.bubbleapps.io/api/1.1/wf/binderla-formulario
VITE_EVENTS_WEBHOOK_URL=https://your-bubble-app.bubbleapps.io/api/1.1/wf/evento-de-cierre
VITE_WEBHOOK_URL=https://your-bubble-app.bubbleapps.io/api/1.1/wf/your-general-lead-workflow
```

Notas:

- Se acepta una URL con o sin `/initialize`; el codigo la normaliza antes de hacer `POST`.
- Si una variable requerida no esta configurada, el frontend muestra un error explicito. No hay fallback a `binder0.bubbleapps.io/version-test`.

---

## Payloads actuales

### A. Home contact

Webhook:

- `getBubbleWebhookUrl('homeContact')`

Payload:

```json
{
  "name": "Juan Perez",
  "company": "Empresa XYZ",
  "email": "juan@empresa.com",
  "phone": "+51 999999999",
  "telefono": "+51 999999999",
  "phoneCountry": "PE",
  "challenge": "Gestion documental desordenada",
  "consent": true,
  "timestamp": "2026-04-21T15:00:00.000Z",
  "source": "contact-form"
}
```

### B. Casos / deals / expediente

Webhook:

- `getBubbleWebhookUrl('generalLead')`

`source` posible:

- `cases-contact-form`
- `deals-contact-form`
- `expediente-contact-form`

Payload:

```json
{
  "name": "Juan Perez",
  "company": "Empresa XYZ",
  "email": "juan@empresa.com",
  "phone": "+51 999999999",
  "telefono": "+51 999999999",
  "phoneCountry": "PE",
  "challenge": null,
  "consent": true,
  "timestamp": "2026-04-21T15:00:00.000Z",
  "source": "cases-contact-form"
}
```

### C. Registro de eventos

Webhook:

- `getBubbleWebhookUrl('eventRegistration')`

Payload:

```json
{
  "Nombres": "Juan Perez",
  "firstName": "Juan",
  "lastName": "Perez",
  "email": "juan@empresa.com",
  "jobTitle": "Legal Counsel",
  "company": "Empresa XYZ",
  "phone": "+51 999999999",
  "phoneCountry": "PE",
  "consent": true,
  "timestamp": "2026-04-21T15:00:00.000Z",
  "source": "event-registration",
  "eventSlug": "webinar-legalops-binder-niubox"
}
```

### D. Diagnostico Legal Ops

Webhook:

- `getBubbleWebhookUrl('generalLead')`

Payload:

```json
{
  "name": "Juan Perez",
  "company": "Empresa XYZ",
  "email": "juan@empresa.com",
  "phone": null,
  "phoneCountry": null,
  "challenge": "Diagnostico Legal Ops - Nivel 2 (Estructurado)",
  "consent": true,
  "timestamp": "2026-04-21T15:00:00.000Z",
  "source": "legal-ops-diagnosis",
  "role": "GC",
  "diagnosis": {
    "levelNumber": 2,
    "levelName": "Estructurado",
    "noCount": 4,
    "yesCount": 3,
    "totalQuestions": 7,
    "answers": [
      {
        "question": "Tus contratos estan centralizados en un repositorio unico?",
        "answer": "No"
      }
    ]
  }
}
```

---

## Validaciones reales en frontend

### Lead forms compartidos

Implementadas en:

- [src/hooks/useLeadCaptureForm.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\hooks\useLeadCaptureForm.ts)
- [src/utils/leadCapture.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\leadCapture.ts)

Validaciones:

- `name` requerido
- `company` requerida
- `email` requerido y con regex valida
- bloqueo de dominios personales segun [src/data/blockedEmailDomains.json](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\data\blockedEmailDomains.json)
- `consent` requerido
- `phone` opcional
- `challenge/message` opcional segun flujo

### EventPage

Validaciones:

- `firstName` requerido
- `lastName` requerido
- `email` requerido, valido y corporativo
- `jobTitle` requerido
- `company` requerida
- `consent` requerido

### Diagnostico

Validaciones:

- `name`, `company`, `email`, `role` requeridos
- email corporativo obligatorio
- el quiz debe completarse antes de enviar el resultado

---

## Utilidades compartidas

### Resolucion de endpoints

- [src/utils/eventoCierreBubble.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\eventoCierreBubble.ts)

Responsabilidades:

- mapear cada tipo de formulario a su variable de entorno
- normalizar URLs Bubble
- fallar de forma explicita si falta configuracion

### Request/errores Bubble

- [src/utils/bubbleWorkflowRequest.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\bubbleWorkflowRequest.ts)
- [src/utils/bubbleWorkflowError.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\bubbleWorkflowError.ts)

Responsabilidades:

- hacer el `POST`
- parsear respuesta JSON o texto
- convertir errores Bubble a mensajes legibles para UI

### Session storage de gracias

- [src/utils/formSubmission.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\formSubmission.ts)
- [src/pages/GraciasPage.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\GraciasPage.tsx)

Responsabilidades:

- guardar `name`, `company`, `email`
- leer y limpiar `formSubmission`
- evitar acceso directo repetido a `sessionStorage`

---

## Instrucciones para Bubble

### 1. Crear workflows separados por contrato

Recomendado:

- `binderla-formulario`
- `evento-de-cierre`
- un workflow general para leads de casos de uso y diagnostico

### 2. No depender de `/initialize`

El frontend puede recibir una URL con `/initialize`, pero internamente la normaliza al `POST` operativo.

### 3. Guardar al menos estos campos

#### Leads

- `Nombre`
- `Empresa`
- `Email`
- `Telefono`
- `PaisTelefono`
- `Desafio`
- `Consentimiento`
- `Timestamp`
- `Origen`

#### Evento

- `Nombres`
- `firstName`
- `lastName`
- `Email`
- `Cargo`
- `Empresa`
- `Telefono`
- `PaisTelefono`
- `Consentimiento`
- `Timestamp`
- `eventSlug`
- `Origen`

#### Diagnostico

- todos los campos de lead
- `role`
- `diagnosis.levelNumber`
- `diagnosis.levelName`
- `diagnosis.noCount`
- `diagnosis.yesCount`
- `diagnosis.totalQuestions`
- `diagnosis.answers`

---

## Troubleshooting

### Error: falta configuracion

Mensaje esperado:

```text
Configura VITE_HOME_CONTACT_WEBHOOK_URL antes de publicar este formulario.
```

o equivalente para `VITE_EVENTS_WEBHOOK_URL` / `VITE_WEBHOOK_URL`.

### Error Bubble con body.message

El frontend ya intenta leer:

- `error`
- `message`
- `body.message`

desde la respuesta.

### El usuario llega a /gracias sin datos

Revisar:

- que el submit haya sido exitoso
- que [src/utils/formSubmission.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\formSubmission.ts) se ejecute antes del `navigate('/gracias')`

---

## Referencias de codigo

- [src/components/sections/Contact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\Contact.tsx)
- [src/components/sections/CasesContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\CasesContact.tsx)
- [src/components/sections/DealsContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\DealsContact.tsx)
- [src/components/sections/ExpedienteContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\ExpedienteContact.tsx)
- [src/pages/eventos/EventPage.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\eventos\EventPage.tsx)
- [src/pages/DiagnosticoLegalOpsPageGateStart.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\DiagnosticoLegalOpsPageGateStart.tsx)
- [src/utils/eventoCierreBubble.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\eventoCierreBubble.ts)
- [src/utils/leadCapture.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\leadCapture.ts)
- [src/hooks/useLeadCaptureForm.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\hooks\useLeadCaptureForm.ts)
- [src/utils/bubbleWorkflowRequest.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\bubbleWorkflowRequest.ts)
- [src/utils/formSubmission.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\formSubmission.ts)

---

Ultima actualizacion: 2026-04-21
