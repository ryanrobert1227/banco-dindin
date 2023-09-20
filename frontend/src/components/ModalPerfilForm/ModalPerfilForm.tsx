import { useForm } from "react-hook-form";

import api from "../../api/api";

import { toast } from "react-toastify";
import { ModalPerfilFormCSS } from "./ModalPerfilForm";

export default function ModalPerfilForm() {
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

      const response = await api.put(`/contas/${conta.accountNumber}/usuario`, {
        name: data.nome,
        cpf: data.cpf, // needs to find account
        bornDate: "2004-10-04",
        email: data.email,
        password: data.password,
        newPassword: data.newPassword,
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);

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
      console.log(error);

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
    <ModalPerfilFormCSS>
      <div className="form">
        <div className="nome">
          <label htmlFor="nome">Nome ou Novo Nome</label>
          <input
            className={errors?.nome && "input-error"}
            id="nome"
            type="nome"
            {...register("nome", {
              required: true,
            })}
          />
          {errors?.nome?.type === "required" && (
            <span>O campo Nome é obrigatorio!</span>
          )}
        </div>
        <div className="email">
          <label htmlFor="email">E-mail ou Novo E-mail</label>
          <input
            className={errors?.email && "input-error"}
            id="email"
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          {errors?.email?.type === "required" && (
            <span>O campo Email é obrigatorio!</span>
          )}
        </div>
        <div className="cpf">
          <label htmlFor="cpf">Cpf Atual (imutavel)</label>
          <input
            className={errors?.cpf && "input-error"}
            id="cpf"
            type="text"
            {...register("cpf", {
              required: true,
            })}
          />
          {errors?.cpf?.type === "required" && (
            <span>O campo Cpf é obrigatorio!</span>
          )}
        </div>
        <div className="password">
          <label htmlFor="password">Old Password</label>
          <input
            className={errors?.password && "input-error"}
            id="password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors?.password?.type === "required" && (
            <span>O campo password é obrigatorio!</span>
          )}
        </div>
        <div className="Newpassword">
          <label htmlFor="Newpassword">New Password</label>
          <input
            className={errors?.Newpassword && "input-error"}
            id="Newpassword"
            type="password"
            {...register("newPassword", {
              required: true,
            })}
          />
          {errors?.Newpassword?.type === "required" && (
            <span>O campo New Password é obrigatorio!</span>
          )}
        </div>
        <button onClick={() => handleSubmit(onSubmit)()}>Editar</button>
      </div>
    </ModalPerfilFormCSS>
  );
}
