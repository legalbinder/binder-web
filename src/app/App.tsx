import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { AppProviders } from './providers';
import '../styles/globals.css';

function App() {
  return (
    <AppProviders>
      <Router>
        <AppLayout />
      </Router>
    </AppProviders>
  );
}

export default App;
