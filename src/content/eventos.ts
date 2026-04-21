/**
 * Event landing pages keyed by URL slug (`/eventos/:slug`).
 */

export interface EventSpeaker {
  name: string;
  initials: string;
  role: string;
  company: string;
  bio: string;
  avatarUrl?: string;
}

export interface EventMetaBadge {
  text: string;
  background?: string;
}

export interface EventMeta {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  badge?: EventMetaBadge;
}

export interface EventData {
  slug: string;
  coHostPill?: string;
  seoTitle: string;
  seoDescription: string;
  badgeText: string;
  titleLine1Before: string;
  titleLine1Highlight: string;
  titleLine1After: string;
  titleLine2: string;
  description: string;
  meta: EventMeta[];
  speakers: EventSpeaker[];
  formHeading: string;
  formSubtext: string;
  formSubtextStrong?: string;
  ctaText: string;
  navTag: string;
  footerLogos: string[];
  footerNote: string;
  formNoteHtml?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  toolbarDateTime: string;
  infoDateTitle: string;
  infoTimeText: string;
  infoLocationTitle: string;
  infoLocationSub: string;
}

export const eventsBySlug: Record<string, EventData> = {
  'webinar-legalops-binder-niubox': {
    slug: 'webinar-legalops-binder-niubox',
    coHostPill: 'NIUBOX',
    seoTitle: 'De lo reactivo al control - Binder x Niubox | Webinar',
    seoDescription:
      'Webinar gratuito: cómo preparar tu área legal para un negocio que ya no espera. Binder y Niubox. 15 de abril de 2026.',
    badgeText: 'Webinar gratuito',
    titleLine1Before: 'De lo reactivo al ',
    titleLine1Highlight: 'control',
    titleLine1After: ':',
    titleLine2: 'cómo preparar tu área legal\npara un negocio que ya no espera',
    description:
      'El mercado cambió, la tecnología avanzó y otras áreas ya operan con más eficiencia. Legal no puede ser la excepción. Únete a esta conversación sobre cómo elevar su madurez operativa y responder con más orden, trazabilidad y eficiencia.',
    meta: [
      {
        icon: '📅',
        label: 'Fecha',
        value: 'Miércoles 15 de abril de 2026',
      },
      {
        icon: '⏰',
        label: 'Hora',
        value: '11:00 a. m.',
        sub: '· 60 minutos · Acceso gratuito · Cupo limitado',
      },
      {
        icon: '💻',
        label: 'Plataforma',
        value: '',
        sub: 'Online · Link al confirmar registro',
        badge: { text: 'Zoom', background: '#1a6fd4' },
      },
      {
        icon: '🎙',
        label: 'Speakers',
        value: 'Oscar Montezuma · Niubox + Carlos Arana · Binder',
      },
    ],
    speakers: [
      {
        name: 'Carlos Arana',
        initials: 'CA',
        role: 'CEO & Founder · Binder',
        company: 'Binder',
        bio: 'Construyó Binder para resolver el caos operativo del trabajo legal. Acompaña a equipos desde el diagnóstico hasta la adopción.',
        avatarUrl: '/imgs-webinar/carlos.png',
      },
      {
        name: 'Oscar Montezuma',
        initials: 'OM',
        role: 'CEO & Founder · Niubox Legal | Digital',
        company: 'Niubox',
        bio: 'Consultor experto en diagnóstico y transformación operativa de áreas legales. Cree que la tecnología llega después del proceso.',
        avatarUrl: '/imgs-webinar/oscar.png',
      },
    ],
    formHeading: 'Reserva tu lugar',
    formSubtext: 'Cupo limitado. ',
    formSubtextStrong: 'Es gratuito.',
    ctaText: 'Inscríbete',
    navTag: 'Webinar · 15 Abr 2026',
    footerLogos: ['BINDER', 'NIUBOX LEGAL | DIGITAL', 'PROGRAMA PI'],
    footerNote: '© 2026 · Webinar LegalTech · De lo reactivo al control',
    formNoteHtml:
      'Al registrarte aceptas recibir comunicaciones de Binder y Niubox.<br /><strong>Sin spam. Puedes darte de baja en cualquier momento.</strong>',
    toolbarDateTime: 'MIÉ 15 ABRIL · 11:00 a. m.',
    infoDateTitle: 'MIÉRCOLES 15 DE ABRIL',
    infoTimeText: '11:00 a. m.',
    infoLocationTitle: 'VÍA ZOOM | 60 MIN',
    infoLocationSub: 'Acceso gratuito con cupos limitados',
  },
};

export function getEventBySlug(slug: string | undefined): EventData | undefined {
  if (!slug) return undefined;
  return eventsBySlug[slug];
}

export const eventSlugs = Object.keys(eventsBySlug);
