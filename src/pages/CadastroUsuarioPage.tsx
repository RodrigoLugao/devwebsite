import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useCadastrarUsuario from "../hooks/auth/useCadastrarUsuario";
import { CreateUsuarioDTO } from "../interfaces/dtos/CreateUsuarioDTO";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const passwordSchema = z
  .string()
  .nonempty({ message: "A senha é obrigatória." })
  .min(5, { message: "A senha deve ter no mínimo 5 caracteres." });

const emailSchema = z
  .string()
  .nonempty({ message: "O email é obrigatório" })
  .email({
    message: "Formato de email inválido. Formato aceito: 'email'@'domínio'",
  });

const schema = z
  .object({
    username: z
      .string()
      .nonempty({ message: "O nome de usuário é obrigatório." })
      .min(3, {
        message: "O nome de usuário deve ter no mínimo 3 caracteres.",
      })
      .regex(/^\S+$/, {
        message: "O nome de usuário não pode conter espaços em branco.",
      }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    name: z
      .string()
      .nonempty({ message: "É obrigatório informar o nome completo." })
      .min(3, {
        message: "O nome informado deve ter no mínimo 3 caracteres",
      }),
    email: emailSchema,
    confirmEmail: emailSchema,
    phone: z
      .string()
      .min(10, {
        message: "O telefone deve ter no mínimo 10 dígitos (considerando DDD).",
      })
      .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, {
        message:
          "Formato de telefone inválido. Use (XX)YYYY-ZZZZ ou XXXXXXXXXXX.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Os emails não coincidem.",
    path: ["confirmEmail"],
  });

type CadastroForm = z.infer<typeof schema>;

const CadastroUsuarioPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CadastroForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      confirmEmail: "",
      name: "",
      phone: "",
    },
  });

  const {
    mutate: cadastrarUsuarioMutation,
    error: apiError,
    isPending: isPendingCadastrar,
    isSuccess: isSuccessCadastrar,
    data: novoUsuario,
  } = useCadastrarUsuario();

  const onSubmit: SubmitHandler<CadastroForm> = (formData) => {
    const cadastroUsuario: CreateUsuarioDTO = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
    };
    cadastrarUsuarioMutation(cadastroUsuario);
  };

  useEffect(() => {
    if (apiError) {
      clearErrors();
      if (
        apiError.errorCode === 409 &&
        apiError.error === "USERNAME_ALREADY_EXISTS"
      ) {
        setError("username", {
          type: "manual",
          message: apiError.message,
        });
      } else {
        throw apiError;
      }
    } else if (isSuccessCadastrar && novoUsuario) {
      reset();
      setNomeUsuario(novoUsuario.nome);
      setShowModal(true); // Abre o modal
    }
  }, [apiError, isSuccessCadastrar, novoUsuario, setError, clearErrors, reset]);

  const fecharModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className="container d-flex align-items-center justify-content-center mb-5"
        style={{ marginTop: "94px", minHeight: "621px" }}
      >
        <div className="row justify-content-center w-100 mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <p className="h5 mb-0">Cadastrar Usuário</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Campo Usuário */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Usuário
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      id="username"
                      placeholder="Nome de Usuário"
                      {...register("username")}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">
                        {errors.username.message}
                      </div>
                    )}
                  </div>

                  {/* Campo Nome Completo */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      placeholder="Seu nome completo"
                      {...register("name")}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  {/* Campo Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="seu.email@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  {/* Campo Confirmar Email */}
                  <div className="mb-3">
                    <label htmlFor="confirmEmail" className="form-label">
                      Confirmar Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.confirmEmail ? "is-invalid" : ""
                      }`}
                      id="confirmEmail"
                      placeholder="Confirme seu email"
                      {...register("confirmEmail")}
                    />
                    {errors.confirmEmail && (
                      <div className="invalid-feedback">
                        {errors.confirmEmail.message}
                      </div>
                    )}
                  </div>

                  {/* Campo Senha */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Senha
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      placeholder="Crie uma senha forte"
                      {...register("password")}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  {/* Campo Confirmar Senha */}
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar Senha
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      id="confirmPassword"
                      placeholder="Confirme sua senha"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>

                  {/* Campo Telefone */}
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Telefone
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      id="phone"
                      placeholder="(XX) YYYYY-ZZZZ"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">
                        {errors.phone.message}
                      </div>
                    )}
                  </div>

                  <div className="d-flex flex-column justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting || isPendingCadastrar}
                    >
                      {isPendingCadastrar ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Cadastrar"
                      )}
                    </button>

                    <hr className="my-3" />

                    <Link className="btn btn-secondary" to="/login">
                      Voltar para Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal controlado por estado */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={fecharModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sucesso</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Fechar"
                  onClick={fecharModal}
                ></button>
              </div>
              <div className="modal-body">
                Usuário <strong>{nomeUsuario}</strong> cadastrado com sucesso!
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={fecharModal}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CadastroUsuarioPage;
