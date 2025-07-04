import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogin from "../hooks/auth/useLogin";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [redirectPath, setRedirectPath] = useState<string>("/");

  const {
    mutate: doLogin,
    error: errorLogin,
    isPending,
    isSuccess,
  } = useLogin();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.state &&
      typeof location.state === "object" &&
      "from" in location.state
    ) {
      setRedirectPath(location.state.from as string);
    }
  }, [location.state]);

  useEffect(() => {
    if (isSuccess) {
      navigate(redirectPath, { replace: true });
    }
  }, [isSuccess, navigate, redirectPath]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) =>
    doLogin({ username: data.username, password: data.password });

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ marginTop: "94px", minHeight: "621px" }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <p className="h5 mb-0">Login</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Usuário
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Nome de Usuário"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <small className="text-danger">Usuário Não Informado</small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Senha"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <small className="text-danger">Senha Não Informada</small>
                  )}
                </div>
                {errorLogin && (
                  <div className="alert alert-danger">{errorLogin.message}</div>
                )}
                <div className="d-flex flex-column justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Entrar"
                    )}
                  </button>

                  <Link className="small" to="/recuperar-senha">
                    Esqueceu a senha?
                  </Link>
                  <hr />

                  <Link className="btn btn-success" to="/cadastrar-usuario">
                    Cadastrar Novo Usuário
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
