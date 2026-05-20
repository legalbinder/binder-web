import { normalizeBubbleWorkflowPostUrl } from './normalizeBubbleWorkflowUrl';

const bubbleWebhookEnvKey = 'VITE_BUBBLE_WEBHOOK_URL';
const optionalWebhookEnvKey = 'VITE_WEBHOOK_URL';

function readWebhookEnvValue(envKey: 'VITE_BUBBLE_WEBHOOK_URL' | 'VITE_WEBHOOK_URL'): string | undefined {
  const rawValue = import.meta.env[envKey]?.trim();
  return rawValue ? normalizeBubbleWorkflowPostUrl(rawValue) : undefined;
}

export function getBubbleWebhookUrl(): string {
  const url = readWebhookEnvValue(bubbleWebhookEnvKey);

  if (!url) {
    throw new Error(`Configura ${bubbleWebhookEnvKey} antes de publicar este formulario.`);
  }

  return url;
}

export function getOptionalWebhookUrl(): string | undefined {
  return readWebhookEnvValue(optionalWebhookEnvKey);
}

export type BubbleFormOrigin =
  | 'formulario-contacto'
  | 'formulario-caso-procesos'
  | 'formulario-caso-clm'
  | 'formulario-caso-expediente'
  | 'diagnostico-legal-ops'
  | 'registro-evento'
  | 'libro-reclamaciones';

type TextExtraKey =
  | 'textoExtra01'
  | 'textoExtra02'
  | 'textoExtra03'
  | 'textoExtra04'
  | 'textoExtra05'
  | 'textoExtra06'
  | 'textoExtra07'
  | 'textoExtra08'
  | 'textoExtra09'
  | 'textoExtra10'
  | 'textoExtra11'
  | 'textoExtra12'
  | 'textoExtra13'
  | 'textoExtra14'
  | 'textoExtra15'
  | 'textoExtra16'
  | 'textoExtra17'
  | 'textoExtra18'
  | 'textoExtra19'
  | 'textoExtra20'
  | 'textoExtra21'
  | 'textoExtra22'
  | 'textoExtra23'
  | 'textoExtra24'
  | 'textoExtra25'
  | 'textoExtra26'
  | 'textoExtra27'
  | 'textoExtra28'
  | 'textoExtra29'
  | 'textoExtra30';

type NumberExtraKey =
  | 'numeroExtra01'
  | 'numeroExtra02'
  | 'numeroExtra03'
  | 'numeroExtra04'
  | 'numeroExtra05'
  | 'numeroExtra06'
  | 'numeroExtra07'
  | 'numeroExtra08'
  | 'numeroExtra09'
  | 'numeroExtra10'
  | 'numeroExtra11'
  | 'numeroExtra12'
  | 'numeroExtra13'
  | 'numeroExtra14'
  | 'numeroExtra15';

type BooleanExtraKey =
  | 'booleanoExtra01'
  | 'booleanoExtra02'
  | 'booleanoExtra03'
  | 'booleanoExtra04'
  | 'booleanoExtra05'
  | 'booleanoExtra06'
  | 'booleanoExtra07'
  | 'booleanoExtra08'
  | 'booleanoExtra09'
  | 'booleanoExtra10'
  | 'booleanoExtra11'
  | 'booleanoExtra12'
  | 'booleanoExtra13'
  | 'booleanoExtra14'
  | 'booleanoExtra15';

type DateExtraKey =
  | 'fechaExtra01'
  | 'fechaExtra02'
  | 'fechaExtra03'
  | 'fechaExtra04'
  | 'fechaExtra05'
  | 'fechaExtra06'
  | 'fechaExtra07'
  | 'fechaExtra08'
  | 'fechaExtra09'
  | 'fechaExtra10'
  | 'fechaExtra11'
  | 'fechaExtra12'
  | 'fechaExtra13'
  | 'fechaExtra14'
  | 'fechaExtra15';

type TextListExtraKey =
  | 'listaTextoExtra01'
  | 'listaTextoExtra02'
  | 'listaTextoExtra03'
  | 'listaTextoExtra04'
  | 'listaTextoExtra05'
  | 'listaTextoExtra06'
  | 'listaTextoExtra07'
  | 'listaTextoExtra08'
  | 'listaTextoExtra09'
  | 'listaTextoExtra10';

type ObjectExtraKey =
  | 'objetoExtra01'
  | 'objetoExtra02'
  | 'objetoExtra03'
  | 'objetoExtra04'
  | 'objetoExtra05'
  | 'objetoExtra06'
  | 'objetoExtra07'
  | 'objetoExtra08'
  | 'objetoExtra09'
  | 'objetoExtra10';

type ObjectListExtraKey =
  | 'listaObjetoExtra01'
  | 'listaObjetoExtra02'
  | 'listaObjetoExtra03'
  | 'listaObjetoExtra04'
  | 'listaObjetoExtra05'
  | 'listaObjetoExtra06'
  | 'listaObjetoExtra07'
  | 'listaObjetoExtra08'
  | 'listaObjetoExtra09'
  | 'listaObjetoExtra10';

export interface BubbleGenericObject {
  tipo?: string;
  clave?: string;
  titulo?: string;
  pregunta?: string;
  valorTexto?: string | null;
  valorNumero?: number | null;
  valorBooleano?: boolean | null;
  valorFecha?: string | null;
  listaTexto?: string[];
  respuestaTexto?: string | null;
  respuestaNumero?: number | null;
  respuestaBooleano?: boolean | null;
  respuestaFecha?: string | null;
  categoria?: string;
}

export type BubbleFormPayload = {
  origen: BubbleFormOrigin;
  fechaEnvio: string;
} & Partial<Record<TextExtraKey, string | null>>
  & Partial<Record<NumberExtraKey, number | null>>
  & Partial<Record<BooleanExtraKey, boolean | null>>
  & Partial<Record<DateExtraKey, string | null>>
  & Partial<Record<TextListExtraKey, string[]>>
  & Partial<Record<ObjectExtraKey, BubbleGenericObject>>
  & Partial<Record<ObjectListExtraKey, BubbleGenericObject[]>>;
