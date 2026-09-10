import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/grenze';
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource-variable/noto-sans-georgian';
import '@fontsource-variable/noto-serif-georgian';
import '@fontsource/noto-sans-runic';
import '@/styles/global.scss';
import { I18nProvider } from '@/i18n/I18nProvider';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
