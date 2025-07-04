import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Peca from "../interfaces/Peca";
import useRecuperarCategoriasPeca from "../hooks/categoriasPeca/useRecuperarCategoriasPeca";
import { gerarSlug } from "../util/gerarSlug";

interface PecaFormProps {
  peca?: Peca;
  submitPeca?: (peca: Peca) => void;
}

const regexImagem = /^[a-z0-9_.-]+\.(gif|jpg|png|bmp)$/i;
const regexData = /^\d{4}-\d{2}-\d{2}$/;


const schema = z.object({
  nome: z
    .string()
    .nonempty({ message: "O nome da peça é obrigatório." })
    .min(3, { message: "O nome da peça deve ter no mínimo 3 caracteres." }),

  imagem: z
    .string()
    .regex(regexImagem, {
      message:
        "Tipo inválido de imagem. Deve ter uma das seguintes extensões: '.bmp', '.gif', '.jpg' ou '.png'. ",
    })
    .optional()
    .or(z.literal("")),

  descricao: z
    .string()
    .nonempty({ message: "A descrição da peça é obrigatória." })
    .min(3, {
      message: "A descrição da peça deve ter no mínimo 3 caracteres.",
    }),

  qtdEstoque: z.coerce 
    .number({
      invalid_type_error: "A quantidade em estoque deve ser informada e ser um número.",
    })
    .min(0, { message: "A quantidade em estoque deve ser maior ou igual a zero." }),

  preco: z.coerce 
    .number({ invalid_type_error: "O preço da peça deve ser informado e ser um número." })
    .min(0.01, { message: "O preço deve ser maior ou igual a R$ 0.01" }),

  disponivel: z.boolean({
    invalid_type_error: "O campo 'disponível' deve ser um valor booleano."
  }),


  dataCadastro: z
    .string()
    .nonempty({ message: "A data de cadastro é obrigatória." })
    .regex(regexData, "Formato de data inválido. Use AAAA-MM-DD."),

  categoriaPeca: z.object({
    id: z.number({
      required_error: "A categoria da peça é obrigatória",
      invalid_type_error: "A categoria da peça é obrigatória", 
    }),
    nome: z.string().optional(),
    slug: z.string().optional(),
  }),
});

type PecaForm = z.infer<typeof schema>;

const PecaForm = ({ peca = undefined, submitPeca }: PecaFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue, 
    formState: { errors },
  } = useForm<PecaForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: peca?.nome || "",
      imagem: peca?.imagem || "",
      descricao: peca?.descricao || "",
      qtdEstoque: peca?.qtdEstoque || 0,
      preco: peca?.preco || 0.01,
      disponivel: peca?.disponivel ?? true,
      dataCadastro: peca?.dataCadastro
        ? new Date(peca.dataCadastro).toISOString().split("T")[0] // Converte Date para "YYYY-MM-DD" string
        : new Date().toISOString().split("T")[0], // Data de hoje em "YYYY-MM-DD"
      categoriaPeca: {
        id: peca?.categoriaPeca?.id || undefined, // Use undefined para o select option
        nome: peca?.categoriaPeca?.nome || "",
        slug: peca?.categoriaPeca?.slug || "",
      },
    },
  });

  const {
    data: categorias,
    isLoading: isLoadingCategorias,
    isError: isErrorCategorias,
    error: categoriasError,
  } = useRecuperarCategoriasPeca();

  const nome = watch("nome");
  const imagem = watch("imagem");
  const descricao = watch("descricao");

  useEffect(() => {
    reset({
      nome: peca?.nome || "",
      imagem: peca?.imagem || "",
      descricao: peca?.descricao || "",
      qtdEstoque: peca?.qtdEstoque || 0,
      preco: peca?.preco || 0.01,
      disponivel: peca?.disponivel ?? false,
      dataCadastro: peca?.dataCadastro
        ? new Date(peca.dataCadastro).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      categoriaPeca: {
        id: peca?.categoriaPeca?.id || undefined,
        nome: peca?.categoriaPeca?.nome || "",
        slug: peca?.categoriaPeca?.slug || "",
      },
    });
  }, [peca, reset]);

  const onSubmit: SubmitHandler<PecaForm> = (formData) => {
    const categoriaSelecionada = categorias?.find(
      (cat) => cat.id === formData.categoriaPeca.id
    );

    if (!categoriaSelecionada) {
      console.error("Erro interno: Categoria selecionada não encontrada após validação.");
      return;
    }

    const pecaParaEnviar: Peca = {
      id: peca?.id, // Mantenha o ID se for uma edição
      nome: formData.nome,
      slug: gerarSlug(formData.nome), // Garante que o slug é gerado ou usa o existente
      imagem: formData.imagem, // Não converte para null aqui, deixa a API tratar string vazia se for o caso
      descricao: formData.descricao,
      qtdEstoque: formData.qtdEstoque,
      preco: formData.preco,
      disponivel: formData.disponivel,
      dataCadastro: new Date(formData.dataCadastro),
      categoriaPeca: categoriaSelecionada,
    };

    if (submitPeca) submitPeca(pecaParaEnviar);
  };

  const handleReset = () => {
    reset({
      nome: peca?.nome || "",
      imagem: peca?.imagem || "",
      descricao: peca?.descricao || "",
      qtdEstoque: peca?.qtdEstoque || 0,
      preco: peca?.preco || 0.01,
      disponivel: peca?.disponivel ?? false,
      dataCadastro: peca?.dataCadastro
        ? new Date(peca.dataCadastro).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      categoriaPeca: {
        id: peca?.categoriaPeca?.id || undefined,
        nome: peca?.categoriaPeca?.nome || "",
        slug: peca?.categoriaPeca?.slug || "",
      },
    });
  };

  if (isLoadingCategorias) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando categorias...</span>
          </div>
          <p className="mt-2">Carregando categorias de peça...</p>
        </div>
      </div>
    );
  }

  if (isErrorCategorias) {
    return (
      <div className="card">
        <div className="card-body">
          <p className="text-danger text-center">
            Erro ao carregar categorias: {categoriasError?.message}
          </p>
          <p className="text-center">
            Não foi possível carregar as opções de categoria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo Nome */}
          <div className="form-group mb-3 position-relative">
            <label htmlFor="nome">
              Nome da Peça <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              id="nome"
              placeholder="Ex: Bloco do motor V8"
              {...register("nome")}
            />
            {errors.nome && (
              <p className="text-danger small mt-1">{errors.nome.message}</p>
            )}
            {nome && (
              <button
                type="button"
                className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute end-0 translate-middle-y me-2"
                aria-label="Limpar"
                onClick={() => setValue("nome", "")}
                style={{ top: "70%" }}
              >
                &times;
              </button>
            )}
          </div>

          {/* Campo Imagem */}
          <div className="form-group mb-3 position-relative">
            <label htmlFor="imagem">
              Arquivo da Imagem da peça <span className="text-muted">(opcional)</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.imagem ? "is-invalid" : ""}`}
              id="imagem"
              placeholder="Ex: peca.jpg"
              {...register("imagem")}
            />
            {errors.imagem && (
              <p className="text-danger small mt-1">{errors.imagem.message}</p>
            )}
            {imagem && (
              <button
                type="button"
                className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute end-0 translate-middle-y me-2"
                aria-label="Limpar"
                onClick={() => setValue("imagem", "")}
                style={{ top: "70%" }}
              >
                &times;
              </button>
            )}
          </div>

          {/* Campo Descrição */}
          <div className="form-group mb-3 position-relative">
            <label htmlFor="descricao">
              Descrição <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control ${
                errors.descricao ? "is-invalid" : ""
              }`}
              id="descricao"
              rows={3}
              placeholder="Descreva a peça..."
              {...register("descricao")}
            ></textarea>
            {errors.descricao && (
              <p className="text-danger small mt-1">{errors.descricao.message}</p>
            )}
            {descricao && (
              <button
                type="button"
                className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute end-0 translate-middle-y me-2"
                aria-label="Limpar"
                onClick={() => setValue("descricao", "")}
                style={{ top: "43px" }}
              >
                &times;
              </button>
            )}
          </div>

          {/* Campo Quantidade em Estoque */}
          <div className="form-group mb-3 position-relative">
            <label htmlFor="qtdEstoque">
              Quantidade em Estoque <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className={`form-control ${
                errors.qtdEstoque ? "is-invalid" : ""
              }`}
              id="qtdEstoque"
              placeholder="Ex: 100"
              {...register("qtdEstoque")}
            />
            {errors.qtdEstoque && (
              <p className="text-danger small mt-1">{errors.qtdEstoque.message}</p>
            )}
          </div>

          {/* Campo Preço */}
          <div className="form-group mb-3 position-relative">
            <label htmlFor="preco">
              Preço (R$) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              className={`form-control ${errors.preco ? "is-invalid" : ""}`}
              id="preco"
              placeholder="Ex: 123.45"
              {...register("preco")}
            />
            {errors.preco && (
              <p className="text-danger small mt-1">{errors.preco.message}</p>
            )}
          </div>

          {/* Campo Disponível (Checkbox) */}
          <div className="form-group form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="disponivel"
              {...register("disponivel")}
            />
            <label className="form-check-label" htmlFor="disponivel">
              Disponível para venda
            </label>
            {errors.disponivel && (
              <p className="text-danger small mt-1">{errors.disponivel.message}</p>
            )}
          </div>

          {/* Campo Data de Cadastro */}
          <div className="form-group mb-3">
            <label htmlFor="dataCadastro">
              Data de Cadastro <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className={`form-control ${
                errors.dataCadastro ? "is-invalid" : ""
              }`}
              id="dataCadastro"
              {...register("dataCadastro")}
            />
            {errors.dataCadastro && (
              <p className="text-danger small mt-1">{errors.dataCadastro.message}</p>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="categoriaPecaId">
              Categoria da Peça <span className="text-danger">*</span>
            </label>
            <select
              id="categoriaPecaId"
              className={`form-select ${
                errors.categoriaPeca?.id ? "is-invalid" : ""
              }`}
              {...register("categoriaPeca.id", { valueAsNumber: true })}
              defaultValue={peca?.categoriaPeca?.id || ""}
            >
              <option value="">Selecione uma categoria...</option>
              {categorias?.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
            {errors.categoriaPeca?.id && (
              <p className="text-danger small mt-1">
                {errors.categoriaPeca.id.message}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary me-3"
          >
            {peca ? "Resetar Edição" : "Limpar Formulário"}
          </button>
          <button type="submit" className="btn btn-primary">
            {peca ? "Atualizar Peça" : "Cadastrar Peça"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PecaForm;