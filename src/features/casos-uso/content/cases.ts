interface CasesTab {
  id: string;
  tabName: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  imagePlaceholder: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface ComparisonRow {
  feature: string;
  sinBinder: string | boolean;
  conBinder: string | boolean;
}

export const casesContent = {
  hero: {
    title: "Gestión de Procesos Legales - Digitaliza y controla tus procesos judiciales y administrativos",
    subtitle: "Centraliza expedientes, oficios y presentaciones en un solo entorno digital con trazabilidad, alertas y cumplimiento garantizado.",
    ctaText: "Agenda tu demo",
  },
  stats: {
    title: "¿Cuántas veces tu equipo perdió un documento justo cuando más lo necesitaba?",
    items: [
      {
        value: 80,
        suffix: "%",
        text: "de los equipos legales en Latam aún gestionan expedientes por correo",
      },
    ],
    description: "Binder organiza, automatiza y da visibilidad a todo tu flujo legal para que el tiempo del equipo genere valor.",
  },
  tabs: {
    mainTitle: "Del archivo físico a la gestión inteligente",
    subtitle: "Binder integra expediente digital y mesa de partes online para que todo el ciclo judicial y administrativo sea 100% trazable. Cada documento, resolución y notificación queda registrado, vinculado al expediente correspondiente y disponible desde cualquier dispositivo.",
    tabs: [
      {
        id: "centralizacion-total",
        tabName: "Centralización",
        title: "Centralización",
        subtitle: "Digitaliza expedientes completos, con historial y búsqueda avanzada por nombre, fecha o tipo de proceso.",
        description: "Encuentra lo que necesitas en segundos.",
        bullets: [],
        imagePlaceholder: "Imagen de Centralización",
      },
      {
        id: "redaccion-inteligente",
        tabName: "Mesa de partes",
        title: "Mesa de partes",
        subtitle: "Recibe, registra y deriva documentos sin moverte del sistema.",
        description: "Control total de entradas y salidas documentales.",
        bullets: [],
        imagePlaceholder: "Imagen de Redacción inteligente",
      },
      {
        id: "firma-electronica",
        tabName: "Conexión institucional",
        title: "Conexión institucional",
        subtitle: "Integraciones con Poder Judicial, Indecopi y plataformas regulatorias.",
        description: "Presenta escritos y haz seguimiento sin salir de Binder.",
        bullets: [],
        imagePlaceholder: "Imagen de Firma electrónica",
      },
      {
        id: "dashboards-analitica",
        tabName: "Alertas",
        title: "Alertas",
        subtitle: "Binder te avisa antes de cada audiencia, vencimiento o notificación pendiente.",
        description: "Cero olvidos, cero sanciones.",
        bullets: [],
        imagePlaceholder: "Imagen de Dashboards",
      },
      {
        id: "trazabilidad-auditoria",
        tabName: "Seguridad",
        title: "Seguridad",
        subtitle: "Accesos auditables, encriptación y respaldo seguro en la nube.",
        description: "Cada expediente está protegido y accesible solo por las personas autorizadas.",
        bullets: [],
        imagePlaceholder: "Imagen de Trazabilidad",
      },
    ] as CasesTab[],
  },
  comparison: {
    title: "Por qué Binder y no los flujos de siempre",
    rows: [
      {
        feature: "Almacenamiento",
        sinBinder: "Carpetas físicas sin respaldo",
        conBinder: "Digitalización completa y segura",
      },
      {
        feature: "Plazos y alertas",
        sinBinder: "Plazos y alertas manuales",
        conBinder: "Alertas automáticas inteligentes",
      },
      {
        feature: "Organización",
        sinBinder: "Información dispersa",
        conBinder: "Centralización documental y trazabilidad",
      },
      {
        feature: "Seguridad",
        sinBinder: "Riesgo de pérdida o filtración",
        conBinder: "Seguridad avanzada y control de acceso",
      },
    ] as ComparisonRow[],
  },
  faq: {
    title: "Preguntas frecuentes",
    intro: "Digitalizar la gestión judicial puede parecer un cambio grande, pero con Binder es más simple de lo que imaginas. Estas son las preguntas más comunes de quienes ya dieron el paso",
    items: [
      {
        id: "faq-cases-1",
        question: "¿Qué diferencia a Binder de un simple sistema de archivo digital?",
        answer: "Binder no solo almacena información: digitaliza todo el flujo de los procesos judiciales y administrativos, con trazabilidad, alertas automáticas, control de gastos y provisiones, además de una mesa de partes digital integrada. Cada proceso tiene responsables, etapas y métricas de desempeño, todo dentro de un mismo entorno.",
      },
      {
        id: "faq-cases-2",
        question: "¿Puedo migrar mis expedientes actuales?",
        answer: "Sí. Binder puede importar tus datos históricos y organizarlos automáticamente por tipo de proceso, parte y etapa. Nuestro equipo de soporte te acompaña durante la configuración inicial.",
      },
      {
        id: "faq-cases-3",
        question: "¿Cómo se asegura la confidencialidad de los expedientes?",
        answer: "Solo las personas que tú autorices pueden acceder. Binder cumple con SOC 2 Tipo II, ISO 27001, 27017 y 27018, y realiza pruebas de penetración y hacking ético de forma continua.",
      },
      {
        id: "faq-cases-4",
        question: "¿Puedo registrar y derivar documentos directamente en la mesa de partes?",
        answer: "Sí. Binder incluye una mesa de partes digital integrada que permite ingresar, registrar y derivar documentos con trazabilidad completa. Las áreas pueden coordinar presentaciones y respuestas.",
      },
      {
        id: "faq-cases-5",
        question: "¿Binder me ayuda a revisar y redactar documentos?",
        answer: "Sí. Nuestro asistente virtual con IA puede revisar, resumir y redactar documentos judiciales o administrativos. Puedes generar escritos, validar texto o solicitar resúmenes de expedientes con un solo clic.",
      },
      {
        id: "faq-cases-6",
        question: "¿Binder me notifica sobre plazos y audiencias?",
        answer: "Sí. Binder envía alertas automáticas y recordatorios de vencimientos para evitar retrasos. Puedes configurarlas por tipo de proceso, prioridad o responsable.",
      },
      {
        id: "faq-cases-7",
        question: "¿Binder permite registrar gastos y provisiones?",
        answer: "Sí. El módulo de gestión incluye campos para registrar gastos, provisiones y honorarios asociados a cada proceso. Esto permite controlar presupuesto, reportar costos y medir rentabilidad por tipo de caso o cliente interno.",
      },
      {
        id: "faq-cases-8",
        question: "¿Qué necesito para empezar a usarlo?",
        answer: "Solo una conexión a internet. Puedes comenzar con los procesos más simples desde la primera semana y escalar progresivamente hacia una operación completa.",
      },
    ] as FAQItem[],
  },
};

