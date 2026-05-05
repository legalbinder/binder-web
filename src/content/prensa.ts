export interface PressMediaOutlet {
  name: string;
  logo: string;
  url: string;
}

export interface PressCoverageLink {
  outlet: string;
  url: string;
}

export interface PressStat {
  value: string;
  label: string;
}

export type PressArticleBlock =
  | {
      type: 'heading';
      text: string;
    }
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'quote';
      text: string;
      cite: string;
    };

export interface PressStory {
  slug: string;
  tag: string;
  dateLabel: string;
  publishedAt: string;
  title: string;
  seoTitle: string;
  description: string;
  heroStat: PressStat;
  image: string;
  imageAlt: string;
  keyword: string;
  badges: string[];
  coverage: PressCoverageLink[];
  body: PressArticleBlock[];
  sidebarStats: PressStat[];
}

export const pressMediaOutlets: PressMediaOutlet[] = [
  {
    name: 'El Comercio',
    logo: '/prensa/images/media-logos/el-comercio.png',
    url: 'https://elcomercio.pe/economia/dia-1/equipos-legales-pierden-hasta-300-horas-al-mes-en-coordinaciones-contractuales-juzina-noticia/',
  },
  {
    name: 'Gestión',
    logo: '/prensa/images/media-logos/gestion.png',
    url: 'https://gestion.pe/tecnologia/el-nuevo-rol-de-la-ia-en-empresas-no-basta-automatizar-para-producir-mas-noticia/',
  },
  {
    name: 'El Peruano',
    logo: '/prensa/images/media-logos/el-peruano.png',
    url: 'https://www.elperuano.pe/noticia/290282-ia-transforma-la-gestion-de-departamentos-legales',
  },
  {
    name: 'Infobae',
    logo: '/prensa/images/media-logos/infobae.png',
    url: 'https://www.infobae.com/peru/2026/01/26/adios-a-la-montana-de-expedientes-como-la-ia-esta-reduciendo-costos-y-acelerando-la-resolucion-de-controversias-en-peru/',
  },
  {
    name: 'Exitosa',
    logo: '/prensa/images/media-logos/exitosa.png',
    url: 'https://www.exitosanoticias.pe/actualidad/menos-carga-operativa-mas-estrategia-como-ia-esta-cambiando-trabajo-legal-n167673',
  },
  {
    name: 'Caretas',
    logo: '/prensa/images/media-logos/caretas.png',
    url: 'https://caretas.pe/tecnologia/areas-legales-en-alerta-95-trabaja-sin-bases-de-datos-estructuradas/',
  },
  {
    name: 'Revista Economía',
    logo: '/prensa/images/media-logos/revista-economia.png',
    url: 'https://www.revistaeconomia.com/peru-95-de-equipos-legales-opera-sin-base-de-datos-estructurada/',
  },
  {
    name: 'Expreso',
    logo: '/prensa/images/media-logos/expreso.png',
    url: 'https://www.expreso.com.pe/actualidad/menos-carga-operativa-mas-estrategia-la-inteligencia-artificial-revoluciona-el-trabajo-legal-en-empresas-peruanas-noticia/1256431/',
  },
];

export const pressStories: PressStory[] = [
  {
    slug: 'ia-gestion-legal',
    tag: 'Cobertura',
    dateLabel: 'Enero 2026',
    publishedAt: '2026-01-26',
    title: 'Menos carga operativa, más estrategia: cómo la IA está cambiando el trabajo legal en el Perú',
    seoTitle: 'Menos carga operativa, más estrategia: cómo la IA está cambiando el trabajo legal | Binder',
    description:
      'Cuatro medios peruanos documentaron por qué la inteligencia artificial ya está cambiando la gestión legal y qué oportunidades abre para los equipos legales.',
    heroStat: {
      value: '79%',
      label: 'de profesionales legales ya usa IA · Perú, 2026',
    },
    image: '/prensa/images/story-ia-gestion-legal.png',
    imageAlt: 'Portátil con visualizaciones de datos e inteligencia artificial',
    keyword: 'Legal Tech · IA · Legal Ops · Perú',
    badges: ['El Peruano', 'Infobae', '+2 medios'],
    coverage: [
      {
        outlet: 'El Peruano',
        url: 'https://www.elperuano.pe/noticia/290282-ia-transforma-la-gestion-de-departamentos-legales',
      },
      {
        outlet: 'Infobae',
        url: 'https://www.infobae.com/peru/2026/01/26/adios-a-la-montana-de-expedientes-como-la-ia-esta-reduciendo-costos-y-acelerando-la-resolucion-de-controversias-en-peru/',
      },
      {
        outlet: 'Exitosa',
        url: 'https://www.exitosanoticias.pe/actualidad/menos-carga-operativa-mas-estrategia-como-ia-esta-cambiando-trabajo-legal-n167673',
      },
      {
        outlet: 'Expreso',
        url: 'https://www.expreso.com.pe/actualidad/menos-carga-operativa-mas-estrategia-la-inteligencia-artificial-revoluciona-el-trabajo-legal-en-empresas-peruanas-noticia/1256431/',
      },
    ],
    body: [
      {
        type: 'heading',
        text: 'El caos operativo de tu área legal tiene costo. Y ya lo están midiendo.',
      },
      {
        type: 'paragraph',
        text: 'Mientras otras áreas de tu empresa llevan años con sistemas integrados, reportes automáticos y datos en tiempo real, tu área legal probablemente sigue con correos, Excel y carpetas compartidas. Esa es la realidad de casi todos los equipos legales en Perú. Y cuatro medios nacionales lo documentaron al mismo tiempo.',
      },
      {
        type: 'heading',
        text: 'El impacto que nadie está calculando',
      },
      {
        type: 'paragraph',
        text: 'El 9% de los ingresos de una empresa puede perderse por mala gestión contractual. El 71% de las organizaciones no encuentra documentos críticos cuando los necesita. Y más del 80% de los equipos legales opera sin métricas ni estructura clara.',
      },
      {
        type: 'heading',
        text: 'Cinco cosas que consumen tu tiempo sin que te des cuenta',
      },
      {
        type: 'paragraph',
        text: 'Carlos Arana, CEO de Binder, identifica cinco procesos donde la tecnología puede devolverte horas reales de trabajo estratégico:',
      },
      {
        type: 'paragraph',
        text: 'Buscar el contrato correcto entre versiones dispersas. Rastrear el estado de un proceso por correo. Hacer seguimiento manual de plazos y vencimientos. Preparar reportes desde cero cada vez que la dirección los pide. Repetir tareas de registro que no agregan ningún valor jurídico.',
      },
      {
        type: 'paragraph',
        text: 'No son tareas menores. Son las que se llevan la mayor parte del día.',
      },
      {
        type: 'quote',
        text: 'Durante años se normalizó el desorden en las áreas legales. Eso tiene un impacto directo en los resultados del negocio y en la calidad del trabajo jurídico.',
        cite: 'Carlos Arana, CEO y Fundador de Binder',
      },
      {
        type: 'heading',
        text: 'Lo que ya está pasando en otros mercados',
      },
      {
        type: 'paragraph',
        text: 'En mercados más maduros, los equipos legales ya trabajan con sistemas que centralizan, automatizan y dan visibilidad real. No para reemplazar el criterio jurídico, sino para que el abogado pueda concentrarse en lo que realmente importa: el análisis, la estrategia y la prevención de riesgos.',
      },
      {
        type: 'paragraph',
        text: 'Para las organizaciones en Perú y Latinoamérica, eso no es el futuro, es la ventana que tienen ahora.',
      },
      {
        type: 'quote',
        text: 'La eficiencia de tu área legal ya no depende solo del talento de tu equipo, sino de contar con sistemas que ordenen la información, reduzcan la carga operativa y entreguen visibilidad real del trabajo legal.',
        cite: 'Carlos Arana, CEO de Binder',
      },
    ],
    sidebarStats: [
      {
        value: '19→79%',
        label: 'Adopción de IA legal en un año (Legal Trends Report, Clio)',
      },
      {
        value: '9%',
        label: 'de ingresos perdidos por mala gestión contractual',
      },
      {
        value: '71%',
        label: 'de empresas no encuentra documentos críticos cuando los necesita',
      },
      {
        value: '+80%',
        label: 'de equipos legales opera sin métricas ni estructura clara',
      },
    ],
  },
  {
    slug: '95-sin-base-de-datos',
    tag: 'Investigación',
    dateLabel: 'Febrero 2026',
    publishedAt: '2026-02-26',
    title: 'El 95% de equipos legales en el Perú opera sin base de datos estructurada',
    seoTitle: 'El 95% de equipos legales opera sin base de datos estructurada | Binder',
    description:
      'La falta de bases de datos estructuradas en equipos legales genera horas de reportería manual, poca visibilidad y costos operativos acumulados.',
    heroStat: {
      value: '95%',
      label: 'de equipos legales opera sin base de datos estructurada · Perú, 2026',
    },
    image: '/prensa/images/story-95-sin-base-de-datos.png',
    imageAlt: 'Abogados revisando documentos y bases de datos legales',
    keyword: 'Datos legales · Reportería · Legal Ops · Perú',
    badges: ['Infobae', 'Caretas', 'Rev. Economía'],
    coverage: [
      {
        outlet: 'Infobae',
        url: 'https://www.infobae.com/peru/2026/02/26/el-95-de-equipos-legales-en-peru-opera-sin-base-de-datos-estructurada-el-sobrecosto-oculto-que-estan-ignorando/',
      },
      {
        outlet: 'Caretas',
        url: 'https://caretas.pe/tecnologia/areas-legales-en-alerta-95-trabaja-sin-bases-de-datos-estructuradas/',
      },
      {
        outlet: 'Revista Economía',
        url: 'https://www.revistaeconomia.com/peru-95-de-equipos-legales-opera-sin-base-de-datos-estructurada/',
      },
      {
        outlet: 'El Peruano',
        url: 'https://elperuano.pe/noticia/291616-equipos-legales-el-95-opera-sin-una-base-de-datos-estructurada',
      },
    ],
    body: [
      {
        type: 'heading',
        text: 'Un problema silencioso con un costo estructural muy visible',
      },
      {
        type: 'paragraph',
        text: 'En un entorno empresarial donde la data mueve decisiones, la mayor parte de los estudios de abogados y áreas legales corporativas del Perú sigue operando sin una base de datos estructurada ni sistemas integrados para generar reportes de gestión. El resultado es visibilidad operativa casi nula y un costo silencioso que se acumula mes a mes.',
      },
      {
        type: 'paragraph',
        text: 'Según información recogida por Binder, el 95% de los equipos legales no cuenta con una base de datos bien diseñada o completada. Esto obliga a mantener información de manera manual y a construir reportes desde cero cada vez que la dirección solicita métricas de gestión.',
      },
      {
        type: 'heading',
        text: 'El impacto en números concretos',
      },
      {
        type: 'paragraph',
        text: 'El costo es cuantificable: cada abogado destina entre 2 y 4 horas mensuales al mantenimiento manual de la data, y otras 2 a 4 horas a la elaboración de reportes en hojas de cálculo. En total, entre 4 y 8 horas mensuales por persona en tareas que no agregan valor jurídico.',
      },
      {
        type: 'quote',
        text: 'El problema no es solo el tiempo invertido, sino la falta de visibilidad que genera: si la data no está estructurada, no es confiable ni explotable estratégicamente.',
        cite: 'Carlos Arana, CEO y Fundador de Binder',
      },
      {
        type: 'heading',
        text: 'La paradoja de la información fragmentada',
      },
      {
        type: 'paragraph',
        text: 'La fragmentación en correos, hojas de cálculo y carpetas compartidas dificulta responder preguntas clave para la dirección legal: carga de trabajo por cliente, tiempos de respuesta, riesgos contractuales recurrentes. Sin métricas consolidadas, el área legal opera con menor peso estratégico en la organización.',
      },
      {
        type: 'paragraph',
        text: 'El programa ProInnóvate del Ministerio de la Producción seleccionó a Binder como plataforma ganadora, cofinanciando soluciones que cierran brechas de productividad y eficiencia en la gestión de datos legales.',
      },
      {
        type: 'quote',
        text: 'En un equipo de diez abogados, 4 a 8 horas individuales pueden significar hasta 80 horas mensuales en tareas manuales. Cuando no se presta atención a esas cifras, el costo operativo se vuelve estructural.',
        cite: 'Carlos Arana, CEO y Fundador de Binder',
      },
    ],
    sidebarStats: [
      {
        value: '95%',
        label: 'de equipos legales sin base de datos estructurada',
      },
      {
        value: '4–8 h',
        label: 'por abogado al mes en tareas manuales de data y reportería',
      },
      {
        value: '80 h',
        label: 'mensuales perdidas en un equipo de 10 abogados',
      },
      {
        value: '95%',
        label: 'reducción en tiempo de reportería con base de datos integrada',
      },
    ],
  },
  {
    slug: 'horas-coordinacion-contractual',
    tag: 'Investigación',
    dateLabel: 'Marzo 2026',
    publishedAt: '2026-03-01',
    title: 'Equipos legales pierden entre 50 y 300 horas mensuales en coordinación contractual',
    seoTitle: 'Equipos legales pierden hasta 300 horas mensuales en coordinación contractual | Binder',
    description:
      'La coordinación contractual consume horas en seguimiento, firmas, validaciones y notificaciones que no agregan valor jurídico al equipo legal.',
    heroStat: {
      value: '300 h',
      label: 'mensuales perdidas en coordinación contractual · Perú, 2026',
    },
    image: '/prensa/images/story-horas-coordinacion.png',
    imageAlt: 'Ejecutivos coordinando documentos contractuales en una mesa de trabajo',
    keyword: 'Contratos · CLM · Coordinación legal · Perú',
    badges: ['El Comercio'],
    coverage: [
      {
        outlet: 'El Comercio',
        url: 'https://elcomercio.pe/economia/dia-1/equipos-legales-pierden-hasta-300-horas-al-mes-en-coordinaciones-contractuales-juzina-noticia/',
      },
    ],
    body: [
      {
        type: 'heading',
        text: 'Digitalizar documentos no es lo mismo que digitalizar procesos',
      },
      {
        type: 'paragraph',
        text: 'Aunque muchas áreas legales han avanzado en digitalizar documentos, el principal cuello de botella de su operación no está en la redacción jurídica: está en la coordinación que rodea a cada contrato. Tareas como seguimiento, firma y notificación pueden representar entre el 20% y el 50% del tiempo total de los equipos legales.',
      },
      {
        type: 'paragraph',
        text: 'En equipos que gestionan hasta 100 contratos al mes, esa fricción puede traducirse en 50 a 300 horas mensuales dedicadas a trabajo puramente operativo, con impacto directo en la eficiencia interna y el cumplimiento de plazos críticos.',
      },
      {
        type: 'heading',
        text: 'Dónde se va el tiempo, contrato por contrato',
      },
      {
        type: 'paragraph',
        text: 'Seguimiento y recordatorios: un contrato promedio con dos autorizaciones y cuatro firmantes puede consumir hasta 1 hora únicamente en correos de seguimiento y confirmaciones. No en revisión jurídica: en administración de personas.',
      },
      {
        type: 'paragraph',
        text: 'Coordinación de firma: entre 1 y 3 horas adicionales por documento, incluyendo desplazamientos, validaciones y almacenamiento posterior.',
      },
      {
        type: 'paragraph',
        text: 'Notificaciones: entre 30 minutos y 3 horas por contrato, según el trámite y las dependencias involucradas.',
      },
      {
        type: 'quote',
        text: 'Durante años se ha puesto el foco en cuánto tiempo toma redactar un contrato, pero poco se ha medido el tiempo que se pierde moviéndolo internamente. La coordinación se convierte en un freno para la eficiencia del área legal y, por extensión, para el negocio.',
        cite: 'Carlos Arana, CEO y Fundador de Binder',
      },
      {
        type: 'heading',
        text: 'De la gestión de documentos a la operación integrada',
      },
      {
        type: 'paragraph',
        text: 'Tener documentos digitalizados no equivale a tener procesos digitalizados. Muchas áreas continúan operando con herramientas fragmentadas que dificultan la trazabilidad, aumentan el margen de error y limitan la escalabilidad. La propuesta de Binder fue seleccionada como ganadora del programa ProInnóvate del Ministerio de la Producción por su capacidad de cerrar exactamente esta brecha.',
      },
      {
        type: 'quote',
        text: 'La digitalización de archivos fue un primer paso necesario, pero sigue siendo insuficiente si los procesos que rodean a los contratos siguen siendo los mismos de siempre.',
        cite: 'Carlos Arana, CEO y Fundador de Binder',
      },
    ],
    sidebarStats: [
      {
        value: '20–50%',
        label: 'del tiempo total del equipo legal en tareas de coordinación',
      },
      {
        value: '50–300 h',
        label: 'mensuales en equipos de hasta 100 contratos/mes',
      },
      {
        value: '1 h',
        label: 'promedio en seguimiento y recordatorios por contrato',
      },
      {
        value: '1–3 h',
        label: 'adicionales por documento en coordinación de firma',
      },
    ],
  },
  {
    slug: '75-menos-tiempo-operativo',
    tag: 'Cobertura',
    dateLabel: 'Abril 2026',
    publishedAt: '2026-04-01',
    title: 'Hasta 75% menos tiempo en tareas operativas: lo que la tecnología ya le devuelve a tu equipo legal',
    seoTitle: 'Hasta 75% menos tiempo en tareas operativas legales | Binder',
    description:
      'La tecnología especializada permite reducir el tiempo operativo en documentos legales y liberar capacidad estratégica para el equipo jurídico.',
    heroStat: {
      value: '75%',
      label: 'menos tiempo en documentos operativos · Latinoamérica, 2026',
    },
    image: '/prensa/images/story-75-menos-tiempo.png',
    imageAlt: 'Profesionales trabajando con documentos digitales legales',
    keyword: 'Automatización legal · Documentos · Productividad legal',
    badges: ['Gestión', 'El Peruano'],
    coverage: [
      {
        outlet: 'Gestión',
        url: 'https://gestion.pe/tecnologia/el-nuevo-rol-de-la-ia-en-empresas-no-basta-automatizar-para-producir-mas-noticia/',
      },
      {
        outlet: 'El Peruano',
        url: 'https://elperuano.pe/noticia/293603-areas-legales-pueden-reducir-hasta-en-75-tiempo-de-elaboracion-de-documentos-con-tecnologia-especializada',
      },
    ],
    body: [
      {
        type: 'heading',
        text: 'Tu equipo legal no es lento. Sus herramientas sí lo son.',
      },
      {
        type: 'paragraph',
        text: 'Hay una parte del trabajo legal que nadie diseñó, pero que igual ocupa gran parte del día: elaborar el mismo tipo de documento desde cero cada vez, buscar la versión correcta de un contrato entre correos, coordinar revisiones por cadenas de mensajes que nadie controla del todo. Son tareas necesarias. Pero su acumulación deja poco espacio para el trabajo que realmente requiere tu criterio.',
      },
      {
        type: 'heading',
        text: 'Los números que lo confirman',
      },
      {
        type: 'paragraph',
        text: 'Según estimaciones de Binder, cuando un área legal implementa tecnología especializada con buenas prácticas, puede reducir hasta un 75% el tiempo de producción de documentos de baja complejidad como cartas, memorandos y adendas. En documentos más complejos —contratos especializados, demandas o informes legales— la reducción puede llegar al 55%.',
      },
      {
        type: 'paragraph',
        text: 'No son eficiencias marginales. Son horas reales que tu equipo puede redirigir a análisis, prevención de riesgos y acompañamiento estratégico al negocio.',
      },
      {
        type: 'quote',
        text: 'Gran parte del trabajo legal cotidiano está compuesto por tareas repetitivas que se han normalizado al punto de que muchos equipos jurídicos no dimensionan cuánto tiempo están dejando sobre la mesa. Cuando esos procesos se estructuran y se apoyan en tecnología, el abogado puede concentrarse en análisis estratégico y gestión de riesgos.',
        cite: 'Carlos Arana, CEO y Fundador de Binder',
      },
      {
        type: 'heading',
        text: 'La brecha que más cuesta ignorar',
      },
      {
        type: 'paragraph',
        text: 'Muchos equipos ya dieron el primer paso: digitalizaron sus archivos. Pero hay una diferencia importante entre tener documentos en formato digital y tener flujos de trabajo estructurados, con plantillas inteligentes, seguimiento de versiones y alertas contractuales. Esa brecha, entre lo digital y lo automatizado, es donde se concentra la mayor oportunidad de ganancia operativa para tu área legal.',
      },
      {
        type: 'paragraph',
        text: 'En América Latina, el 80% de los abogados trabaja con herramientas fragmentadas. El problema no es nuevo. Lo que sí es nuevo es que ya existe tecnología diseñada específicamente para resolverlo.',
      },
      {
        type: 'quote',
        text: 'Digitalizar fue un primer paso importante. El siguiente es estructurar los flujos de trabajo y automatizar las tareas repetitivas: ahí es donde el área legal empieza a ganar eficiencia y a posicionarse como un área que impulsa decisiones de negocio, en lugar de solo responder a ellas.',
        cite: 'Carlos Arana, CEO de Binder',
      },
      {
        type: 'heading',
        text: 'Un respaldo que va más allá del mercado',
      },
      {
        type: 'paragraph',
        text: 'ProInnóvate, el programa de innovación del Ministerio de la Producción, seleccionó la propuesta de Binder dentro de sus iniciativas de cofinanciamiento, reconociendo en la gestión legal un vector concreto de eficiencia para las empresas. La modernización legal dejó de ser una apuesta de nicho.',
      },
    ],
    sidebarStats: [
      {
        value: '75%',
        label: 'reducción en tiempo de documentos de baja complejidad',
      },
      {
        value: '55%',
        label: 'reducción en documentos complejos',
      },
      {
        value: '9%',
        label: 'de ingresos perdidos por gestión contractual deficiente',
      },
      {
        value: '80%',
        label: 'de abogados en Latinoamérica trabaja con herramientas fragmentadas',
      },
    ],
  },
];

export const getPressStoryBySlug = (slug: string | undefined) =>
  pressStories.find((story) => story.slug === slug);

export const getAdjacentPressStories = (slug: string) => {
  const currentIndex = pressStories.findIndex((story) => story.slug === slug);

  return {
    previous: currentIndex > 0 ? pressStories[currentIndex - 1] : undefined,
    next:
      currentIndex >= 0 && currentIndex < pressStories.length - 1
        ? pressStories[currentIndex + 1]
        : undefined,
  };
};
