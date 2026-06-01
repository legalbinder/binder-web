import type { BubbleFormPayload } from '../integrations/bubble/bubbleWebhooks';
import { normalizeEmailDomain, validateEmail } from '../utils/corporateEmailValidation';
import { buildBubbleFormPayloadBase } from './bubbleFormPayload';

export type ComplaintDocumentType = '' | 'DNI' | 'Pasaporte' | 'RUC' | 'Carnet de extranjería';
export type ComplaintProductType = 'Producto' | 'Servicio';
export type ComplaintReason = 'Reclamo' | 'Queja';

export interface ComplaintFormData {
  documentType: ComplaintDocumentType;
  documentNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addressDepartment: string;
  province: string;
  district: string;
  address: string;
  claimDepartment: string;
  productType: ComplaintProductType;
  reason: ComplaintReason;
  detail: string;
  request: string;
  privacyConsent: boolean;
  acceptsConditions: boolean;
}

export type ComplaintErrors = Partial<Record<keyof ComplaintFormData | 'submit', string>>;

export const initialComplaintFormData: ComplaintFormData = {
  documentType: '',
  documentNumber: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  addressDepartment: '',
  province: '',
  district: '',
  address: '',
  claimDepartment: '',
  productType: 'Producto',
  reason: 'Reclamo',
  detail: '',
  request: '',
  privacyConsent: false,
  acceptsConditions: false,
};

export function validateComplaintForm(formData: ComplaintFormData): ComplaintErrors {
  const errors: ComplaintErrors = {};

  if (!formData.documentType) {
    errors.documentType = 'Selecciona un tipo de documento.';
  }

  if (!formData.documentNumber.trim()) {
    errors.documentNumber = 'Ingresa tu número de documento.';
  }

  if (!formData.firstName.trim()) {
    errors.firstName = 'Ingresa tus nombres.';
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Ingresa tus apellidos.';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Ingresa tu teléfono.';
  }

  const emailError = validateEmail(formData.email, {
    requiredMessage: 'Ingresa tu correo electrónico.',
    invalidMessage: 'Ingresa un correo electrónico válido.',
  });
  if (emailError) {
    errors.email = emailError;
  }

  if (!formData.addressDepartment) {
    errors.addressDepartment = 'Selecciona un departamento.';
  }

  if (!formData.province.trim()) {
    errors.province = 'Ingresa tu provincia.';
  }

  if (!formData.district.trim()) {
    errors.district = 'Ingresa tu distrito.';
  }

  if (!formData.address.trim()) {
    errors.address = 'Ingresa tu dirección.';
  }

  if (!formData.detail.trim()) {
    errors.detail = 'Describe el detalle de tu reclamo o queja.';
  }

  if (!formData.request.trim()) {
    errors.request = 'Indica el pedido o solución esperada.';
  }

  if (!formData.acceptsConditions) {
    errors.acceptsConditions = 'Debes aceptar las condiciones de atención.';
  }

  if (!formData.privacyConsent) {
    errors.privacyConsent = 'Debes aceptar la Política de Privacidad para continuar.';
  }

  return errors;
}

export function buildComplaintPayload(formData: ComplaintFormData): BubbleFormPayload {
  return {
    ...buildBubbleFormPayloadBase({
      origen: 'libro-reclamaciones',
      privacyConsent: formData.privacyConsent,
    }),
    textoExtra01: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
    textoExtra02: formData.firstName.trim(),
    textoExtra03: formData.lastName.trim(),
    textoExtra04: normalizeEmailDomain(formData.email),
    textoExtra05: formData.phone.trim(),
    textoExtra11: '/legal/reclamaciones',
    textoExtra13: formData.documentType,
    textoExtra14: formData.documentNumber.trim(),
    textoExtra15: formData.addressDepartment,
    textoExtra16: formData.province.trim(),
    textoExtra17: formData.district.trim(),
    textoExtra18: formData.address.trim(),
    textoExtra19: formData.claimDepartment.trim(),
    textoExtra20: formData.productType,
    textoExtra21: formData.reason,
    textoExtra22: formData.detail.trim(),
    textoExtra23: formData.request.trim(),
    booleanoExtra02: formData.acceptsConditions,
  };
}
