import { Navigate, Route, Routes } from 'react-router-dom';
import { Apps } from '../components/sections/Apps';
import { CanyonFlowsPage } from '../components/sections/CanyonFlows';
import { Contact } from '../components/sections/Contact';
import { FlowPatternPage } from '../components/sections/FlowPattern';
import { GentleWavesPage } from '../components/sections/GentleWaves';
import { Home } from '../components/sections/Home';
import { Solutions } from '../components/sections/Solutions';
import { WhyBinder } from '../components/sections/WhyBinder';
import { CLMPage } from '../pages/casos-uso/CLMPage';
import { CasesPage } from '../pages/casos-uso/CasesPage';
import { ExpedienteDigitalPage } from '../pages/casos-uso/ExpedienteDigitalPage';
import { ContactoPage } from '../pages/ContactoPage';
import { DiagnosticoLegalOpsPageGateStart } from '../pages/DiagnosticoLegalOpsPageGateStart';
import { Hito2AnexosPage } from '../pages/docs/Hito2AnexosPage';
import { OnboardingAnexo1Page } from '../pages/docs/onboarding/OnboardingAnexo1Page';
import { OnboardingAnexo2Page } from '../pages/docs/onboarding/OnboardingAnexo2Page';
import { OnboardingAnexo3Page } from '../pages/docs/onboarding/OnboardingAnexo3Page';
import { OnboardingAnexo4Page } from '../pages/docs/onboarding/OnboardingAnexo4Page';
import { OnboardingAnexo5Page } from '../pages/docs/onboarding/OnboardingAnexo5Page';
import { PrepReunionOkaPage } from '../pages/docs/PrepReunionOkaPage';
import { EventPage } from '../pages/eventos/EventPage';
import { FuncionalidadesPage } from '../pages/FuncionalidadesPage';
import { GraciasPage } from '../pages/GraciasPage';
import { AvisoLegalPage } from '../pages/legal/AvisoLegalPage';
import { CookiesPage } from '../pages/legal/CookiesPage';
import { PrivacidadPage } from '../pages/legal/PrivacidadPage';
import { ReclamacionesPage } from '../pages/legal/ReclamacionesPage';
import { SeguridadPage } from '../pages/legal/SeguridadPage';
import { TerminosPage } from '../pages/legal/TerminosPage';
import { PressPage } from '../pages/prensa/PressPage';
import { PressStoryPage } from '../pages/prensa/PressStoryPage';
import { PorQueBinderPage } from '../pages/PorQueBinderPage';
import { SobreBinderPage } from '../pages/SobreBinderPage';
import { SolucionesPage } from '../pages/SolucionesPage';
import { TestAnimationPage } from '../pages/TestAnimationPage';
import { TestimoniosPage } from '../pages/TestimoniosPage';

const HomePage = () => (
  <main>
    <Home />
    <WhyBinder />
    <Solutions />
    <Apps />
    <Contact />
  </main>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/gentle-waves" element={<GentleWavesPage />} />
    <Route path="/canyon-flows" element={<CanyonFlowsPage />} />
    <Route path="/flow-pattern" element={<FlowPatternPage />} />
    <Route path="/porquebinder" element={<PorQueBinderPage />} />
    <Route path="/sobrebinder" element={<SobreBinderPage />} />
    <Route path="/funcionalidades" element={<FuncionalidadesPage />} />
    <Route path="/soluciones" element={<SolucionesPage />} />
    <Route path="/testimonios" element={<TestimoniosPage />} />
    <Route path="/contacto" element={<ContactoPage />} />
    <Route path="/gracias" element={<GraciasPage />} />
    <Route
      path="/diagnostico-legal-ops-formulario-inicio"
      element={<DiagnosticoLegalOpsPageGateStart />}
    />
    <Route
      path="/diagnostico-legal-ops"
      element={<Navigate to="/diagnostico-legal-ops-formulario-inicio" replace />}
    />
    <Route path="/legal/privacidad" element={<PrivacidadPage />} />
    <Route path="/legal/cookies" element={<CookiesPage />} />
    <Route path="/legal/terminos" element={<TerminosPage />} />
    <Route path="/legal/aviso" element={<AvisoLegalPage />} />
    <Route path="/legal/seguridad" element={<SeguridadPage />} />
    <Route path="/legal/reclamaciones" element={<ReclamacionesPage />} />
    <Route path="/prensa" element={<PressPage />} />
    <Route path="/prensa/:slug" element={<PressStoryPage />} />
    <Route path="/casos-uso/clm" element={<CLMPage />} />
    <Route path="/casos-uso/gestion-procesos" element={<CasesPage />} />
    <Route path="/casos-uso/expediente-digital" element={<ExpedienteDigitalPage />} />
    <Route path="/cases" element={<Navigate to="/casos-uso/gestion-procesos" replace />} />
    <Route path="/test/antigravity" element={<TestAnimationPage />} />
    <Route path="/docs/prep-reunion-oka-ciberseguridad" element={<PrepReunionOkaPage />} />
    <Route path="/hito2/anexos" element={<Hito2AnexosPage />} />
    <Route path="/hito2/anexos/onboarding/anexo-1" element={<OnboardingAnexo1Page />} />
    <Route path="/hito2/anexos/onboarding/anexo-2" element={<OnboardingAnexo2Page />} />
    <Route path="/hito2/anexos/onboarding/anexo-3" element={<OnboardingAnexo3Page />} />
    <Route path="/hito2/anexos/onboarding/anexo-4" element={<OnboardingAnexo4Page />} />
    <Route path="/hito2/anexos/onboarding/anexo-5" element={<OnboardingAnexo5Page />} />
    <Route path="/eventos/:slug" element={<EventPage />} />
    <Route path="/" element={<HomePage />} />
  </Routes>
);
