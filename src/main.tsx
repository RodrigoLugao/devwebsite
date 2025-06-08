import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Criação do QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
