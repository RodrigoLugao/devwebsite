import { create } from 'zustand';
import { getGlobalQueryClient } from '../util/QueryClientUtils';

export interface PecaCarrinho {
  idPeca: number;
  quantidade: number;
}

interface CarrinhoState {
  itens: PecaCarrinho[];
  adicionarItem: (pecaId: number) => void;
  subtrairItem: (pecaId: number) => void;
  setQuantidade: (pecaId: number, qtd: number) => void;
  limparCarrinho: () => void;
  removerPeca: (pecaId: number) => void;
  hasItem: (pecaId: number) => boolean;
  getQuantidade: (pecaId: number) => number;
}

const loadCarrinhoFromLocalStorage = (): PecaCarrinho[] => {
  try {
    const serializedCarrinho = localStorage.getItem('carrinho');
    if (serializedCarrinho === null) {
      return [];
    }
    return JSON.parse(serializedCarrinho);
  } catch (error) {
    console.error("Erro ao carregar carrinho do localStorage:", error);
    return [];
  }
};

const saveCarrinhoToLocalStorage = (carrinho: PecaCarrinho[]) => {
  try {
    const queryClient = getGlobalQueryClient();

    queryClient.invalidateQueries({
      queryKey: ["pecas", "carrinho"],
    });

    const serializedCarrinho = JSON.stringify(carrinho);
    localStorage.setItem('carrinho', serializedCarrinho);
  } catch (error) {
    console.error("Erro ao salvar carrinho no localStorage:", error);
  }
};

export const useCarrinhoStore = create<CarrinhoState>((set, get) => ({
  itens: loadCarrinhoFromLocalStorage(),

  adicionarItem: (pecaId: number) => {
    set(carrinho => {
      const existe = carrinho.itens.find(item => item.idPeca === pecaId);
      let novosItens: PecaCarrinho[];

      if (existe) {
        novosItens = carrinho.itens.map(item =>
          item.idPeca === pecaId ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        novosItens = [...carrinho.itens, { idPeca: pecaId, quantidade: 1 }];
      }
      saveCarrinhoToLocalStorage(novosItens);
      return { itens: novosItens };
    });
  },

  subtrairItem: (pecaId: number) => {
    set(carrinho => {
      const novosItens = carrinho.itens
        .map(item => (item.idPeca === pecaId ? { ...item, quantidade: item.quantidade - 1 } : item))
        .filter(item => item.quantidade > 0);

      saveCarrinhoToLocalStorage(novosItens);
      return { itens: novosItens };
    });
  },

  setQuantidade: (pecaId: number, qtd: number) => {
    set(carrinho => {
      let novosItens: PecaCarrinho[];

      const itemExistente = carrinho.itens.find(item => item.idPeca === pecaId);

      if (itemExistente) {
        novosItens = carrinho.itens.map(item =>
          item.idPeca === pecaId ? { ...item, quantidade: qtd } : item
        ).filter(item => item.quantidade > 0);
      } else {
        if (qtd > 0) {
          novosItens = [...carrinho.itens, { idPeca: pecaId, quantidade: qtd }];
        } else {
          novosItens = carrinho.itens;
        }
      }

      saveCarrinhoToLocalStorage(novosItens);
      return { itens: novosItens };
    });
  },

  limparCarrinho: () => {
    set({ itens: [] });
    saveCarrinhoToLocalStorage([]);
  },

  removerPeca: (pecaId: number) => {
    set(carrinho => {
      const novosItens = carrinho.itens.filter(item => item.idPeca !== pecaId);
      saveCarrinhoToLocalStorage(novosItens); 
      return { itens: novosItens };
    });
  },

  hasItem: (pecaId: number) => {
    return get().itens.some(item => item.idPeca === pecaId);
  },
  getQuantidade: (pecaId: number) => {
    const item = get().itens.find(item => item.idPeca === pecaId);
    return item ? item.quantidade : 0;
  },
}));