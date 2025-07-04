import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setGlobalQueryClient } from './util/QueryClientUtils';

const queryClient = new QueryClient();

setGlobalQueryClient(queryClient);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);