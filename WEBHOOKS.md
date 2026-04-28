# Webhooks

Los links de Bubble se configuran en Vercel como variables de entorno. No deben hardcodearse en el codigo.

El frontend acepta URLs de Bubble con o sin `/initialize`; antes de hacer `POST`, normaliza la URL desde `src/utils/bubbleWorkflowUrl.ts`.

## Variables

```env
VITE_BUBBLE_HOME_CONTACT_WEBHOOK_URL=
VITE_BUBBLE_EVENT_REGISTRATION_WEBHOOK_URL=
VITE_BUBBLE_USE_CASES_AND_DIAGNOSIS_WEBHOOK_URL=
VITE_BUBBLE_COMPLAINT_BOOK_WEBHOOK_URL=
```

## 1. Home contact

Variable:

```env
VITE_BUBBLE_HOME_CONTACT_WEBHOOK_URL=
```

Usado por:

- `/`
- `src/components/sections/Contact.tsx`

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

Notas:

- `phone` y `telefono` pueden ser `null` si el usuario no ingresa telefono.
- `challenge` usa `"-"` si el formulario home no recibe una opcion valida.

## 2. Casos de uso y diagnostico

Variable:

```env
VITE_BUBBLE_USE_CASES_AND_DIAGNOSIS_WEBHOOK_URL=
```

Usado por:

- `/casos-uso/gestion-procesos`
- `/casos-uso/clm`
- `/casos-uso/expediente-digital`
- `/diagnostico-legal-ops-formulario-inicio`
- `src/components/sections/CasesContact.tsx`
- `src/components/sections/DealsContact.tsx`
- `src/components/sections/ExpedienteContact.tsx`
- `src/pages/DiagnosticoLegalOpsPageGateStart.tsx`

Payload para formularios de casos de uso:

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

Valores posibles de `source` para casos de uso:

```json
[
  "cases-contact-form",
  "deals-contact-form",
  "expediente-contact-form"
]
```

Payload para diagnostico Legal Ops:

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
        "question": "¿Tus contratos están centralizados en un repositorio único?",
        "answer": "No"
      }
    ]
  }
}
```

## 3. Registro de eventos

Variable:

```env
VITE_BUBBLE_EVENT_REGISTRATION_WEBHOOK_URL=
```

Usado por:

- `/eventos/:slug`
- `src/pages/eventos/EventPage.tsx`

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

Notas:

- `phone` puede ser string vacio si el usuario no ingresa telefono.
- `eventSlug` sale del contenido definido en `src/content/eventos.ts`.

## 4. Libro de reclamaciones

Variable:

```env
VITE_BUBBLE_COMPLAINT_BOOK_WEBHOOK_URL=
```

Usado por:

- `/legal/reclamaciones`
- `src/pages/legal/ReclamacionesPage.tsx`

Payload:

```json
{
  "documentType": "DNI",
  "documentNumber": "12345678",
  "firstName": "Juan",
  "lastName": "Perez",
  "phone": "987 654 321",
  "email": "juan@empresa.com",
  "addressDepartment": "Lima",
  "province": "Lima",
  "district": "Miraflores",
  "address": "Av. Ejemplo 123",
  "claimDepartment": "Lima",
  "productType": "Servicio",
  "reason": "Reclamo",
  "detail": "Detalle del reclamo o queja",
  "request": "Pedido o solucion esperada",
  "acceptsConditions": true,
  "fullName": "Juan Perez",
  "source": "libro-reclamaciones",
  "timestamp": "2026-04-21T15:00:00.000Z"
}
```

Valores posibles:

```json
{
  "documentType": ["DNI", "Pasaporte", "RUC", "Carnet de extranjería"],
  "productType": ["Producto", "Servicio"],
  "reason": ["Reclamo", "Queja"]
}
```

## Errores esperados

Si falta una variable, el frontend muestra un error explicito con el nombre de la variable faltante:

```text
Configura VITE_BUBBLE_HOME_CONTACT_WEBHOOK_URL antes de publicar este formulario.
```

El mismo formato aplica para las otras variables `VITE_BUBBLE_*_WEBHOOK_URL`.
