interface App {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  imagePlaceholder: string;
  link: string;
  status?: 'available' | 'development';
}

export const appsContent = {
  mainTitle: "Descubre cómo Binder se adapta a cada equipo legal",
  subtitle: "Soluciones diseñadas para diferentes desafíos: desde la gestión de contratos hasta el control de procesos, expedientes, tiempo y facturación.",
  apps: [
    {
      id: "cases",
      name: "Cases",
      subtitle: "Gestión de procesos judiciales y administrativos",
      description: "Digitaliza expedientes completos y mantén control total de todos tus flujos legales. Seguimiento en tiempo real y acceso instantáneo.",
      color: "var(--navy)",
      imagePlaceholder: "Icono de Cases",
      link: "/casos-uso/gestion-procesos",
      status: 'available',
    },
    {
      id: "deals",
      name: "Deals",
      subtitle: "CLM con IA",
      description: "Optimiza la gestión contractual de principio a fin. Automatiza tareas repetitivas y reduce tiempos de revisión con inteligencia artificial.",
      color: "var(--bright-purple)",
      imagePlaceholder: "Icono de Deals",
      link: "/casos-uso/clm",
      status: 'available',
    },
    {
      id: "archive",
      name: "Archive",
      subtitle: "Mesa de Partes Online y Portal de Requerimientos",
      description: "Centraliza todas las solicitudes y tareas operativas del equipo. Intake único con trazabilidad completa desde el inicio.",
      color: "var(--light-blue)",
      imagePlaceholder: "Icono de Archive",
      link: "/casos-uso/expediente-digital",
      status: 'available',
    },
    {
      id: "tally",
      name: "Tally",
      subtitle: "Gestión de tiempo y facturación para estudios legales",
      description: "Transforma horas trabajadas en información para decidir mejor. Visualiza rentabilidad, ingresos y desempeño por cliente o caso.",
      color: "var(--accent-teal)",
      imagePlaceholder: "Icono de Tally",
      link: "/casos-uso/gestion-tiempo-facturacion",
      status: 'available',
    },
  ] as App[],
};

