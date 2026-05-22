# Webhook de Bubble

La web de Binder usa un solo webhook de Bubble para todos los formularios.

No se necesita API Connector de Bubble. La web envia los datos directamente al Backend Workflow de Bubble.

## Link que debe ir en Vercel

Configurar esta variable de entorno en Vercel:

```env
VITE_BUBBLE_WEBHOOK_URL=https://binder0.bubbleapps.io/api/1.1/wf/binderla-formulario/
```

Este es el link que usa la web para enviar datos reales:

```text
https://binder0.bubbleapps.io/api/1.1/wf/binderla-formulario/
```

## Webhook secundario opcional

Para pruebas se puede configurar una segunda variable de entorno:

```env
VITE_WEBHOOK_URL=
```

Si `VITE_WEBHOOK_URL` tiene un valor, la web envia una copia del mismo payload a ese segundo webhook despues del envio principal.

Reglas:

- Si `VITE_WEBHOOK_URL` esta vacia, no se envia nada al segundo webhook.
- Si `VITE_WEBHOOK_URL` falla, esta apagada o responde con error, se ignora y no bloquea el formulario.
- El webhook secundario se envia como `text/plain` y `no-cors` para evitar el preflight `OPTIONS` en herramientas como webhook.site.
- `VITE_BUBBLE_WEBHOOK_URL` sigue siendo el webhook principal y obligatorio.
- Como es una variable `VITE_`, cualquier cambio en Vercel requiere redeploy.

## Link para inicializar Bubble

El link de inicializacion se usa solo para que Bubble detecte los campos y tipos:

```text
https://binder0.bubbleapps.io/version-test/api/1.1/wf/binderla-formulario/initialize
```

Mientras Bubble muestra "Detecting Request Data", enviar al endpoint `/initialize` el JSON completo de la seccion siguiente.

## Payload completo para inicializar

Este payload inicializa un contrato generico y reutilizable. La web usa las mismas claves para todos los formularios y el significado se define por `origen` en el indice de este documento.

```json
{
  "origen": "formulario-contacto",
  "fechaEnvio": "2026-05-20T15:00:00.000Z",
  "textoExtra01": "Texto de ejemplo 01",
  "textoExtra02": "Texto de ejemplo 02",
  "textoExtra03": "Texto de ejemplo 03",
  "textoExtra04": "Texto de ejemplo 04",
  "textoExtra05": "Texto de ejemplo 05",
  "textoExtra06": "Texto de ejemplo 06",
  "textoExtra07": "Texto de ejemplo 07",
  "textoExtra08": "Texto de ejemplo 08",
  "textoExtra09": "Texto de ejemplo 09",
  "textoExtra10": "Texto de ejemplo 10",
  "textoExtra11": "Texto de ejemplo 11",
  "textoExtra12": "Texto de ejemplo 12",
  "textoExtra13": "Texto de ejemplo 13",
  "textoExtra14": "Texto de ejemplo 14",
  "textoExtra15": "Texto de ejemplo 15",
  "textoExtra16": "Texto de ejemplo 16",
  "textoExtra17": "Texto de ejemplo 17",
  "textoExtra18": "Texto de ejemplo 18",
  "textoExtra19": "Texto de ejemplo 19",
  "textoExtra20": "Texto de ejemplo 20",
  "textoExtra21": "Texto de ejemplo 21",
  "textoExtra22": "Texto de ejemplo 22",
  "textoExtra23": "Texto de ejemplo 23",
  "textoExtra24": "Texto de ejemplo 24",
  "textoExtra25": "Texto de ejemplo 25",
  "textoExtra26": "Texto de ejemplo 26",
  "textoExtra27": "Texto de ejemplo 27",
  "textoExtra28": "Texto de ejemplo 28",
  "textoExtra29": "Texto de ejemplo 29",
  "textoExtra30": "Texto de ejemplo 30",
  "numeroExtra01": 1,
  "numeroExtra02": 2,
  "numeroExtra03": 3,
  "numeroExtra04": 4,
  "numeroExtra05": 5,
  "numeroExtra06": 6,
  "numeroExtra07": 7,
  "numeroExtra08": 8,
  "numeroExtra09": 9,
  "numeroExtra10": 10,
  "numeroExtra11": 11,
  "numeroExtra12": 12,
  "numeroExtra13": 13,
  "numeroExtra14": 14,
  "numeroExtra15": 15,
  "booleanoExtra01": true,
  "booleanoExtra02": false,
  "booleanoExtra03": true,
  "booleanoExtra04": false,
  "booleanoExtra05": true,
  "booleanoExtra06": false,
  "booleanoExtra07": true,
  "booleanoExtra08": false,
  "booleanoExtra09": true,
  "booleanoExtra10": false,
  "booleanoExtra11": true,
  "booleanoExtra12": false,
  "booleanoExtra13": true,
  "booleanoExtra14": false,
  "booleanoExtra15": true,
  "fechaExtra01": "2026-05-20T15:00:00.000Z",
  "fechaExtra02": "2026-05-21T15:00:00.000Z",
  "fechaExtra03": "2026-05-22T15:00:00.000Z",
  "fechaExtra04": "2026-05-23T15:00:00.000Z",
  "fechaExtra05": "2026-05-24T15:00:00.000Z",
  "fechaExtra06": "2026-05-25T15:00:00.000Z",
  "fechaExtra07": "2026-05-26T15:00:00.000Z",
  "fechaExtra08": "2026-05-27T15:00:00.000Z",
  "fechaExtra09": "2026-05-28T15:00:00.000Z",
  "fechaExtra10": "2026-05-29T15:00:00.000Z",
  "fechaExtra11": "2026-05-30T15:00:00.000Z",
  "fechaExtra12": "2026-05-31T15:00:00.000Z",
  "fechaExtra13": "2026-06-01T15:00:00.000Z",
  "fechaExtra14": "2026-06-02T15:00:00.000Z",
  "fechaExtra15": "2026-06-03T15:00:00.000Z",
  "listaTextoExtra01": ["Valor 1", "Valor 2"],
  "listaTextoExtra02": ["Valor 1", "Valor 2"],
  "listaTextoExtra03": ["Valor 1", "Valor 2"],
  "listaTextoExtra04": ["Valor 1", "Valor 2"],
  "listaTextoExtra05": ["Valor 1", "Valor 2"],
  "listaTextoExtra06": ["Valor 1", "Valor 2"],
  "listaTextoExtra07": ["Valor 1", "Valor 2"],
  "listaTextoExtra08": ["Valor 1", "Valor 2"],
  "listaTextoExtra09": ["Valor 1", "Valor 2"],
  "listaTextoExtra10": ["Valor 1", "Valor 2"],
  "objetoExtra01": {
    "tipo": "bloque",
    "clave": "objetoExtra01",
    "titulo": "Objeto de ejemplo 01",
    "valorTexto": "Texto",
    "valorNumero": 1,
    "valorBooleano": true,
    "valorFecha": "2026-05-20T15:00:00.000Z",
    "listaTexto": ["Valor 1", "Valor 2"]
  },
  "objetoExtra02": {
    "tipo": "bloque",
    "clave": "objetoExtra02",
    "titulo": "Objeto de ejemplo 02",
    "valorTexto": "Texto",
    "valorNumero": 2,
    "valorBooleano": false,
    "valorFecha": "2026-05-21T15:00:00.000Z",
    "listaTexto": ["Valor 1", "Valor 2"]
  },
  "objetoExtra03": {
    "tipo": "bloque",
    "clave": "objetoExtra03",
    "titulo": "Objeto de ejemplo 03",
    "valorTexto": "Texto",
    "valorNumero": 3,
    "valorBooleano": true,
    "valorFecha": "2026-05-22T15:00:00.000Z",
    "listaTexto": ["Valor 1", "Valor 2"]
  },
  "objetoExtra04": {
    "tipo": "bloque",
    "clave": "objetoExtra04",
    "titulo": "Objeto de ejemplo 04",
    "valorTexto": "Texto",
    "valorNumero": 4,
    "valorBooleano": false,
    "valorFecha": "2026-05-23T15:00:00.000Z",
    "listaTexto": ["Valor 1", "Valor 2"]
  },
  "objetoExtra05": {
    "tipo": "bloque",
    "clave": "objetoExtra05",
    "titulo": "Objeto de ejemplo 05",
    "valorTexto": "Texto",
    "valorNumero": 5,
    "valorBooleano": true,
    "valorFecha": "2026-05-24T15:00:00.000Z",
    "listaTexto": ["Valor 1", "Valor 2"]
  },
  "objetoExtra06": {
    "tipo": "bloque",
    "clave": "objetoExtra06",
    "titulo": "Objeto de ejemplo 06",
    "valorTexto": "Texto",
    "valorNumero": 6,
    "valorBooleano": false,
    "valorFecha": "2026-05-25T15:00:00.000Z",
    "listaTexto": ["Valor 1", "Valor 2"]
  },
  "objetoExtra07": {
    "tipo": "bloque",
    "clave": "objetoExtra07",
    "titulo": "Objeto de ejemplo 07",
    "valorTexto": "Texto",
    "valorNumero": 7,
    "valorBooleano": true,
    "valorFecha": "2026-05-26T15:00:00.000Z",
    "listaTexto": ["Valor 1", "Valor 2"]
  },
  "objetoExtra08": {
    "tipo": "bloque",
    "clave": "objetoExtra08",
    "titulo": "Objeto de ejemplo 08",
    "valorTexto": "Texto",
    "valorNumero": 8,
    "valorBooleano": false,
    "valorFecha": "2026-05-27T15:00:00.000Z",
    "listaTexto": ["Valor 1", "Valor 2"]
  },
  "objetoExtra09": {
    "tipo": "bloque",
    "clave": "objetoExtra09",
    "titulo": "Objeto de ejemplo 09",
    "valorTexto": "Texto",
    "valorNumero": 9,
    "valorBooleano": true,
    "valorFecha": "2026-05-28T15:00:00.000Z",
    "listaTexto": ["Valor 1", "Valor 2"]
  },
  "objetoExtra10": {
    "tipo": "bloque",
    "clave": "objetoExtra10",
    "titulo": "Objeto de ejemplo 10",
    "valorTexto": "Texto",
    "valorNumero": 10,
    "valorBooleano": false,
    "valorFecha": "2026-05-29T15:00:00.000Z",
    "listaTexto": ["Valor 1", "Valor 2"]
  },
  "listaObjetoExtra01": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta01",
      "pregunta": "¿Tienes contratos centralizados?",
      "respuestaTexto": "No",
      "respuestaNumero": 0,
      "respuestaBooleano": false,
      "respuestaFecha": "2026-05-20T15:00:00.000Z",
      "categoria": "contratos"
    }
  ],
  "listaObjetoExtra02": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta02",
      "pregunta": "¿Tienes alertas automatizadas?",
      "respuestaTexto": "Sí",
      "respuestaNumero": 1,
      "respuestaBooleano": true,
      "respuestaFecha": "2026-05-21T15:00:00.000Z",
      "categoria": "automatizacion"
    }
  ],
  "listaObjetoExtra03": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta03",
      "pregunta": "Pregunta de ejemplo 03",
      "respuestaTexto": "Respuesta",
      "respuestaNumero": 3,
      "respuestaBooleano": true,
      "respuestaFecha": "2026-05-22T15:00:00.000Z",
      "categoria": "general"
    }
  ],
  "listaObjetoExtra04": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta04",
      "pregunta": "Pregunta de ejemplo 04",
      "respuestaTexto": "Respuesta",
      "respuestaNumero": 4,
      "respuestaBooleano": false,
      "respuestaFecha": "2026-05-23T15:00:00.000Z",
      "categoria": "general"
    }
  ],
  "listaObjetoExtra05": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta05",
      "pregunta": "Pregunta de ejemplo 05",
      "respuestaTexto": "Respuesta",
      "respuestaNumero": 5,
      "respuestaBooleano": true,
      "respuestaFecha": "2026-05-24T15:00:00.000Z",
      "categoria": "general"
    }
  ],
  "listaObjetoExtra06": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta06",
      "pregunta": "Pregunta de ejemplo 06",
      "respuestaTexto": "Respuesta",
      "respuestaNumero": 6,
      "respuestaBooleano": false,
      "respuestaFecha": "2026-05-25T15:00:00.000Z",
      "categoria": "general"
    }
  ],
  "listaObjetoExtra07": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta07",
      "pregunta": "Pregunta de ejemplo 07",
      "respuestaTexto": "Respuesta",
      "respuestaNumero": 7,
      "respuestaBooleano": true,
      "respuestaFecha": "2026-05-26T15:00:00.000Z",
      "categoria": "general"
    }
  ],
  "listaObjetoExtra08": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta08",
      "pregunta": "Pregunta de ejemplo 08",
      "respuestaTexto": "Respuesta",
      "respuestaNumero": 8,
      "respuestaBooleano": false,
      "respuestaFecha": "2026-05-27T15:00:00.000Z",
      "categoria": "general"
    }
  ],
  "listaObjetoExtra09": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta09",
      "pregunta": "Pregunta de ejemplo 09",
      "respuestaTexto": "Respuesta",
      "respuestaNumero": 9,
      "respuestaBooleano": true,
      "respuestaFecha": "2026-05-28T15:00:00.000Z",
      "categoria": "general"
    }
  ],
  "listaObjetoExtra10": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta10",
      "pregunta": "Pregunta de ejemplo 10",
      "respuestaTexto": "Respuesta",
      "respuestaNumero": 10,
      "respuestaBooleano": false,
      "respuestaFecha": "2026-05-29T15:00:00.000Z",
      "categoria": "general"
    }
  ]
}
```

## Tipos esperados

| Campo | Tipo esperado |
| --- | --- |
| `origen` | texto |
| `fechaEnvio` | texto con fecha ISO |
| `textoExtra01` - `textoExtra30` | texto |
| `numeroExtra01` - `numeroExtra15` | numero |
| `booleanoExtra01` - `booleanoExtra15` | si/no |
| `fechaExtra01` - `fechaExtra15` | fecha o texto ISO |
| `listaTextoExtra01` - `listaTextoExtra10` | lista de textos |
| `objetoExtra01` - `objetoExtra10` | objeto |
| `objetoExtraXX.tipo` | texto |
| `objetoExtraXX.clave` | texto |
| `objetoExtraXX.titulo` | texto |
| `objetoExtraXX.valorTexto` | texto |
| `objetoExtraXX.valorNumero` | numero |
| `objetoExtraXX.valorBooleano` | si/no |
| `objetoExtraXX.valorFecha` | fecha o texto ISO |
| `objetoExtraXX.listaTexto` | lista de textos |
| `listaObjetoExtra01` - `listaObjetoExtra10` | lista de objetos |
| `listaObjetoExtraXX[].tipo` | texto |
| `listaObjetoExtraXX[].clave` | texto |
| `listaObjetoExtraXX[].pregunta` | texto |
| `listaObjetoExtraXX[].respuestaTexto` | texto |
| `listaObjetoExtraXX[].respuestaNumero` | numero |
| `listaObjetoExtraXX[].respuestaBooleano` | si/no |
| `listaObjetoExtraXX[].respuestaFecha` | fecha o texto ISO |
| `listaObjetoExtraXX[].categoria` | texto |

## Formularios activos

Hay 7 formularios funcionales en la web. El diagnostico envia 2 llamados al webhook: uno al completar los datos iniciales y otro al finalizar el cuestionario.

| Formulario | Ruta | Valor de `origen` |
| --- | --- | --- |
| Contacto del home | `/` seccion `#contacto` | `formulario-contacto` |
| Caso de uso Gestion de Procesos | `/casos-uso/gestion-procesos` | `formulario-caso-procesos` |
| Caso de uso CLM | `/casos-uso/clm` | `formulario-caso-clm` |
| Caso de uso Expediente Digital | `/casos-uso/expediente-digital` | `formulario-caso-expediente` |
| Diagnostico Legal Ops - inicio | `/diagnostico-legal-ops-formulario-inicio` | `Diagnóstico-inicio` |
| Diagnostico Legal Ops - resultado final | `/diagnostico-legal-ops-formulario-inicio` | `diagnostico-legal-ops` |
| Registro de evento | `/eventos/:slug` | `registro-evento` |
| Libro de reclamaciones | `/legal/reclamaciones` | `libro-reclamaciones` |

## Indice de claves comunes

Estas claves mantienen el mismo significado cuando aplican al formulario:

| Clave | Significado |
| --- | --- |
| `origen` | Identificador del formulario, por ejemplo `formulario-contacto` |
| `fechaEnvio` | Fecha/hora del envio en formato ISO, por ejemplo `2026-05-20T15:00:00.000Z` |
| `textoExtra01` | Nombre completo |
| `textoExtra02` | Nombres |
| `textoExtra03` | Apellidos |
| `textoExtra04` | Correo |
| `textoExtra05` | Telefono |
| `textoExtra06` | Pais del telefono |
| `textoExtra07` | Empresa |
| `textoExtra08` | Cargo |
| `textoExtra09` | Rol |
| `textoExtra10` | Reto, necesidad o resultado resumido |
| `textoExtra11` | Pagina o ruta desde donde se envio |
| `textoExtra12` | Evento o slug del evento |
| `textoExtra24` | Texto completo del consentimiento, cuando aplique |
| `booleanoExtra01` | Consentimiento aceptado |
| `booleanoExtra02` | Condiciones aceptadas |
| `fechaExtra01` | Fecha de envio |

## Indice por origen

### `formulario-contacto`

| Clave | Significado |
| --- | --- |
| `origen` | Valor fijo: `formulario-contacto` |
| `fechaEnvio` | Fecha/hora del envio en formato ISO |
| `textoExtra01` | Nombre completo |
| `textoExtra04` | Correo |
| `textoExtra05` | Telefono |
| `textoExtra06` | Pais del telefono |
| `textoExtra07` | Empresa |
| `textoExtra10` | Reto o necesidad seleccionada |
| `textoExtra11` | Pagina de origen |
| `booleanoExtra01` | Consentimiento aceptado |
| `fechaExtra01` | Fecha de envio |

### `formulario-caso-procesos`, `formulario-caso-clm`, `formulario-caso-expediente`

| Clave | Significado |
| --- | --- |
| `origen` | Valor fijo segun el caso: `formulario-caso-procesos`, `formulario-caso-clm` o `formulario-caso-expediente` |
| `fechaEnvio` | Fecha/hora del envio en formato ISO |
| `textoExtra01` | Nombre completo |
| `textoExtra04` | Correo |
| `textoExtra05` | Telefono |
| `textoExtra06` | Pais del telefono |
| `textoExtra07` | Empresa |
| `textoExtra10` | Reto o necesidad, si existe |
| `textoExtra11` | Pagina de origen |
| `booleanoExtra01` | Consentimiento aceptado |
| `fechaExtra01` | Fecha de envio |

### `Diagnóstico-inicio`

Este llamado se envia cuando la persona completa la primera pantalla del diagnostico y presiona "Empezar diagnostico". Sirve para capturar el lead aunque no termine el cuestionario.

| Clave | Significado |
| --- | --- |
| `origen` | Valor fijo: `Diagnóstico-inicio` |
| `fechaEnvio` | Fecha/hora del envio en formato ISO |
| `textoExtra01` | Nombre completo |
| `textoExtra04` | Correo |
| `textoExtra07` | Empresa |
| `textoExtra09` | Rol |
| `textoExtra11` | Pagina de origen |
| `textoExtra24` | Texto completo del consentimiento |
| `booleanoExtra01` | Consentimiento aceptado |
| `fechaExtra01` | Fecha de envio |

### `diagnostico-legal-ops`

Este llamado se envia al finalizar el cuestionario del diagnostico, junto con el nivel obtenido y las respuestas.

| Clave | Significado |
| --- | --- |
| `origen` | Valor fijo: `diagnostico-legal-ops` |
| `fechaEnvio` | Fecha/hora del envio en formato ISO |
| `textoExtra01` | Nombre completo |
| `textoExtra04` | Correo |
| `textoExtra07` | Empresa |
| `textoExtra09` | Rol |
| `textoExtra10` | Resultado resumido del diagnostico |
| `textoExtra11` | Pagina de origen |
| `textoExtra13` | Nombre del nivel de madurez |
| `textoExtra24` | Texto completo del consentimiento |
| `numeroExtra01` | Numero del nivel de madurez |
| `numeroExtra02` | Cantidad de respuestas No |
| `numeroExtra03` | Cantidad de respuestas Si |
| `numeroExtra04` | Total de preguntas |
| `booleanoExtra01` | Consentimiento aceptado |
| `fechaExtra01` | Fecha de envio |
| `listaObjetoExtra01` | Lista de preguntas y respuestas del diagnostico |

Cada item de `listaObjetoExtra01` usa:

| Clave del objeto | Significado |
| --- | --- |
| `tipo` | `pregunta-respuesta` |
| `clave` | Identificador de la pregunta |
| `pregunta` | Texto de la pregunta |
| `respuestaTexto` | Respuesta visible, por ejemplo `Sí` o `No` |
| `respuestaNumero` | Valor numerico de la respuesta, por ejemplo `1` o `0` |
| `respuestaBooleano` | Valor booleano de la respuesta |
| `respuestaFecha` | Fecha de respuesta/envio |
| `categoria` | Categoria del bloque |

### `registro-evento`

| Clave | Significado |
| --- | --- |
| `origen` | Valor fijo: `registro-evento` |
| `fechaEnvio` | Fecha/hora del envio en formato ISO |
| `textoExtra01` | Nombre completo |
| `textoExtra02` | Nombres |
| `textoExtra03` | Apellidos |
| `textoExtra04` | Correo |
| `textoExtra05` | Telefono |
| `textoExtra06` | Pais del telefono |
| `textoExtra07` | Empresa |
| `textoExtra08` | Cargo |
| `textoExtra11` | Pagina de origen |
| `textoExtra12` | Slug del evento |
| `booleanoExtra01` | Consentimiento aceptado |
| `fechaExtra01` | Fecha de envio |

### `libro-reclamaciones`

| Clave | Significado |
| --- | --- |
| `origen` | Valor fijo: `libro-reclamaciones` |
| `fechaEnvio` | Fecha/hora del envio en formato ISO |
| `textoExtra01` | Nombre completo |
| `textoExtra02` | Nombres |
| `textoExtra03` | Apellidos |
| `textoExtra04` | Correo |
| `textoExtra05` | Telefono |
| `textoExtra11` | Pagina de origen |
| `textoExtra13` | Tipo de documento |
| `textoExtra14` | Numero de documento |
| `textoExtra15` | Departamento de direccion |
| `textoExtra16` | Provincia |
| `textoExtra17` | Distrito |
| `textoExtra18` | Direccion |
| `textoExtra19` | Departamento del reclamo |
| `textoExtra20` | Tipo de bien: Producto o Servicio |
| `textoExtra21` | Motivo: Reclamo o Queja |
| `textoExtra22` | Detalle |
| `textoExtra23` | Pedido del cliente |
| `booleanoExtra01` | Consentimiento aceptado |
| `booleanoExtra02` | Condiciones aceptadas |
| `fechaExtra01` | Fecha de envio |

## Ejemplos reales enviados por la web

### Contacto del home

```json
{
  "origen": "formulario-contacto",
  "fechaEnvio": "2026-05-20T15:00:00.000Z",
  "textoExtra01": "Juan Perez",
  "textoExtra04": "juan@empresa.com",
  "textoExtra05": "+51 999999999",
  "textoExtra06": "PE",
  "textoExtra07": "Empresa XYZ",
  "textoExtra10": "Gestion documental desordenada",
  "textoExtra11": "/#contacto",
  "booleanoExtra01": true,
  "fechaExtra01": "2026-05-20T15:00:00.000Z"
}
```

### Diagnostico Legal Ops - inicio

```json
{
  "origen": "Diagnóstico-inicio",
  "fechaEnvio": "2026-05-20T15:00:00.000Z",
  "textoExtra01": "Juan Perez",
  "textoExtra04": "juan@empresa.com",
  "textoExtra07": "Empresa XYZ",
  "textoExtra09": "GC",
  "textoExtra11": "/diagnostico-legal-ops-formulario-inicio",
  "textoExtra24": "Tu información es confidencial y se usa solo para coordinar una conversación si la solicitas.",
  "booleanoExtra01": true,
  "fechaExtra01": "2026-05-20T15:00:00.000Z"
}
```

### Diagnostico Legal Ops - resultado final

```json
{
  "origen": "diagnostico-legal-ops",
  "fechaEnvio": "2026-05-20T15:00:00.000Z",
  "textoExtra01": "Juan Perez",
  "textoExtra04": "juan@empresa.com",
  "textoExtra07": "Empresa XYZ",
  "textoExtra09": "GC",
  "textoExtra10": "Diagnóstico Legal Ops - Nivel 2 (Estructurado)",
  "textoExtra11": "/diagnostico-legal-ops-formulario-inicio",
  "textoExtra13": "Estructurado",
  "textoExtra24": "Tu información es confidencial y se usa solo para coordinar una conversación si la solicitas.",
  "numeroExtra01": 2,
  "numeroExtra02": 4,
  "numeroExtra03": 3,
  "numeroExtra04": 7,
  "booleanoExtra01": true,
  "fechaExtra01": "2026-05-20T15:00:00.000Z",
  "listaObjetoExtra01": [
    {
      "tipo": "pregunta-respuesta",
      "clave": "pregunta01",
      "pregunta": "¿Tus contratos están centralizados en un repositorio único?",
      "respuestaTexto": "No",
      "respuestaNumero": 0,
      "respuestaBooleano": false,
      "respuestaFecha": "2026-05-20T15:00:00.000Z",
      "categoria": "diagnostico-legal-ops"
    }
  ]
}
```

### Registro de evento

```json
{
  "origen": "registro-evento",
  "fechaEnvio": "2026-05-20T15:00:00.000Z",
  "textoExtra01": "Juan Perez",
  "textoExtra02": "Juan",
  "textoExtra03": "Perez",
  "textoExtra04": "juan@empresa.com",
  "textoExtra05": "+51 999999999",
  "textoExtra06": "PE",
  "textoExtra07": "Empresa XYZ",
  "textoExtra08": "Legal Counsel",
  "textoExtra11": "/eventos/webinar-legalops-binder-niubox",
  "textoExtra12": "webinar-legalops-binder-niubox",
  "booleanoExtra01": true,
  "fechaExtra01": "2026-05-20T15:00:00.000Z"
}
```

### Libro de reclamaciones

```json
{
  "origen": "libro-reclamaciones",
  "fechaEnvio": "2026-05-20T15:00:00.000Z",
  "textoExtra01": "Juan Perez",
  "textoExtra02": "Juan",
  "textoExtra03": "Perez",
  "textoExtra04": "juan@empresa.com",
  "textoExtra05": "987 654 321",
  "textoExtra11": "/legal/reclamaciones",
  "textoExtra13": "DNI",
  "textoExtra14": "12345678",
  "textoExtra15": "Lima",
  "textoExtra16": "Lima",
  "textoExtra17": "Miraflores",
  "textoExtra18": "Av. Ejemplo 123",
  "textoExtra19": "Lima",
  "textoExtra20": "Servicio",
  "textoExtra21": "Reclamo",
  "textoExtra22": "Detalle del reclamo o queja",
  "textoExtra23": "Pedido o solucion esperada",
  "booleanoExtra01": true,
  "booleanoExtra02": true,
  "fechaExtra01": "2026-05-20T15:00:00.000Z"
}
```

## Valores posibles

```json
{
  "origen": [
    "formulario-contacto",
    "formulario-caso-procesos",
    "formulario-caso-clm",
    "formulario-caso-expediente",
    "Diagnóstico-inicio",
    "diagnostico-legal-ops",
    "registro-evento",
    "libro-reclamaciones"
  ],
  "textoExtra20": ["Producto", "Servicio"],
  "textoExtra21": ["Reclamo", "Queja"],
  "listaObjetoExtra01[].respuestaTexto": ["Sí", "No"]
}
```

## Como se prueba

1. En Bubble, abrir el Backend Workflow `binderla-formulario`.
2. Activar "Detecting Request Data".
3. Enviar el JSON completo de inicializacion al endpoint `/initialize`.
4. Confirmar que Bubble detecte todos los campos.
5. Configurar `VITE_BUBBLE_WEBHOOK_URL` en Vercel con el endpoint de produccion.
6. Opcionalmente configurar `VITE_WEBHOOK_URL` en Vercel para duplicar envios hacia un webhook de prueba.
7. Hacer redeploy.
8. Probar cada formulario y validar en Bubble que `origen` permita separar la logica.

## Regla para futuros formularios

Para evitar reinicializar Bubble, no crear claves nuevas fuera de este contrato. Si aparece un formulario nuevo, usar un nuevo valor de `origen` y mapear sus datos a las claves disponibles (`textoExtraXX`, `numeroExtraXX`, `booleanoExtraXX`, `fechaExtraXX`, `listaTextoExtraXX`, `objetoExtraXX` o `listaObjetoExtraXX`) en este indice.

## Error si falta el link en Vercel

Si falta la variable en Vercel, el formulario mostrara este error:

```text
Configura VITE_BUBBLE_WEBHOOK_URL antes de publicar este formulario.
```

`VITE_WEBHOOK_URL` no muestra error si falta o si falla, porque es solo un webhook secundario de pruebas.
