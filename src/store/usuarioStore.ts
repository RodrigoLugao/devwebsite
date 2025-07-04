import { create } from 'zustand';
import Usuario from '../interfaces/Usuario';

interface UsuarioState {
  usuario?: Usuario;
  isAuthenticated: boolean; 
  isAdmin: boolean;       
  
  login: (usuario: Usuario) => void;
  logout: () => void;
  updateUsuario: (updates: Partial<Usuario>) => void;
}

const loadUsuarioFromLocalStorage = (): Usuario | undefined => {
  try {
    const serializedUsuario = localStorage.getItem('usuario');
    if (serializedUsuario === null) {
      return undefined;
    }
    return JSON.parse(serializedUsuario);
  } catch (error) {
    console.error("Erro ao carregar usuário do localStorage:", error);
    return undefined;
  }
};

const saveUsuarioToLocalStorage = (usuario: Usuario) => {
  try {
    const serializedUsuario = JSON.stringify(usuario);
    localStorage.setItem('usuario', serializedUsuario);
  } catch (error) {
    console.error("Erro ao salvar usuário no localStorage:", error);
  }
};

const removeUsuarioFromLocalStorage = () => {
    try {
        localStorage.removeItem('usuario');
    } catch (error) {
        console.error("Erro ao remover usuário do localStorage:", error);
    }
}

export const useUsuarioStore = create<UsuarioState>((set) => {
  const initialUsuario = loadUsuarioFromLocalStorage();

  return {
    usuario: initialUsuario,

    isAuthenticated: !!initialUsuario, 
    isAdmin: !!initialUsuario?.isAdmin,

    login: (usuarioData: Usuario) => {
      set({
        usuario: usuarioData,
        isAuthenticated: true,
        isAdmin: !!usuarioData.isAdmin, 
      });
      saveUsuarioToLocalStorage(usuarioData);
    },

    logout: () => {
      set({
        usuario: undefined,
        isAuthenticated: false,
        isAdmin: false,
      });
      removeUsuarioFromLocalStorage();
    },

    updateUsuario: (updates: Partial<Usuario>) => {
      set((state) => {
        if (state.usuario) {
          const updatedUser = { ...state.usuario, ...updates };
          saveUsuarioToLocalStorage(updatedUser);
          return {
            usuario: updatedUser,
            isAuthenticated: true, 
            isAdmin: !!updatedUser.isAdmin, 
          };
        }
        return state;
      });
    },
  };
});