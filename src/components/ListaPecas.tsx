import { useEffect, useState } from "react";
import Paginacao from "./Paginacao";
import CardPeca from "./CardPeca";
import { useParams } from "react-router-dom";
import useRecuperarPecasPorSlugCategoriaComPaginacao from "../hooks/useRecuperarPecasPorSlugCategoriaPaginacao";
import Peca from "../interfaces/Peca";

import { useCarrinhoStore} from '../store/carrinhoStore'; 

const ListaPecas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { slugCategoria } = useParams();
  const pecasPorPagina = 6;

  const carrinho = useCarrinhoStore(state => state.itens);
  const adicionarPecaAction = useCarrinhoStore(state => state.adicionarItem);
  const removerPecaAction = useCarrinhoStore(state => state.subtrairItem);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [slugCategoria]);


  const adicionarPeca = (peca: Peca) => {
    adicionarPecaAction(peca.id!);
  };

  const subtrairPeca = (peca: Peca) => {
    removerPecaAction(peca.id!); 
  };

  const {
    data: pagePecas,
    isPending: carregandoPecas,
    error: errorPecas,
  } = useRecuperarPecasPorSlugCategoriaComPaginacao(
    slugCategoria,
    pecasPorPagina,
    currentPage - 1
  );

  if (carregandoPecas) {
    return (
      <div className="row mb-5">
        <p>Carregando peças...</p>
      </div>
    );
  }

  if (errorPecas) {
    return (
      <div className="row mb-5">
        <p className="text-danger">Erro ao carregar peças. Tente novamente.</p>
      </div>
    );
  }

  if (!pagePecas || pagePecas.itens.length === 0) {
    return (
      <div className="row mb-5">
        <p>Nenhuma peça encontrada.</p>
      </div>
    );
  }

  const totalPaginas = pagePecas.totalPaginas;
  const pecasExibidas = pagePecas.itens;

  return (
    <div className="row mb-5">
      <strong>{pagePecas.totalItens} peças encontradas</strong>

      <Paginacao
        paginaAtual={currentPage}
        totalPaginas={totalPaginas}
        onChangePagina={setCurrentPage}
      />

      {pecasExibidas.map((peca, index) => {
        const pecaNoCarrinho = carrinho.find(item => item.idPeca === peca.id) || null;

        return (
          <div key={index} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
            <CardPeca
              peca={peca}
              adicionarPeca={adicionarPeca} 
              subtrairPeca={subtrairPeca}    
              pecaNoCarrinho={pecaNoCarrinho} 
            />
          </div>
        );
      })}
    </div>
  );
};

export default ListaPecas;