interface Usuario{
    id?: number;
    username: string;
    nome: string;
    email: string;
    telefone: string;
    isAdmin: boolean;
    token?: string;
};

export default Usuario;