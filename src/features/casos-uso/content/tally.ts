export interface TallyStat {
  value: string;
  label: string;
}

export interface TallySolution {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  image: string;
  mockup: string;
  mockupPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface TallyComparisonRow {
  traditional: string;
  tally: string;
}

export interface TallyAudience {
  role: string;
  description: string;
}

export interface TallyUseCase {
  title: string;
  description: string;
}

export interface TallyFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const tallyContent = {
  route: '/casos-uso/gestion-tiempo-facturacion',
  seo: {
    title: 'Tally | Gestión de tiempo, facturación y rentabilidad para estudios de abogados',
    description:
      'Gestiona horas, gastos, facturación y cobranza desde una sola plataforma. Obtén visibilidad en tiempo real sobre la rentabilidad de cada cliente o caso.',
  },
  homeCallout: {
    title: 'Gestión de tiempo y facturación para estudios legales',
    description:
      'Transforma horas trabajadas en información para decidir mejor. Visualiza rentabilidad, ingresos y desempeño por cliente o caso.',
    cta: 'Ver más',
  },
  hero: {
    product: 'Tally',
    kicker: 'Gestión de tiempo y facturación',
    title: 'Controla el tiempo, los ingresos y la rentabilidad de tu estudio',
    subtitle:
      'Transforma la gestión diaria en información precisa para facturar mejor, optimizar rentabilidad y tomar decisiones con mayor claridad.',
    ctaText: 'Agenda tu demo',
    image: '/images/tally/tally-hero.jpg',
    logo: '/images/tally/tally-logo.svg',
  },
  stats: {
    title: '¿Cuántas horas facturables pierde tu estudio cada semana sin saberlo?',
    items: [
      {
        value: '10%–25%',
        label: 'del tiempo facturable se pierde por registros tardíos o incompletos.',
      },
      {
        value: '12 horas',
        label:
          'a la semana se destinan a tareas administrativas relacionadas con seguimiento, consolidación de información y control operativo.',
      },
      {
        value: '69%',
        label: 'de los estudios jurídicos no tiene visibilidad completa sobre su ciclo de ingresos.',
      },
    ] as TallyStat[],
    description:
      'La consecuencia es simple: menos control sobre la rentabilidad real de clientes y casos. Binder organiza la operación del estudio para que cada hora trabajada pueda convertirse en facturación, cobranza y análisis.',
  },
  solution: {
    title: 'Del tiempo trabajado a la rentabilidad real',
    description:
      'Tally conecta horas, tarifas, gastos, facturación y cobranza en un mismo flujo operativo. Cada actividad queda asociada al cliente o caso correspondiente y alimenta indicadores que ayudan a dirigir mejor la operación del estudio.',
    items: [
      {
        id: 'registro-horas',
        eyebrow: '01',
        title: 'Registro de horas preciso',
        description:
          'Registra el tiempo trabajado por cliente, caso, tarea, abogado o equipo desde una experiencia diseñada para el ritmo diario de una firma legal.',
        outcome: 'Horas claras desde el origen.',
        image: '/images/tally/tally-registro-horas.jpg',
        mockup: '/images/tally/hp-registro-horas.png',
        mockupPosition: 'bottom-right',
      },
      {
        id: 'tarifas',
        eyebrow: '02',
        title: 'Tarifas por cliente, caso o abogado',
        description:
          'Configura tarifas según cliente, tipo de servicio, seniority, práctica o asunto. Cada hora registrada se vincula automáticamente a su valor correspondiente.',
        outcome: 'Cada hora asociada a su valor real.',
        image: '/images/tally/tally-tarifas.jpg',
        mockup: '/images/tally/hp-tarifas.png',
        mockupPosition: 'top-left',
      },
      {
        id: 'facturacion',
        eyebrow: '03',
        title: 'Facturación, gastos y reembolsos bajo control',
        description:
          'Convierte horas y actividades validadas en información lista para facturar. Registra gastos judiciales, desembolsos y costos asociados a cada cliente o caso para facilitar reembolsos y liquidaciones.',
        outcome: 'Facturación y gastos conectados en un mismo flujo.',
        image: '/images/tally/tally-facturacion.jpg',
        mockup: '/images/tally/hp-facturacion.png',
        mockupPosition: 'bottom-left',
      },
      {
        id: 'cobranza',
        eyebrow: '04',
        title: 'Gestión de cobranza integrada',
        description:
          'Haz seguimiento al estado de cada factura, controla saldos pendientes y mantén visibilidad sobre cuentas por cobrar desde una sola plataforma.',
        outcome: 'Más control sobre el flujo de ingresos del estudio.',
        image: '/images/tally/tally-cobranza.jpg',
        mockup: '/images/tally/hp-cobranza-reporteria.png',
        mockupPosition: 'top-right',
      },
      {
        id: 'rentabilidad',
        eyebrow: '05',
        title: 'Visibilidad y rentabilidad en tiempo real',
        description:
          'Centraliza indicadores de productividad, rentabilidad, cobranza y gastos en dashboards y reportes actualizados para gestionar el estudio con mayor precisión.',
        outcome: 'Información clara para tomar mejores decisiones.',
        image: '/images/tally/tally-visibilidad-rentabilidad.jpg',
        mockup: '/images/tally/hp-visibilidad-rentabilidad.png',
        mockupPosition: 'bottom-right',
      },
    ] as TallySolution[],
  },
  comparison: {
    title: 'Gestionar con hojas de cálculo vs. gestionar con Tally',
    traditionalHeader: 'Gestión tradicional',
    tallyHeader: 'Gestión con Tally',
    rows: [
      {
        traditional: 'Horas registradas en herramientas dispersas',
        tally: 'Registro centralizado por cliente, caso, tarea y abogado',
      },
      {
        traditional: 'Gastos judiciales controlados manualmente',
        tally: 'Gastos y reembolsos asociados a cada asunto',
      },
      {
        traditional: 'Facturación preparada de forma manual',
        tally: 'Flujo integrado desde horas hasta facturación',
      },
      {
        traditional: 'Cobranza gestionada fuera del sistema',
        tally: 'Seguimiento de cuentas por cobrar en un solo lugar',
      },
      {
        traditional: 'Rentabilidad calculada al cierre del mes',
        tally: 'Visibilidad en tiempo real',
      },
      {
        traditional: 'Reportes armados manualmente',
        tally: 'Dashboards y reportería automática',
      },
    ] as TallyComparisonRow[],
  },
  audiences: {
    title: 'Una vista completa de la operación y los ingresos del estudio',
    description:
      'Tally permite entender cómo se distribuye el trabajo, qué clientes demandan más recursos, qué asuntos generan mayor rentabilidad y cuál es el estado real de la facturación, los gastos y la cobranza.',
    items: [
      {
        role: 'Socios',
        description: 'Visibilidad sobre productividad, ingresos, cobranza y rentabilidad.',
      },
      {
        role: 'Abogados',
        description: 'Registro simple de horas y actividades conectado al trabajo diario.',
      },
      {
        role: 'Administración',
        description: 'Facturación, gastos y seguimiento financiero desde una sola plataforma.',
      },
      {
        role: 'Clientes',
        description: 'Reportes claros sobre actividades, avances y gastos asociados a sus asuntos.',
      },
    ] as TallyAudience[],
  },
  useCases: {
    title: 'Tally se adapta a distintas formas de facturación legal',
    items: [
      {
        title: 'Facturación por horas',
        description: 'Registra tiempo por abogado, cliente, caso, tarifa y tarea.',
      },
      {
        title: 'Tarifas fijas',
        description: 'Compara el tiempo invertido frente al valor pactado.',
      },
      {
        title: 'Bolsas de horas',
        description: 'Monitorea consumo, saldos y avance por cliente.',
      },
      {
        title: 'Retainers o igualas',
        description: 'Controla dedicación, utilización y rentabilidad mensual.',
      },
      {
        title: 'Gastos judiciales y reembolsos',
        description:
          'Registra desembolsos, controla recuperación de gastos y liquida conceptos asociados a cada asunto.',
      },
      {
        title: 'Gestión de cobranza',
        description: 'Realiza seguimiento a facturas pendientes y controla ingresos esperados.',
      },
      {
        title: 'Gestión interna del equipo',
        description: 'Mide carga de trabajo, productividad y distribución de tareas.',
      },
    ] as TallyUseCase[],
  },
  reminder: {
    label: 'Recordatorios y automatización',
    title: 'Nada se queda pendiente',
    description:
      'Tally envía recordatorios automáticos para ayudar a mantener al día registros de horas, facturación, cobranza, gastos y otras actividades clave de la operación.',
    outcome: 'Más visibilidad. Menos fugas operativas.',
  },
  faq: {
    title: 'Resolvemos las dudas más comunes sobre Tally',
    items: [
      {
        id: 'faq-tally-1',
        question: '¿Qué permite hacer Tally?',
        answer:
          'Tally permite gestionar horas, tarifas, gastos, facturación, cobranza y rentabilidad desde una sola plataforma.',
      },
      {
        id: 'faq-tally-2',
        question: '¿Está pensado para estudios de abogados?',
        answer:
          'Sí. Tally está diseñado para la forma en que trabajan las firmas legales y sus distintos modelos de facturación.',
      },
      {
        id: 'faq-tally-3',
        question: '¿Puedo registrar gastos judiciales?',
        answer:
          'Sí. Cada gasto puede asociarse a un cliente o caso para facilitar reembolsos, liquidaciones y análisis de rentabilidad.',
      },
      {
        id: 'faq-tally-4',
        question: '¿Puedo hacer seguimiento a la cobranza?',
        answer:
          'Sí. Tally permite controlar facturas pendientes, saldos por cobrar y estado de recuperación de ingresos.',
      },
      {
        id: 'faq-tally-5',
        question: '¿Incluye dashboards y reportes?',
        answer:
          'Sí. Cuenta con dashboards y reportería en tiempo real para productividad, ingresos, gastos y rentabilidad.',
      },
      {
        id: 'faq-tally-6',
        question: '¿Tally reemplaza hojas de cálculo?',
        answer:
          'Tally centraliza la información que normalmente se encuentra dispersa entre hojas de cálculo, correos y sistemas independientes.',
      },
      {
        id: 'faq-tally-7',
        question: '¿Necesito soporte técnico para implementarlo?',
        answer:
          'El equipo de Binder acompaña la configuración inicial para adaptarla a la operación y forma de trabajo de tu estudio.',
      },
    ] as TallyFaqItem[],
  },
  finalCta: {
    title: 'Convierte cada hora en una mejor decisión para tu estudio',
    description:
      'Tally te ayuda a registrar tiempo, controlar gastos, gestionar cobranza y entender la rentabilidad real de cada cliente o caso. Agenda una demo y descubre cómo Binder puede ayudarte a operar con más control, visibilidad y eficiencia.',
    ctaText: 'Agenda una demo de Tally',
  },
  contact: {
    title: 'Agenda una demo de Tally',
    description:
      'Cuéntanos cómo gestiona hoy tu estudio las horas, tarifas, facturación y cobranza.',
    callToAction:
      'Te mostraremos cómo Tally puede ayudarte a ganar control operativo y visibilidad de rentabilidad.',
    form: {
      title: 'Conversemos sobre Tally',
      fields: {
        name: {
          label: 'Nombre y apellido',
          placeholder: 'Tu nombre completo',
          required: true,
        },
        company: {
          label: 'Estudio / organización',
          placeholder: 'Nombre de tu estudio u organización',
          required: true,
        },
        email: {
          label: 'Correo corporativo',
          placeholder: 'tu.email@estudio.com',
          required: true,
          type: 'email',
        },
        phone: {
          label: 'Teléfono',
          placeholder: '999 999 999',
          required: false,
          type: 'tel',
        },
        message: {
          label: 'Principal necesidad',
          placeholder: '¿Qué quieres mejorar con Tally?',
          required: false,
          type: 'select',
          options: [
            'Registro de horas',
            'Tarifas y rentabilidad',
            'Facturación y gastos',
            'Gestión de cobranza',
            'Dashboards y reportería',
          ],
        },
      },
      submitText: 'Agendar demo',
      consent: {
        text: 'Al enviar este formulario aceptas la Política de Privacidad y autorizas a Binder a contactarte con información sobre sus servicios.',
        required: true,
      },
    },
  },
};
