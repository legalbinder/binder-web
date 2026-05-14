# Webhook de Bubble

La web de Binder usa un solo webhook de Bubble para todos los formularios.

No se necesita API Connector de Bubble. La web envia los datos directamente al Backend Workflow de Bubble.

## Link que debe ir en Vercel

Configurar esta variable de entorno en Vercel:

```env
VITE_BUBBLE_WEBHOOK_URL=https://binder0.bubbleapps.io/api/1.1/wf/binderla-formulario/
```

Este es el link que usa la web para enviar datos en produccion:

```text
https://binder0.bubbleapps.io/api/1.1/wf/binderla-formulario/
```

El link de inicializacion de Bubble es este:

```text
https://binder0.bubbleapps.io/version-test/api/1.1/wf/binderla-formulario/initialize
```

La URL puede venir con o sin `/initialize`. Si por error se configura una URL terminada en `/initialize`, la web la ajusta antes de enviar datos.

## Para que formularios sirve

El mismo webhook recibe datos de:

| Formulario | Como identificarlo en Bubble |
| --- | --- |
| Contacto del home | `source: "contact-form"` |
| Caso de uso Gestion de Procesos | `source: "cases-contact-form"` |
| Caso de uso CLM | `source: "deals-contact-form"` |
| Caso de uso Expediente Digital | `source: "expediente-contact-form"` |
| Diagnostico Legal Ops | `source: "legal-ops-diagnosis"` |
| Registro de eventos | `source: "event-registration"` |
| Libro de reclamaciones | `source: "libro-reclamaciones"` |

Bubble puede usar el campo `source` para saber que tipo de formulario llego y guardar la informacion donde corresponda.

## Payload para inicializar en Bubble

Para inicializar el workflow en Bubble, enviar este JSON al endpoint `/initialize`.

La idea es que Bubble detecte todas las claves y sus tipos de dato antes de recibir datos reales. No se envian textos como `"tipo": "string"`; Bubble detecta el tipo segun el valor de ejemplo enviado.

```json
{
  "source": "contact-form",
  "name": "Juan Perez",
  "company": "Empresa XYZ",
  "email": "juan@empresa.com",
  "phone": "+51 999999999",
  "telefono": "+51 999999999",
  "phoneCountry": "PE",
  "challenge": "Gestion documental desordenada",
  "consent": true,
  "timestamp": "2026-05-13T15:00:00.000Z",
  "Nombres": "Juan Perez",
  "firstName": "Juan",
  "lastName": "Perez",
  "jobTitle": "Legal Counsel",
  "eventSlug": "webinar-legalops-binder-niubox",
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
  },
  "documentType": "DNI",
  "documentNumber": "12345678",
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
  "fullName": "Juan Perez"
}
```

Tipos que debe detectar Bubble con ese JSON:

| Campo | Tipo esperado |
| --- | --- |
| `source` | texto |
| `name` | texto |
| `company` | texto |
| `email` | texto |
| `phone` | texto |
| `telefono` | texto |
| `phoneCountry` | texto |
| `challenge` | texto |
| `consent` | si/no |
| `timestamp` | texto con fecha ISO |
| `Nombres` | texto |
| `firstName` | texto |
| `lastName` | texto |
| `jobTitle` | texto |
| `eventSlug` | texto |
| `role` | texto |
| `diagnosis` | objeto |
| `diagnosis.levelNumber` | numero |
| `diagnosis.levelName` | texto |
| `diagnosis.noCount` | numero |
| `diagnosis.yesCount` | numero |
| `diagnosis.totalQuestions` | numero |
| `diagnosis.answers` | lista de objetos |
| `diagnosis.answers[].question` | texto |
| `diagnosis.answers[].answer` | texto |
| `documentType` | texto |
| `documentNumber` | texto |
| `addressDepartment` | texto |
| `province` | texto |
| `district` | texto |
| `address` | texto |
| `claimDepartment` | texto |
| `productType` | texto |
| `reason` | texto |
| `detail` | texto |
| `request` | texto |
| `acceptsConditions` | si/no |
| `fullName` | texto |

## Datos que puede recibir cada formulario

### 1. Contacto del home

```json
{
  "source": "contact-form",
  "name": "Juan Perez",
  "company": "Empresa XYZ",
  "email": "juan@empresa.com",
  "phone": "+51 999999999",
  "telefono": "+51 999999999",
  "phoneCountry": "PE",
  "challenge": "Gestion documental desordenada",
  "consent": true,
  "timestamp": "2026-05-13T15:00:00.000Z"
}
```

### 2. Casos de uso

```json
{
  "source": "cases-contact-form",
  "name": "Juan Perez",
  "company": "Empresa XYZ",
  "email": "juan@empresa.com",
  "phone": "+51 999999999",
  "telefono": "+51 999999999",
  "phoneCountry": "PE",
  "challenge": null,
  "consent": true,
  "timestamp": "2026-05-13T15:00:00.000Z"
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

### 3. Diagnostico Legal Ops

```json
{
  "source": "legal-ops-diagnosis",
  "name": "Juan Perez",
  "company": "Empresa XYZ",
  "email": "juan@empresa.com",
  "phone": null,
  "phoneCountry": null,
  "challenge": "Diagnostico Legal Ops - Nivel 2 (Estructurado)",
  "consent": true,
  "timestamp": "2026-05-13T15:00:00.000Z",
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

### 4. Registro de eventos

```json
{
  "source": "event-registration",
  "Nombres": "Juan Perez",
  "firstName": "Juan",
  "lastName": "Perez",
  "email": "juan@empresa.com",
  "jobTitle": "Legal Counsel",
  "company": "Empresa XYZ",
  "phone": "+51 999999999",
  "phoneCountry": "PE",
  "consent": true,
  "timestamp": "2026-05-13T15:00:00.000Z",
  "eventSlug": "webinar-legalops-binder-niubox"
}
```

### 5. Libro de reclamaciones

```json
{
  "source": "libro-reclamaciones",
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
  "timestamp": "2026-05-13T15:00:00.000Z"
}
```

## Valores posibles

Estos campos llegan con opciones cerradas:

```json
{
  "documentType": ["DNI", "Pasaporte", "RUC", "Carnet de extranjería"],
  "productType": ["Producto", "Servicio"],
  "reason": ["Reclamo", "Queja"]
}
```

## Como se prueba

1. Inicializar el workflow en Bubble con el JSON completo de arriba.
2. Configurar `VITE_BUBBLE_WEBHOOK_URL` en Vercel.
3. Hacer redeploy.
4. Probar cada formulario.
5. Validar en Bubble que llegue el registro y que `source` permita identificar el origen.

## Error si falta el link en Vercel

Si falta la variable en Vercel, el formulario mostrara este error:

```text
Configura VITE_BUBBLE_WEBHOOK_URL antes de publicar este formulario.
```
