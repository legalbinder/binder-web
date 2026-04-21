# Brief tecnico: AWS Lambda / API Gateway para formularios Binder

## Estado actual del frontend

Hoy el frontend ya soporta integracion directa con Bubble y no depende de AWS para funcionar.
Este documento queda como referencia si se quiere introducir una capa intermedia con API Gateway + Lambda.

Importante:

- ya no existe un solo `VITE_WEBHOOK_URL` para todo el sitio
- el frontend maneja tres contratos de webhook
- cualquier proxy AWS debe preservar esos contratos o consolidarlos explicitamente

Variables actuales:

```env
VITE_HOME_CONTACT_WEBHOOK_URL
VITE_EVENTS_WEBHOOK_URL
VITE_WEBHOOK_URL
```

---

## Objetivo de una capa AWS

AWS tendria sentido si se necesita:

- logging centralizado
- rate limiting mas estricto
- autenticacion o firma de requests
- fan-out a varios destinos
- normalizacion de contratos antes de Bubble
- retries o colas

Si no se necesita nada de eso, la integracion directa actual con Bubble es suficiente.

---

## Arquitectura recomendada si se implementa AWS

```text
[Frontend React]
  -> POST JSON
[API Gateway]
  -> Lambda proxy
[Lambda router]
  -> Bubble workflow correspondiente
  -> CloudWatch Logs
```

La Lambda debe enrutar segun el tipo de formulario, no asumir un solo payload.

---

## Contratos que AWS debe aceptar

### 1. Home contact

Fuente:

- [src/components/sections/Contact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\Contact.tsx)

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

### 2. Cases / deals / expediente / diagnostico

Fuentes:

- [src/components/sections/CasesContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\CasesContact.tsx)
- [src/components/sections/DealsContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\DealsContact.tsx)
- [src/components/sections/ExpedienteContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\ExpedienteContact.tsx)
- [src/pages/DiagnosticoLegalOpsPageGateStart.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\DiagnosticoLegalOpsPageGateStart.tsx)

Notas:

- `source` cambia por formulario
- diagnostico agrega `role` y `diagnosis`

### 3. Eventos

Fuente:

- [src/pages/eventos/EventPage.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\eventos\EventPage.tsx)

Payload:

```json
{
  "Nombres": "Juan Perez",
  "firstName": "Juan",
  "lastName": "Perez",
  "email": "juan@empresa.com",
  "jobTitle": "GC",
  "company": "Empresa XYZ",
  "phone": "+51 999999999",
  "phoneCountry": "PE",
  "consent": true,
  "timestamp": "2026-04-21T15:00:00.000Z",
  "source": "event-registration",
  "eventSlug": "webinar-legalops-binder-niubox"
}
```

---

## Recomendacion de diseno para Lambda

### Opcion A: 3 endpoints separados

```text
POST /webhook/home-contact
POST /webhook/event-registration
POST /webhook/general-lead
```

Ventajas:

- contratos claros
- menos branching interno
- trazabilidad simple

### Opcion B: 1 endpoint + router por payload/source

```text
POST /webhook
```

La Lambda debe inspeccionar:

- `source`
- presencia de `firstName` / `lastName`
- presencia de `diagnosis`

Ventaja:

- una sola URL en infraestructura

Desventaja:

- mas logica en Lambda
- mas riesgo de clasificacion incorrecta si se cambia el frontend

Para este proyecto recomiendo la opcion A.

---

## Requisitos de la Lambda

### Validaciones minimas

- metodo `POST`
- `Content-Type: application/json`
- campos requeridos segun contrato
- `consent === true`
- email valido donde aplique

### Respuesta recomendada

```json
{
  "success": true,
  "requestId": "uuid-or-aws-request-id"
}
```

### Logging

Registrar:

- contrato detectado
- origen (`source`)
- status del request a Bubble
- body resumido sin exponer informacion sensible completa

No registrar payloads completos de forma indiscriminada en produccion.

---

## Configuracion de Bubble detras de AWS

La Lambda debe enviar a Bubble el payload sin cambiar semantica salvo que exista una normalizacion acordada.

Si Bubble exige `/initialize`, puede recibirse asi en configuracion, pero el codigo actual del frontend ya normaliza URLs. Si AWS toma el control, esa normalizacion debe quedar en Lambda o en IaC.

---

## Variables de entorno sugeridas para Lambda

```env
BUBBLE_HOME_CONTACT_WEBHOOK_URL=
BUBBLE_EVENTS_WEBHOOK_URL=
BUBBLE_GENERAL_LEAD_WEBHOOK_URL=
```

Opcionales:

```env
BUBBLE_API_KEY=
ALLOWED_ORIGINS=https://binder.la
```

No usar una sola `BUBBLE_WEBHOOK_URL` para todo si se quieren preservar contratos distintos.

---

## Relacion con el frontend

Si se migra a AWS, el frontend puede:

- seguir usando tres variables Vite, pero apuntando a AWS
- o colapsar a tres rutas del mismo API Gateway

Ejemplo:

```env
VITE_HOME_CONTACT_WEBHOOK_URL=https://api.example.com/webhook/home-contact
VITE_EVENTS_WEBHOOK_URL=https://api.example.com/webhook/event-registration
VITE_WEBHOOK_URL=https://api.example.com/webhook/general-lead
```

Eso evita tocar de nuevo la logica del frontend.

---

## Seguridad y operacion

Recomendado:

- CORS restringido a dominios Binder
- rate limiting en API Gateway
- CloudWatch Alarms por 4xx/5xx
- timeout razonable
- retries controlados si Bubble falla

No recomendado:

- loggear emails y telefonos completos en todas las ramas
- mezclar contratos de evento y lead sin routing claro

---

## Checklist si se decide implementar AWS

- [ ] definir si habra 1 endpoint o 3
- [ ] mapear cada contrato del frontend a un destino Bubble
- [ ] configurar variables de entorno separadas
- [ ] validar `source` y estructura de payload
- [ ] configurar CORS
- [ ] configurar alarmas y logs
- [ ] probar home, casos, diagnostico y eventos por separado
- [ ] actualizar `.env` del frontend para apuntar a AWS

---

## Referencias de codigo

- [src/utils/eventoCierreBubble.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\eventoCierreBubble.ts)
- [src/utils/bubbleWorkflowRequest.ts](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\utils\bubbleWorkflowRequest.ts)
- [src/components/sections/Contact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\Contact.tsx)
- [src/components/sections/CasesContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\CasesContact.tsx)
- [src/components/sections/DealsContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\DealsContact.tsx)
- [src/components/sections/ExpedienteContact.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\components\sections\ExpedienteContact.tsx)
- [src/pages/DiagnosticoLegalOpsPageGateStart.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\DiagnosticoLegalOpsPageGateStart.tsx)
- [src/pages/eventos/EventPage.tsx](F:\Desktop\Jobs\CodexApp\Binder\Binder-web\src\pages\eventos\EventPage.tsx)

---

Ultima actualizacion: 2026-04-21
