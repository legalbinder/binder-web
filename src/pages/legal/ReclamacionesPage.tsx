import { FormEvent, useState } from 'react';
import { InternalPage } from '../../components/layout/InternalPage';
import { PageHead } from '../../components/seo/PageHead';
import { getBubbleWebhookUrl } from '../../shared/integrations/bubble/bubbleWebhooks';
import { postBubbleWorkflow } from '../../shared/integrations/bubble/postBubbleWorkflow';
import './ReclamacionesPage.css';

type DocumentType = '' | 'DNI' | 'Pasaporte' | 'RUC' | 'Carnet de extranjería';
type ProductType = 'Producto' | 'Servicio';
type ComplaintReason = 'Reclamo' | 'Queja';

interface ComplaintFormData {
  documentType: DocumentType;
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
  productType: ProductType;
  reason: ComplaintReason;
  detail: string;
  request: string;
  acceptsConditions: boolean;
}

type ComplaintErrors = Partial<Record<keyof ComplaintFormData | 'submit', string>>;

interface ComplaintBookPayload extends ComplaintFormData {
  source: 'libro-reclamaciones';
  fullName: string;
  timestamp: string;
}

const documentTypes: Exclude<DocumentType, ''>[] = [
  'DNI',
  'Pasaporte',
  'RUC',
  'Carnet de extranjería',
];

const departments = [
  'Lima',
  'Arequipa',
  'Cusco',
  'La Libertad',
  'Piura',
  'Lambayeque',
  'Junín',
  'Ica',
  'Loreto',
  'Ancash',
  'Cajamarca',
  'Puno',
  'Ucayali',
  'Huánuco',
  'San Martín',
  'Ayacucho',
  'Tacna',
  'Tumbes',
  'Amazonas',
  'Madre de Dios',
  'Moquegua',
  'Huancavelica',
  'Apurímac',
  'Pasco',
  'Callao',
];

const initialFormData: ComplaintFormData = {
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
  acceptsConditions: false,
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const ReclamacionesPage = () => {
  const [formData, setFormData] = useState<ComplaintFormData>(initialFormData);
  const [errors, setErrors] = useState<ComplaintErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const updateField = (
    field: keyof ComplaintFormData,
    value: ComplaintFormData[keyof ComplaintFormData]
  ) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      delete nextErrors.submit;
      return nextErrors;
    });
    setSuccessMessage('');
  };

  const validateForm = (): boolean => {
    const nextErrors: ComplaintErrors = {};

    if (!formData.documentType) {
      nextErrors.documentType = 'Selecciona un tipo de documento.';
    }

    if (!formData.documentNumber.trim()) {
      nextErrors.documentNumber = 'Ingresa tu número de documento.';
    }

    if (!formData.firstName.trim()) {
      nextErrors.firstName = 'Ingresa tus nombres.';
    }

    if (!formData.lastName.trim()) {
      nextErrors.lastName = 'Ingresa tus apellidos.';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Ingresa tu teléfono.';
    }

    const email = formData.email.trim();
    if (!email) {
      nextErrors.email = 'Ingresa tu correo electrónico.';
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'Ingresa un correo electrónico válido.';
    }

    if (!formData.addressDepartment) {
      nextErrors.addressDepartment = 'Selecciona un departamento.';
    }

    if (!formData.province.trim()) {
      nextErrors.province = 'Ingresa tu provincia.';
    }

    if (!formData.district.trim()) {
      nextErrors.district = 'Ingresa tu distrito.';
    }

    if (!formData.address.trim()) {
      nextErrors.address = 'Ingresa tu dirección.';
    }

    if (!formData.detail.trim()) {
      nextErrors.detail = 'Describe el detalle de tu reclamo o queja.';
    }

    if (!formData.request.trim()) {
      nextErrors.request = 'Indica el pedido o solución esperada.';
    }

    if (!formData.acceptsConditions) {
      nextErrors.acceptsConditions = 'Debes aceptar las condiciones de atención.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ComplaintBookPayload = {
        ...formData,
        documentNumber: formData.documentNumber.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        province: formData.province.trim(),
        district: formData.district.trim(),
        address: formData.address.trim(),
        claimDepartment: formData.claimDepartment.trim(),
        detail: formData.detail.trim(),
        request: formData.request.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        source: 'libro-reclamaciones',
        timestamp: new Date().toISOString(),
      };

      await postBubbleWorkflow(getBubbleWebhookUrl('complaintBookForm'), payload);

      setFormData(initialFormData);
      setSuccessMessage(
        'Tu reclamación fue enviada correctamente. Nos comunicaremos contigo en un plazo máximo de 15 días calendarios.'
      );
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : 'No pudimos enviar tu reclamación. Intenta nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHead
        title="Libro de Reclamaciones | Binder"
        description="Presenta un reclamo o queja a través del Libro de Reclamaciones digital de Binder."
        canonicalUrl="/legal/reclamaciones"
      />
      <InternalPage
        title="Libro de Reclamaciones"
        contentClassName="reclamaciones-content-card"
      >
        <div className="reclamaciones-form-shell">
          <p className="reclamaciones-intro">
            Valoramos la satisfacción de nuestros clientes y estamos comprometidos con la
            resolución efectiva de cualquier inquietud o reclamación que pueda surgir.
            Complete el siguiente formulario y nos comunicaremos con usted en un plazo
            máximo de 15 días calendarios.
          </p>

          {successMessage && (
            <p className="reclamaciones-status reclamaciones-status--success">
              {successMessage}
            </p>
          )}

          <form className="reclamaciones-form" onSubmit={handleSubmit} noValidate>
            <h2 className="reclamaciones-section-heading">Ingresa tus datos</h2>
            <div className="reclamaciones-grid reclamaciones-grid--2">
              <div className="reclamaciones-field">
                <label htmlFor="documentType">
                  Tipo de documento de identidad <span>*</span>
                </label>
                <select
                  id="documentType"
                  value={formData.documentType}
                  onChange={(event) =>
                    updateField('documentType', event.target.value as DocumentType)
                  }
                  aria-invalid={Boolean(errors.documentType)}
                >
                  <option value="">Selecciona una opción</option>
                  {documentTypes.map((documentType) => (
                    <option key={documentType} value={documentType}>
                      {documentType}
                    </option>
                  ))}
                </select>
                {errors.documentType && (
                  <span className="reclamaciones-error">{errors.documentType}</span>
                )}
              </div>

              <div className="reclamaciones-field">
                <label htmlFor="documentNumber">
                  Número de documento <span>*</span>
                </label>
                <input
                  id="documentNumber"
                  type="text"
                  value={formData.documentNumber}
                  onChange={(event) => updateField('documentNumber', event.target.value)}
                  placeholder="Ej. 12345678"
                  aria-invalid={Boolean(errors.documentNumber)}
                />
                {errors.documentNumber && (
                  <span className="reclamaciones-error">{errors.documentNumber}</span>
                )}
              </div>

              <div className="reclamaciones-field">
                <label htmlFor="firstName">
                  Nombres <span>*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(event) => updateField('firstName', event.target.value)}
                  placeholder="Ingresa tus nombres"
                  aria-invalid={Boolean(errors.firstName)}
                />
                {errors.firstName && (
                  <span className="reclamaciones-error">{errors.firstName}</span>
                )}
              </div>

              <div className="reclamaciones-field">
                <label htmlFor="lastName">
                  Apellidos <span>*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(event) => updateField('lastName', event.target.value)}
                  placeholder="Ingresa tus apellidos"
                  aria-invalid={Boolean(errors.lastName)}
                />
                {errors.lastName && (
                  <span className="reclamaciones-error">{errors.lastName}</span>
                )}
              </div>

              <div className="reclamaciones-field">
                <label htmlFor="phone">
                  Teléfono <span>*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  placeholder="Ej. 987 654 321"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && (
                  <span className="reclamaciones-error">{errors.phone}</span>
                )}
              </div>

              <div className="reclamaciones-field">
                <label htmlFor="email">
                  Correo electrónico <span>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  placeholder="correo@ejemplo.com"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <span className="reclamaciones-error">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="reclamaciones-divider" />

            <h2 className="reclamaciones-section-heading">Ingresa tu dirección</h2>
            <div className="reclamaciones-grid reclamaciones-grid--3">
              <div className="reclamaciones-field">
                <label htmlFor="addressDepartment">
                  Departamento <span>*</span>
                </label>
                <select
                  id="addressDepartment"
                  value={formData.addressDepartment}
                  onChange={(event) => updateField('addressDepartment', event.target.value)}
                  aria-invalid={Boolean(errors.addressDepartment)}
                >
                  <option value="">Selecciona</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
                {errors.addressDepartment && (
                  <span className="reclamaciones-error">{errors.addressDepartment}</span>
                )}
              </div>

              <div className="reclamaciones-field">
                <label htmlFor="province">
                  Provincia <span>*</span>
                </label>
                <input
                  id="province"
                  type="text"
                  value={formData.province}
                  onChange={(event) => updateField('province', event.target.value)}
                  placeholder="Provincia"
                  aria-invalid={Boolean(errors.province)}
                />
                {errors.province && (
                  <span className="reclamaciones-error">{errors.province}</span>
                )}
              </div>

              <div className="reclamaciones-field">
                <label htmlFor="district">
                  Distrito <span>*</span>
                </label>
                <input
                  id="district"
                  type="text"
                  value={formData.district}
                  onChange={(event) => updateField('district', event.target.value)}
                  placeholder="Distrito"
                  aria-invalid={Boolean(errors.district)}
                />
                {errors.district && (
                  <span className="reclamaciones-error">{errors.district}</span>
                )}
              </div>

              <div className="reclamaciones-field reclamaciones-col--3">
                <label htmlFor="address">
                  Dirección <span>*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(event) => updateField('address', event.target.value)}
                  placeholder="Av. / Jr. / Calle, número, referencia..."
                  aria-invalid={Boolean(errors.address)}
                />
                {errors.address && (
                  <span className="reclamaciones-error">{errors.address}</span>
                )}
              </div>
            </div>

            <div className="reclamaciones-divider" />

            <h2 className="reclamaciones-section-heading">Ingresa tu reclamo</h2>
            <div className="reclamaciones-grid reclamaciones-grid--2 reclamaciones-claim-grid">
              <div className="reclamaciones-field">
                <label htmlFor="claimDepartment">Departamento</label>
                <select
                  id="claimDepartment"
                  value={formData.claimDepartment}
                  onChange={(event) => updateField('claimDepartment', event.target.value)}
                >
                  <option value="">Selecciona</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="reclamaciones-field">
                <span className="reclamaciones-control-label">Tipo</span>
                <div className="reclamaciones-type-group" aria-label="Tipo de bien reclamado">
                  {(['Producto', 'Servicio'] as ProductType[]).map((productType) => (
                    <button
                      key={productType}
                      type="button"
                      className={`reclamaciones-type-button ${
                        formData.productType === productType
                          ? 'reclamaciones-type-button--active'
                          : ''
                      }`}
                      onClick={() => updateField('productType', productType)}
                    >
                      {productType === 'Producto' ? 'Producto' : 'Servicio'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="reclamaciones-field reclamaciones-reason-field">
              <span className="reclamaciones-control-label">
                Motivo <span>*</span>
              </span>
              <div className="reclamaciones-reason-group">
                <label
                  className={`reclamaciones-reason-option ${
                    formData.reason === 'Reclamo'
                      ? 'reclamaciones-reason-option--active'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    checked={formData.reason === 'Reclamo'}
                    onChange={() => updateField('reason', 'Reclamo')}
                  />
                  <span className="reclamaciones-radio-dot" />
                  <span>
                    <strong>Reclamo *</strong>
                    <small>Disconformidad relacionada al producto o servicio brindado.</small>
                  </span>
                </label>

                <label
                  className={`reclamaciones-reason-option ${
                    formData.reason === 'Queja' ? 'reclamaciones-reason-option--active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    checked={formData.reason === 'Queja'}
                    onChange={() => updateField('reason', 'Queja')}
                  />
                  <span className="reclamaciones-radio-dot" />
                  <span>
                    <strong>Queja **</strong>
                    <small>
                      Disconformidad no relacionada a productos o servicios; o malestar
                      en la atención al público.
                    </small>
                  </span>
                </label>
              </div>
            </div>

            <div className="reclamaciones-info-box">
              <strong>* RECLAMO:</strong> Disconformidad al producto o servicio que brinda
              la empresa.
              <br />
              <strong>** QUEJA:</strong> Disconformidad no relacionada a los productos o
              servicios; o malestar o descontento respecto a la atención al público.
            </div>

            <div className="reclamaciones-textarea-stack">
              <div className="reclamaciones-field">
                <label htmlFor="detail">
                  Detalle <span>*</span>
                </label>
                <textarea
                  id="detail"
                  value={formData.detail}
                  onChange={(event) => updateField('detail', event.target.value)}
                  placeholder="Describe detalladamente el motivo de tu reclamo o queja..."
                  aria-invalid={Boolean(errors.detail)}
                />
                {errors.detail && (
                  <span className="reclamaciones-error">{errors.detail}</span>
                )}
              </div>

              <div className="reclamaciones-field">
                <label htmlFor="request">
                  Pedido del cliente <span>*</span>
                </label>
                <textarea
                  id="request"
                  className="reclamaciones-request-textarea"
                  value={formData.request}
                  onChange={(event) => updateField('request', event.target.value)}
                  placeholder="Indica qué solución o respuesta esperas recibir..."
                  aria-invalid={Boolean(errors.request)}
                />
                {errors.request && (
                  <span className="reclamaciones-error">{errors.request}</span>
                )}
              </div>
            </div>

            <div className="reclamaciones-considerations">
              <div className="reclamaciones-considerations-title">
                Consideraciones importantes
              </div>
              <p>
                El cliente al momento de enviar esta información acepta y declara conocer
                las condiciones de atención a su reclamo como son: Para poder atender su
                reclamación es necesario contar con la totalidad de la información
                requerida como mínima en el presente formulario, incluyendo sus datos de
                contacto actualizados. Si los datos consignados resultan insuficientes
                para el análisis y evaluación de su reclamación, esta se declarará
                improcedente. El plazo para la atención de reclamos es de{' '}
                <strong>15 días calendarios</strong>, el cual podrá extenderse dependiendo
                de su complejidad, previo aviso por el medio que usted escoja para el
                envío de su respuesta. La formulación del reclamo no impide acudir a otras
                vías de solución de controversias ni es requisito previo para interponer
                una denuncia ante el INDECOPI.
              </p>
            </div>

            <div className="reclamaciones-confirm-row">
              <input
                type="checkbox"
                id="acceptsConditions"
                checked={formData.acceptsConditions}
                onChange={(event) => updateField('acceptsConditions', event.target.checked)}
                aria-invalid={Boolean(errors.acceptsConditions)}
              />
              <label htmlFor="acceptsConditions">
                Mediante el mensaje enviado manifiesto mi conformidad de la solicitud
                ingresada y declaro haber leído y aceptado las condiciones de atención
                descritas anteriormente.
              </label>
            </div>
            {errors.acceptsConditions && (
              <span className="reclamaciones-error reclamaciones-error--block">
                {errors.acceptsConditions}
              </span>
            )}

            {errors.submit && (
              <p className="reclamaciones-status reclamaciones-status--error">
                {errors.submit}
              </p>
            )}

            <button className="reclamaciones-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar reclamación'}
            </button>
          </form>
        </div>
      </InternalPage>
    </>
  );
};
