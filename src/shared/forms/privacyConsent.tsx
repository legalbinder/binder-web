import { Link } from 'react-router-dom';

export const PRIVACY_POLICY_PATH = '/legal/privacidad';

export const PRIVACY_CONSENT_TEXT =
  'Al enviar este formulario aceptas la Política de Privacidad y autorizas a Binder a contactarte con información sobre sus servicios.';

export const PrivacyConsentLabel = () => (
  <>
    Al enviar este formulario aceptas la{' '}
    <Link to={PRIVACY_POLICY_PATH} target="_blank" rel="noopener noreferrer">
      Política de Privacidad
    </Link>{' '}
    y autorizas a Binder a contactarte con información sobre sus servicios.
  </>
);
