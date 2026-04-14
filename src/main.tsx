import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { ThemeProvider } from './app/providers/ThemeProvider';
import './app/providers/i18n'; // Initialize i18next globally
import './index.css';
import ReactQueryProvider from './app/providers/ReactQueryProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
