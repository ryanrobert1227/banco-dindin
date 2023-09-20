import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import api from "../../api/api";

import { ModalTransferenciaFormCSS } from "./ModalTransferenciaForm";

export default function ModalTransferenciaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: any) {
    try {
      const contas = await api.get("/contas?bank_password=Cubos123Bank");

      const conta = contas.data.rows.find((account: any) => {
        return (
          account.user.email === localStorage.getItem("userLogin") ||
          account.user.cpf === localStorage.getItem("userLogin")
        );
      });

      const destinatario = contas.data.rows.find((account: any) => {
        return (
          account.user.email === data.destinatario ||
          account.user.cpf === data.destinatario
        );
      });

      const response = await api.post("/transacoes/transferir", {
        accountNumberOrigin: conta.accountNumber,
        accountNumberDestination: destinatario.accountNumber,
        value: Number(data.valor.replace(",", "").replace(".", "")),
        type: data.categoria,
        discription: data.descricao,
        password: data.password,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      return toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      return toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <ModalTransferenciaFormCSS>
      <div className="form">
        <div className="valor">
          <label htmlFor="valor">
            Valor (ex: 999,00 "novecentros e noventa e nove reais")
          </label>
          <input
            className={errors?.valor && "input-error"}
            id="valor"
            type="text"
            {...register("valor", {
              required: true,
            })}
          />
          {errors?.valor?.type === "required" && (
            <span>Valor minimo de R$ 1</span>
          )}
        </div>
        <div className="categoria">
          <label htmlFor="categoria">Categoria</label>
          <select
            className={errors?.categoria && "input-error"}
            id="categoria"
            {...register("categoria", {
              required: true,
            })}
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Assinaturas e Serviços">
              Assinaturas e Serviços
            </option>
            <option value="Casa">Casa</option>
            <option value="Compras">Compras</option>
            <option value="Cuidados pessoais">Cuidados pessoais</option>
            <option value="Educação">Educação</option>
            <option value="Contas">Contas</option>
            <option value="Farmacia">Farmacia</option>
            <option value="Lazer">Lazer</option>
          </select>
          {errors?.categoria?.type === "required" && (
            <span>O campo categoria é obrigatorio!</span>
          )}
        </div>
        <div className="descricao">
          <label htmlFor="descricao">Descriçao</label>
          <input
            className={errors?.descricao && "input-error"}
            id="descricao"
            type="descricao"
            {...register("descricao")}
          />
        </div>
        <div className="destinatario">
          <label htmlFor="destinatario">Destinatario (Email ou CPF)</label>
          <input
            className={errors?.destinatario && "input-error"}
            id="destinatario"
            type="destinatario"
            {...register("destinatario")}
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            className={errors?.password && "input-error"}
            id="password"
            type="password"
            {...register("password")}
          />
        </div>
        <button onClick={() => handleSubmit(onSubmit)()}>Depositar</button>
      </div>
    </ModalTransferenciaFormCSS>
  );
}
