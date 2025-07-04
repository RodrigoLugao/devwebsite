import { Tipo } from "./Modelo";

export interface FiltroVeiculo {
  nomeModelo?: string;
  fabricante?: string;
  tipo?: Tipo | "";
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  kmsMin?: number;
  kmsMax?: number;
  cambio?: string;
  cor?: string;
}
