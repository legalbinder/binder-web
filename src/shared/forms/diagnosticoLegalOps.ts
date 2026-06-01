import type { BubbleFormPayload } from '../integrations/bubble/bubbleWebhooks';
import { normalizeEmailDomain, validateEmail } from '../utils/corporateEmailValidation';
import type { FormSubmissionData } from '../utils/formSubmission';
import { buildBubbleFormPayloadBase } from './bubbleFormPayload';

export interface DiagnosticoGateFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  privacyConsent: boolean;
}

export interface DiagnosticoGateErrors {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  privacyConsent?: string;
  submit?: string;
}

export interface DiagnosticoQuestionAnswerPayload {
  tipo: 'Si-no';
  clave: string;
  pregunta: string;
  respuestaTexto: 'Sí' | 'No';
  respuestaNumero: 1 | 0;
  respuestaBooleano: boolean;
  respuestaFecha: string;
  categoria: 'diagnostico-legal-ops';
}

interface DiagnosticoLevelResult {
  number: number;
  level: string;
}

interface DiagnosticoQuestion {
  id: string;
  question: string;
}

export function validateDiagnosticoGateForm(
  formData: DiagnosticoGateFormData,
  blockedDomains: string[]
): DiagnosticoGateErrors {
  const errors: DiagnosticoGateErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'El nombre y apellido es requerido.';
  }

  if (!formData.company.trim()) {
    errors.company = 'La empresa es requerida.';
  }

  const emailError = validateEmail(formData.email, {
    requiredMessage: 'El email corporativo es requerido.',
    invalidMessage: 'Ingresa un email válido.',
    blockedDomains,
  });
  if (emailError) {
    errors.email = emailError;
  }

  if (!formData.role) {
    errors.role = 'Selecciona tu cargo.';
  }

  if (!formData.privacyConsent) {
    errors.privacyConsent = 'Debes aceptar la Política de Privacidad para continuar.';
  }

  return errors;
}

export function buildDiagnosticoGatePayload(
  formData: DiagnosticoGateFormData
): BubbleFormPayload {
  return {
    ...buildBubbleFormPayloadBase({
      origen: 'Diagnóstico-inicio',
      privacyConsent: formData.privacyConsent,
    }),
    textoExtra01: formData.name.trim(),
    textoExtra04: normalizeEmailDomain(formData.email),
    textoExtra07: formData.company.trim(),
    textoExtra09: formData.role,
    textoExtra11: '/diagnostico-legal-ops-formulario-inicio',
  };
}

export function buildDiagnosticoResultPayload({
  formData,
  finalLevel,
  noCount,
  questions,
  answers,
}: {
  formData: DiagnosticoGateFormData;
  finalLevel: DiagnosticoLevelResult;
  noCount: number;
  questions: DiagnosticoQuestion[];
  answers: Array<boolean | null>;
}): BubbleFormPayload {
  const basePayload = buildBubbleFormPayloadBase({
    origen: 'diagnostico-legal-ops',
    privacyConsent: formData.privacyConsent,
  });

  return {
    ...basePayload,
    textoExtra01: formData.name.trim(),
    textoExtra04: normalizeEmailDomain(formData.email),
    textoExtra07: formData.company.trim(),
    textoExtra09: formData.role,
    textoExtra10: `Diagnóstico Legal Ops - Nivel ${finalLevel.number} (${finalLevel.level})`,
    textoExtra11: '/diagnostico-legal-ops-formulario-inicio',
    textoExtra13: finalLevel.level,
    numeroExtra01: finalLevel.number,
    numeroExtra02: noCount,
    numeroExtra03: questions.length - noCount,
    numeroExtra04: questions.length,
    listaObjetoExtra01: answers.map((answer, index): DiagnosticoQuestionAnswerPayload => ({
      tipo: 'Si-no',
      clave: questions[index].id,
      pregunta: questions[index].question,
      respuestaTexto: answer === true ? 'Sí' : 'No',
      respuestaNumero: answer === true ? 1 : 0,
      respuestaBooleano: answer === true,
      respuestaFecha: basePayload.fechaEnvio,
      categoria: 'diagnostico-legal-ops',
    })),
  };
}

export function createDiagnosticoSubmissionData(
  formData: DiagnosticoGateFormData
): FormSubmissionData {
  return {
    name: formData.name.trim(),
    company: formData.company.trim(),
    email: normalizeEmailDomain(formData.email),
  };
}
