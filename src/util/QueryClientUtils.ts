import { QueryClient } from '@tanstack/react-query';

let _queryClient: QueryClient | undefined;

export const setGlobalQueryClient = (client: QueryClient) => {
  _queryClient = client;
};

export const getGlobalQueryClient = (): QueryClient => {
  if (!_queryClient) {
    throw new Error('QueryClient não foi inicializado. Chame a função setGlobalQueryClient no root.');
  }
  return _queryClient;
};
